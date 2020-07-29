const scriptName = "피파온라인4 전적 검색";
/**
* (string) room
* (string) sender
* (boolean) isGroupChat
* (void) replier.reply(message)
* (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
* (string) imageDB.getProfileBase64()
* (string) packageName
*/

function find_stat(replier,msg){
  if(msg.indexOf('!일대일 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank?strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("span.td.rank_no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("span.td.rank_r_rate").text();
      var win_point=doc.select("span.td.rank_r_win_point").text();
      var rank_per=doc.select("span.td.rank_percent").text();

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n상위 백분율: '+rank_per);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }

  if(msg.indexOf('!이대이 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_2vs?strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("span.td.rank_no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("span.td.rank_r_rate").text();
      var win_point=doc.select("span.td.rank_r_win_point").text();
      var rank_per=doc.select("span.td.rank_percent").text();

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n상위 백분율: '+rank_per);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }

  if(msg.indexOf('!감모 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_m?strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("span.td.rank_no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("span.td.rank_r_rate").text();
      var win_point=doc.select("span.td.rank_r_win_point").text();
      var rank_per=doc.select("span.td.rank_percent").text();

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n상위 백분율: '+rank_per);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }

  if(msg.indexOf('!볼타격수 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_volta?rtype=fw&strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("div.td.no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("div.td.small.s5").text();
      var win_point=doc.select("div.td.small.s1").text();
      var win=doc.select("div.td.small.s2").text();
      var draw=doc.select("div.td.small.s3").text();
      var lose=doc.select("div.td.small.s4").text();
      var mvp_num=doc.select("div.td.small.s7").text();
      var point=doc.select("div.td.small.s6").text();
      var goal=doc.select("div.td.small.s8").text();
      var assist=doc.select("div.td.small.s9").text();
      var tackle=doc.select("div.td.medium.m1.usebr").text();
      var chadan=doc.select("div.td.medium.m2.usebr").text();
      var shooting=doc.select("div.td.medium.m3.usebr").text();
      var pass=doc.select("div.td.medium.m5.usebr").text();
      var drrible=doc.select("div.td.medium.m6.usebr").text();
      var matchnum=parseInt(win)+parseInt(draw)+parseInt(lose);
      var mvp_rate=(mvp_num/matchnum*100).toFixed(2);
      var avggoal=(goal/matchnum).toFixed(2);
      var avgassist=(assist/matchnum).toFixed(2);

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n'+matchnum+'경기 '+win+'승 '+
      draw+'무 '+lose+'패'+'\n평균평점: '+point+'점'+'\nMOM 횟수: '+mvp_num+'회'+'\nMOM 확률: '
      +mvp_rate+'%'+'\n득점: '+goal+' 도움: '+assist+'\n평균득점: '+avggoal+
      ' 평균도움: '+avgassist+'\n유효슈팅: '+shooting+'\n패스 성공률: '+pass);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }

  if(msg.indexOf('!볼타미드 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_volta?rtype=mf&strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("div.td.no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("div.td.small.s5").text();
      var win_point=doc.select("div.td.small.s1").text();
      var win=doc.select("div.td.small.s2").text();
      var draw=doc.select("div.td.small.s3").text();
      var lose=doc.select("div.td.small.s4").text();
      var mvp_num=doc.select("div.td.small.s7").text();
      var point=doc.select("div.td.small.s6").text();
      var goal=doc.select("div.td.small.s8").text();
      var assist=doc.select("div.td.small.s9").text();
      var tackle=doc.select("div.td.medium.m1.usebr").text();
      var chadan=doc.select("div.td.medium.m2.usebr").text();
      var shooting=doc.select("div.td.medium.m3.usebr").text();
      var pass=doc.select("div.td.medium.m5.usebr").text();
      var drrible=doc.select("div.td.medium.m6.usebr").text();
      var matchnum=parseInt(win)+parseInt(draw)+parseInt(lose);
      var mvp_rate=(mvp_num/matchnum*100).toFixed(2);
      var avggoal=(goal/matchnum).toFixed(2);
      var avgassist=(assist/matchnum).toFixed(2);

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n'+matchnum+'경기 '+win+'승 '+
      draw+'무 '+lose+'패'+'\n평균평점: '+point+'점'+'\nMOM 횟수: '+mvp_num+'회'+'\nMOM 확률: '
      +mvp_rate+'%'+'\n득점: '+goal+' 도움: '+assist+'\n평균득점: '+avggoal+
      ' 평균도움: '+avgassist+'\n유효슈팅: '+shooting+'\n태클 성공률: '+tackle+
      '\n차단 성공률: '+chadan+'\n패스 성공률: '+pass);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }

  if(msg.indexOf('!볼타수비 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_volta?rtype=df&strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("div.td.no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("div.td.small.s5").text();
      var win_point=doc.select("div.td.small.s1").text();
      var win=doc.select("div.td.small.s2").text();
      var draw=doc.select("div.td.small.s3").text();
      var lose=doc.select("div.td.small.s4").text();
      var mvp_num=doc.select("div.td.small.s7").text();
      var point=doc.select("div.td.small.s6").text();
      var goal=doc.select("div.td.small.s8").text();
      var assist=doc.select("div.td.small.s9").text();
      var tackle=doc.select("div.td.medium.m1.usebr").text();
      var chadan=doc.select("div.td.medium.m2.usebr").text();
      var shooting=doc.select("div.td.medium.m3.usebr").text();
      var pass=doc.select("div.td.medium.m5.usebr").text();
      var drrible=doc.select("div.td.medium.m6.usebr").text();
      var matchnum=parseInt(win)+parseInt(draw)+parseInt(lose);
      var mvp_rate=(mvp_num/matchnum*100).toFixed(2);
      var avggoal=(goal/matchnum).toFixed(2);
      var avgassist=(assist/matchnum).toFixed(2);

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n'+matchnum+'경기 '+win+'승 '+
      draw+'무 '+lose+'패'+'\n평균평점: '+point+'점'+'\nMOM 횟수: '+mvp_num+'회'+'\nMOM 확률: '
      +mvp_rate+'%'+'\n패스 성공률: '+pass+'\n태클 성공률: '+tackle+
      '\n차단 성공률: '+chadan);
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }


  if(msg.indexOf('!볼타전체 ')==0){
    var ovo=msg.split(' ');
    var url="http://fifaonline4.nexon.com/datacenter/rank_volta?rtype=all&strCharacterName="+ovo[1];
    var doc=null;
    doc=org.jsoup.Jsoup.connect(url).get();
    if(doc.text().includes("포함되어")){
      var element=doc.select("span.txt").text();
      replier.reply(element);
    }
    else{
      var name=doc.select("span.name.profile_pointer").text();
      var rank=doc.select("div.td.no").text();
      var icon=doc.select("span.ico_rank");
      var price=doc.select("span.price").text();
      var win_rate=doc.select("div.td.small.s5").text();
      var win_point=doc.select("div.td.small.s1").text();
      var win=doc.select("div.td.small.s2").text();
      var draw=doc.select("div.td.small.s3").text();
      var lose=doc.select("div.td.small.s4").text();
      var mvp_num=doc.select("div.td.small.s7").text();
      var point=doc.select("div.td.small.s6").text();
      var goal=doc.select("div.td.small.s8").text();
      var assist=doc.select("div.td.small.s9").text();
      var tackle=doc.select("div.td.medium.m1.usebr").text();
      var chadan=doc.select("div.td.medium.m2.usebr").text();
      var shooting=doc.select("div.td.medium.m3.usebr").text();
      var pass=doc.select("div.td.medium.m5.usebr").text();
      var drrible=doc.select("div.td.medium.m6.usebr").text();
      var position=doc.select("div.td.large.usebr").get(0).text();
      var matchnum=parseInt(win)+parseInt(draw)+parseInt(lose);
      var mvp_rate=(mvp_num/matchnum*100).toFixed(2);
      var avggoal=(goal/matchnum).toFixed(2);
      var avgassist=(assist/matchnum).toFixed(2);

      replier.reply('< '+name+ ' >'+'\n순위: '+rank+'위'+'\n구단가치: '+price
      +'\n승률: '+win_rate+'\n랭킹점수: '+win_point+'\n'+matchnum+'경기 '+win+'승 '+
      draw+'무 '+lose+'패'+'\n평균평점: '+point+'점'+'\nMOM 횟수: '+mvp_num+'회'+'\nMOM 확률: '
      +mvp_rate+'%'+'\n득점: '+goal+' 도움: '+assist+'\n평균득점: '+avggoal+
      ' 평균도움: '+avgassist+'\n유효슈팅: '+shooting+'\n태클 성공률: '+tackle+
      '\n차단 성공률: '+chadan+'\n패스 성공률: '+pass+'\n주 포지션: '+position+'\n(FW | MF | DF)');
    }
    var rank_advice=doc.select("p.rank_advice").text();
    replier.reply(rank_advice);
  }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  find_stat(replier,msg);
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
