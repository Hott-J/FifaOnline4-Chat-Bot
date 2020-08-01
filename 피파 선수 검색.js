const scriptName = "피파온라인4 선수 검색";
/**
* (string) room
* (string) sender
* (boolean) isGroupChat
* (void) replier.reply(message)
* (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
* (string) imageDB.getProfileBase64()
* (string) packageName
*/

var img=['','','','',''];
var id=['','','','',''];
var season=['','','','',''];
var stat=['','','','',''];
var s=['','','','',''];
var salary=['','','','',''];

Jsoup=org.jsoup.Jsoup;
const kalingModule=require('kaling').Kakao();
const Kakao=new kalingModule;

function kakao_login(replier){
  try{
    Kakao.init('2d0e4efc34993dc5353ebb2f964f3f4d'); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login('jhj07152019@gmail.com','rkdmfdl.7');//중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
    doc = Jsoup.connect("https://kr.fifaaddict.com/fo4db?playername="+search).get();
  }catch(e){replier.reply("로그인 세션이 만료되었습니다.")}
}

function send_template(room,id,set){
  let template={};
  template['link_ver']='4.0';
  template['template_id']=id;
  template['template_args']=set;
  Kakao.send(room,template,'custom');
}

function find_player(){
  var i;
  var j;
  for(i=0;i<5;i++){
    try{
      img[i]=doc.select('div.info-inner > img').get(i).attr('src') // 선수 이미지
      id[i]=doc.select('div.info-inner > a').get(i).attr('abs:href') // 각 시즌 선수 절대경로
      season[i]=Jsoup.connect(id[i]).get().select('span.season_name').text() // 시즌 이름
      stat[i]=doc.select('div.poswrap').get(i) // 선수 스텟 각 시즌마다
      s[i]=stat[i].select('span').text() // 띄어쓰기를 위함
      salary[i]=doc.select('span.fpbg').get(i).text() // 선수 급여
    }catch(e){img[i]=null,id[i]=' ',season[i]=' ';} // 선수 검색 실패 or 5개 미만일 경우 예외처리
  }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  if (msg.startsWith("!선수")) {
    search = msg.substr(3).trim();
    flag=true

    kakao_login(replier);
    find_player();

    let set={
      m1:search,
      e1:season[0],
      e2:season[1],
      e3:season[2],
      e4:season[3],
      e5:season[4],
      s1:salary[0],
      s2:salary[1],
      s3:salary[2],
      s4:salary[3],
      s5:salary[4],
      v1:s[0],
      v2:s[1],
      v3:s[2],
      v4:s[3],
      v5:s[4],
      i1:img[0],
      i2:img[1],
      i3:img[2],
      i4:img[3],
      i5:img[4],
      l1:id[0].split('.com/')[1],
      l2:id[1].split('.com/')[1],
      l3:id[2].split('.com/')[1],
      l4:id[3].split('.com/')[1],
      l5:id[4].split('.com/')[1]
    }
    if(flag){
      send_template(room,33609,set)
    }
    else{
      replier.reply("선수 이름을 다시 확인해주세요.")
    }
  }
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
