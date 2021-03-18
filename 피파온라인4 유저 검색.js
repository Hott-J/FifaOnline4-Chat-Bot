const scriptName = "mutextest";
/**************************************************************************Made by Hakjae Chung
 ***************************************************************************피파4 developer open Api를 활용하였습니다.
 ***************************************************************************jhj13062004@naver.com
 ***************************************************************************Using Messenger Bot R
 ***************************************************************************메신저봇R 기반입니다.
 ***************************************************************************카카오톡에서 테스트하였습니다.
 ****************************************************************************************************************************************************/
const Mutex = require("mutex");
const globalMutex = new Mutex();
var img = "";
var img1 = "";
var name = "";
var price = "";
var tag = "";
var num = "";
var flag = true;

var key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTA0MDI0NzkxOSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2MTEwNzkxMzEsImV4cCI6MTYyNjYzMTEzMSwiaWF0IjoxNjExMDc5MTMxfQ.oydDF6Rdmw9qJdHwssD17tkOX6D-vheU4GuMrgHUGqQ";

Jsoup = org.jsoup.Jsoup;
const kalingModule = require("kaling").Kakao();
const Kakao = new kalingModule();
//const globalMutex=new Mutex();

function kakao_login(replier) {
  try {
    Kakao.init("2d0e4efc34993dc5353ebb2f964f3f4d"); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login("jhj07152019@gmail.com", "rkdmfdl.7"); //중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
    doc = Jsoup.connect(
      "http://fifaonline4.nexon.com/profile/common/PopProfile?strCharacterName=" +
        search
    ).get();
    doc1 = Jsoup.connect(
      "http://fifaonline4.nexon.com/datacenter/rank?strCharacterName=" + search
    ).get();
  } catch (e) {
    replier.reply("로그인 세션이 만료되었습니다.");
  }
}

function send_template(room, id, set) {
  let template = {};
  template["link_ver"] = "4.0";
  template["template_id"] = id;
  template["template_args"] = set;
  Kakao.send(room, template, "custom");
}

function find_user_id(search) {
  // 유저 닉네임을 파라미터로 검색할 user accessid를 찾는다.
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

function find_profile() {
  try {
    img = doc.select("div.img > img").get(0).attr("src");
    img1 = doc.select("div.img > img").get(1).attr("src");
    name = doc.select("span.coach").text();
    price = doc1.select("span.price").text();
    //tag=doc1.select("p.rank_advice").text().split('데')[0]
    num =
      doc.select("span.num").text().split(" ")[1] +
      doc.select("span.num").text().split(" ")[2];
  } catch (e) {
    flag = false;
  } // 프로필 검색 실패시, 메봇 활성화가 꺼지지 않고, 계속 수행할 수 있도록 하기 위함.
}

function highest(accessid) {
  var doc2 = JSON.parse(
    Jsoup.connect(
      "https://api.nexon.co.kr/fifaonline4/v1.0/users/" +
        accessid +
        "/maxdivision"
    )
      .header("Authorization", key)
      .ignoreContentType(true)
      .get()
      .text()
  );
  return doc2[0]["division"];
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
  globalMutex.Lock = (Unlock) => {
    if (msg.startsWith("!프로필")) {
      search = msg.substr(4).trim();
      flag = true;

      kakao_login(replier);
      var accessid = find_user_id(search);
      switch (highest(accessid)) {
        case 800:
          tag = "슈퍼 챔피언스";
          break;
        case 900:
          tag = "챔피언스";
          break;
        case 1100:
          tag = "챌린지";
          break;
        case 2000:
          tag = "월드클래스 1부";
          break;
        case 2100:
          tag = "월드클래스 2부";
          break;
        case 2200:
          tag = "월드클래스 3부";
          break;
        case 2300:
          tag = "프로 1부";
          break;
        case 2400:
          tag = "프로 2부";
          break;
        case 2500:
          tag = "프로 3부";
          break;
        case 2600:
          tag = "세미프로 1부";
          break;
        case 2700:
          tag = "세미프로 2부";
          break;
        case 2800:
          tag = "세미프로 3부";
          break;
        case 2900:
          tag = "아마추어 1부";
          break;
        case 3000:
          tag = "아마추어 2부";
          break;
        case 3100:
          tag = "아마추어 3부";
          break;
        default:
          tag = "배치경기를 봐야합니다.";
      }

      find_profile();

      let set = {
        e1: name,
        i1: img,
        i2: img1,
        v1: tag,
        v2: num,
      };
      if (flag) {
        send_template(room, 33407, set);
      } else {
        replier.reply("아이디를 다시 확인해주세요.");
      }
    }
    Unlock();
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
