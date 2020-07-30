const scriptName = "피파온라인4 프로필 검색";
/*
* (string) room
* (string) sender
* (boolean) isGroupChat
* (void) replier.reply(message)
* (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
* (string) imageDB.getProfileBase64()
* (string) packageName
*/

var img='';
var img1='';
var name='';
var price='';
var tag='';
var num='';
var flag=true

Jsoup=org.jsoup.Jsoup;
const kalingModule=require('kaling').Kakao();
const Kakao=new kalingModule;

function kakao_login(replier){
  try{
    Kakao.init('myJs'); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login('myKakaoId','password');//중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
    doc = Jsoup.connect("http://fifaonline4.nexon.com/profile/common/PopProfile?strCharacterName="+search).get();
    doc1 = Jsoup.connect("http://fifaonline4.nexon.com/datacenter/rank?strCharacterName="+search).get()
  }catch(e){replier.reply("로그인 세션이 만료되었습니다.")}
}

function send_template(room,id,set){
  let template={};
  template['link_ver']='4.0';
  template['template_id']=id;
  template['template_args']=set;
  Kakao.send(room,template,'custom');
}

function find_profile(){
  try{
    img=doc.select('div.img > img').get(0).attr('src')
    img1=doc.select('div.img > img').get(1).attr('src')
    name=doc.select('span.coach').text();
    price=doc1.select("span.price").text();
    tag=doc1.select("p.rank_advice").text().split('데')[0]
    num=doc.select("span.num").text()
  }catch(e){flag=false} // 프로필 검색 실패시, 메봇 활성화가 꺼지지 않고, 계속 수행할 수 있도록 하기 위함.
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  if (msg.startsWith("!정보")) {
    search = msg.substr(3).trim();
    flag=true

    kakao_login(replier);
    find_profile();

    let set={
      e1:name,
      i1:img,
      i2:img1,
      v1:tag,
      v2:num
    }
    if(flag){
      send_template(room,mytemplateId,set)
    }
    else{
      replier.reply("아이디를 다시 확인해주세요.")
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
