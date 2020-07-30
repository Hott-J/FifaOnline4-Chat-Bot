const scriptName = "피파온라인4 이벤트 검색";
/**
* (string) room
* (string) sender
* (boolean) isGroupChat
* (void) replier.reply(message)
* (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
* (string) imageDB.getProfileBase64()
* (string) packageName
*/

var img1='';
var img2='';
var img3='';
var img4='';
var img5='';
var name1='';
var name2='';
var name3='';
var name4='';
var name5='';
var val1='';
var val2='';
var val3='';
var val4='';
var val5='';
var tag1='';
var tag2='';
var tag3='';
var tag4='';
var tag5='';
var l1='';
var l2='';
var l3='';
var l4='';
var l5='';
var flag=true

Jsoup=org.jsoup.Jsoup;
const kalingModule=require('kaling').Kakao();
const Kakao=new kalingModule;

function kakao_login(replier){
  try{
    Kakao.init('myJs'); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login('myKakaoId','password');//중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
    doc = Jsoup.connect("http://fifaonline4.nexon.com/news/events/list").get();
  }catch(e){replier.reply("로그인 세션이 만료되었습니다.")}
}

function send_template(room,id,set){
  let template={};
  template['link_ver']='4.0';
  template['template_id']=id;
  template['template_args']=set;
  Kakao.send(room,template,'custom');
}

function event(){
  try{
    img1=doc.select('span.thumb > img').get(0).attr('src')
    img2=doc.select('span.thumb > img').get(1).attr('src')
    img3=doc.select('span.thumb > img').get(2).attr('src')
    img4=doc.select('span.thumb > img').get(3).attr('src')
    img5=doc.select('span.thumb > img').get(4).attr('src')
    name1=doc.select('span.subject').get(0).text();
    name2=doc.select('span.subject').get(1).text();
    name3=doc.select('span.subject').get(2).text();
    name4=doc.select('span.subject').get(3).text();
    name5=doc.select('span.subject').get(4).text();
    val1=doc.select('span.date').get(0).text();
    val2=doc.select('span.date').get(1).text();
    val3=doc.select('span.date').get(2).text();
    val4=doc.select('span.date').get(3).text();
    val5=doc.select('span.date').get(4).text();
    tag1=doc.select('div.tr > a').get(0).attr('abs:href').split('fifaonline4.nexon.com/')[1]
    tag2=doc.select('div.tr > a').get(1).attr('abs:href').split('fifaonline4.nexon.com/')[1]
    tag3=doc.select('div.tr > a').get(2).attr('abs:href').split('fifaonline4.nexon.com/')[1]
    tag4=doc.select('div.tr > a').get(3).attr('abs:href').split('fifaonline4.nexon.com/')[1]
    tag5=doc.select('div.tr > a').get(4).attr('abs:href').split('fifaonline4.nexon.com/')[1]
  }catch(e){flag=false}
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  if (msg.startsWith("!이벤트")) {
    search = msg.substr(4).trim();
    flag=true

    kakao_login(replier);
    event();

    let set={
      e1:name1,
      e2:name2,
      e3:name3,
      e4:name4,
      e5:name5,
      i1:img1,
      i2:img2,
      i3:img3,
      i4:img4,
      i5:img5,
      v1:val1,
      v2:val2,
      v3:val3,
      v4:val4,
      v5:val5,
      l1:tag1,
      l2:tag2,
      l3:tag3,
      l4:tag4,
      l5:tag5
    }
    if(flag){
      send_template(room,myTemplateId,set)
    }
    else{
      replier.reply("이벤트를 찾지 못했습니다.")
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
