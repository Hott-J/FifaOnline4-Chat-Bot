const scriptName = "피파매치검색";
/**************************************************************************Made by Hakjae Chung
 ***************************************************************************피파4 developer open Api를 활용하였습니다.
 ***************************************************************************jhj13062004@naver.com
 ***************************************************************************Using Messenger Bot R
 ***************************************************************************메신저봇R 기반입니다.
 ***************************************************************************카카오톡에서 테스트하였습니다.
 ****************************************************************************************************************************************************/
const Mutex = require("mutex");
const globalMutex = new Mutex();
Jsoup = org.jsoup.Jsoup;
var myName = "";
var yourName = "";
var matchlist;
var win = 0;
var draw = 0;
var lose = 0;
var myHitPost = 0;
var allsee = "\u200b".repeat(500);

var key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTA0MDI0NzkxOSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2MTEwNzkxMzEsImV4cCI6MTYyNjYzMTEzMSwiaWF0IjoxNjExMDc5MTMxfQ.oydDF6Rdmw9qJdHwssD17tkOX6D-vheU4GuMrgHUGqQ";
function find_user_id(search) {
  var doc = JSON.parse(
    Jsoup.connect(
      "https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=" + search
    )
      .header("Authorization", key)
      .ignoreContentType(true)
      .get()
      .text()
  );
  return doc["accessId"];
}

function find_match_id(aI, start, end) {
  //공식경기 매치기록 조회
  var doc = JSON.parse(
    Jsoup.connect(
      "https://api.nexon.co.kr/fifaonline4/v1.0/users/" +
        aI +
        "/matches?matchtype=50&offset=" +
        start +
        "&limit=" +
        end
    )
      .header("Authorization", key)
      .ignoreContentType(true)
      .get()
      .text()
  );
  return doc;
}

function find_match_info(match, aI) {
  var i;
  var doc = JSON.parse(
    Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/matches/" + match)
      .header("Authorization", key)
      .ignoreContentType(true)
      .get()
      .text()
  );
  if (doc["matchInfo"][0]["accessId"] == aI) {
    myName = doc["matchInfo"][0]["nickname"];
    myScore = doc["matchInfo"][0]["shoot"]["goalTotal"];
    myResult = doc["matchInfo"][0]["matchDetail"]["matchResult"];
    yourName = doc["matchInfo"][1]["nickname"];
    yourScore = doc["matchInfo"][1]["shoot"]["goalTotal"];
    myShootDetail = doc["matchInfo"][0]["shootDetail"];
    for (i = 0; i < myShootDetail.length; i++) {
      //  var myHitPost=0
      if (myShootDetail[i]["hitPost"] == true) {
        myHitPost++;
      }
    }
  } else {
    myName = doc["matchInfo"][1]["nickname"];
    myScore = doc["matchInfo"][1]["shoot"]["goalTotal"];
    myResult = doc["matchInfo"][1]["matchDetail"]["matchResult"];
    yourName = doc["matchInfo"][0]["nickname"];
    yourScore = doc["matchInfo"][0]["shoot"]["goalTotal"];
    myShootDetail = doc["matchInfo"][1]["shootDetail"];
    for (i = 0; i < myShootDetail.length; i++) {
      if (myShootDetail[i]["hitPost"] == true) {
        myHitPost++;
      }
    }
  }
  if (myResult == "승") {
    win++;
  }
  if (myResult == "무") {
    draw++;
  }
  if (myResult == "패") {
    lose++;
  }
  return (
    myName +
    " " +
    myScore +
    " : " +
    yourScore +
    " " +
    yourName +
    " (" +
    myResult +
    ")" +
    "\n"
  );
}

var num = 0;
function response(
  room,
  msg,
  sender,
  isGroupChat,
  replier,
  imageDB,
  packageName
) {
  globalMutex.Lock = (Unlock) => { // 락을 걸어준다
    if (msg.startsWith("!매치")) {
      search = msg.substr(4).split(" ")[0];
      var gameNum = msg.substr(4).split(" ")[1];
      if (gameNum == null){gameNum = 10;} // default 
      // myHitPost=0
      var aI = find_user_id(search);
      var match = find_match_id(aI, 0, gameNum);
      var i;
      var len = 0;
      matchlist = "";
      win = 0;
      draw = 0;
      lose = 0;
      myTotalGoal = 0;
      yourTotalGoal = 0;
      myHitPost = 0;
      try {
        for (i = 0; i < match.length; i++) {
          matchlist += i + 1 + ". " + find_match_info(match[i], aI);
          myTotalGoal += myScore;
          yourTotalGoal += yourScore;
          len++;
        }
      } catch (e) {
        replier.reply(
          len +
            1 +
            "경기째 본인 혹은 상대방이 닉네임 변경을 하였습니다. 넥슨측에서 반영 후 검색가능합니다."
        );
      }
      replier.reply(
        "<" +
          search +
          ">" +
          "\n최근 " +
          len +
          "경기 전적 조회\n" +
          allsee +
          "\n" +
          matchlist +
          "\n" +
          "최근 " +
          len +
          "경기 " +
          win +
          "승 " +
          draw +
          "무 " +
          lose +
          "패 " +
          "승률 : " +
          ((win / len) * 100).toFixed(2) +
          "%\n" +
          myTotalGoal +
          "득점 " +
          yourTotalGoal +
          "실점 " +
          myHitPost +
          "빅대"
      );
    }
    Unlock(); // 락 해제
  };
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}