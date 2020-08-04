const scriptName = "피파4 developer open api 공식경기 전적 검색";

/**************************************************************************Made by Hakjae Chung
***************************************************************************피파4 developer open Api를 활용하였습니다.
***************************************************************************jhj13062004@naver.com
***************************************************************************Using Messenger Bot R
***************************************************************************메신저봇R 기반입니다.
***************************************************************************카카오톡에서 테스트하였습니다.
****************************************************************************************************************************************************/

Jsoup=org.jsoup.Jsoup
var myName=''
var yourName=''
var matchlist
var win=0
var draw=0
var lose=0
var myHitPost=0
var allsee="\u200b".repeat(500);

function find_user_id(search){ // 유저 닉네임을 파라미터로 검색할 user accessid를 찾는다.
  var doc=JSON.parse(Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname="+search)
  .header("Authorization","myNexonKey")
  .ignoreContentType(true)
  .get().text())
  return doc['accessId']
}

function find_match_id(aI,start,end){ //user accessid를 파라미터로 공식경기 매치기록 조회(닉네임을 통해 조회가 불가능)
  var doc=JSON.parse(Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/users/"+aI+"/matches?matchtype=50&offset="+start+"&limit="+end)
  .header("Authorization","myNexonKey")
  .ignoreContentType(true)
  .get().text())
  return doc
}

function find_match_info(match,aI){ //조회된 매치id를 이용하여 매치정보를 받아온다. 해당 Json 데이터에는 참 재미있는 정보가 많았고, 재미요소와 깔끔하게 보이기 위해 골대맞춘 횟수만 넣었다.
  var i
  var doc=JSON.parse(Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+match)
  .header("Authorization","myNexonKey")
  .ignoreContentType(true)
  .get().text())
  if(doc['matchInfo'][0]['accessId']==aI){ //내가 홈일 경우
    myName=doc['matchInfo'][0]['nickname']
    myScore=doc['matchInfo'][0]['shoot']['goalTotal']
    myResult=doc['matchInfo'][0]['matchDetail']['matchResult']
    yourName=doc['matchInfo'][1]['nickname']
    yourScore=doc['matchInfo'][1]['shoot']['goalTotal']
    myShootDetail=doc['matchInfo'][0]['shootDetail']
    for(i=0; i<myShootDetail.length;i++){
      if(myShootDetail[i]['hitPost']==true){myHitPost++}
    }
  }
  else{ // 내가 어웨이일 경우
    myName=doc['matchInfo'][1]['nickname']
    myScore=doc['matchInfo'][1]['shoot']['goalTotal']
    myResult=doc['matchInfo'][1]['matchDetail']['matchResult']
    yourName=doc['matchInfo'][0]['nickname']
    yourScore=doc['matchInfo'][0]['shoot']['goalTotal']
    myShootDetail=doc['matchInfo'][1]['shootDetail']
    for(i=0; i<myShootDetail.length;i++){
      if(myShootDetail[i]['hitPost']==true){myHitPost++}
    }
  }
  if(myResult=="승"){win++}
  if(myResult=="무"){draw++}
  if(myResult=="패"){lose++}
  return myName+" "+myScore+" : "+yourScore+" "+yourName+" ("+myResult+")"+"\n"
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith("!매치")) {
    search = msg.substr(3).trim();
    var aI=find_user_id(search)
    var match=find_match_id(aI,0,30)
    var i
    var len=0
    matchlist=""
    win=0
    draw=0
    lose=0
    myTotalGoal=0
    yourTotalGoal=0
    myHitPost=0
    try{ //만약 본인 혹은 상대방이 닉네임 변경했을 경우 matchInfo에서 nickname을 인덱스로 찾을 수 없어, 예외처리를 하였다. catch이후 빠져나가기때문에, try-catch문을 두번 돌렸는데, 불완전하다.
      for(i=0;i<match.length;i++){
        matchlist+=(i+1+'. '+find_match_info(match[i],aI))
        myTotalGoal+=myScore
        yourTotalGoal+=yourScore
        len++
      }
    }catch(e){replier.reply(len+1+"경기째 본인 혹은 상대방이 닉네임 변경을 하였습니다. 넥슨측에서 반영 후 검색가능합니다.")}
    try{
      for(i=len+1;i<match.length;i++){
        matchlist+=(i+'. '+find_match_info(match[i],aI))
        myTotalGoal+=myScore
        yourTotalGoal+=yourScore
        len++
      }
    }catch(e){replier.reply(len+1+"경기째 본인 혹은 상대방이 닉네임 변경을 하였습니다. 넥슨측에서 반영 후 검색가능합니다.")}
    replier.reply("<"+myName+">"+"\n최근 "+len+"경기 전적 조회\n"+allsee+"\n"+matchlist+"\n"+"최근 "+len+"경기 "+win+"승 "+draw+"무 "+lose+"패 "+"승률 : "+((win/len)*100).toFixed(2)+"%\n"+myTotalGoal+"득점 "+yourTotalGoal+"실점 " + myHitPost+"빅대" )
  }
}
