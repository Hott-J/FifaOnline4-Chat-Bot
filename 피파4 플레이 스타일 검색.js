const scriptName = "피파4 developer open api 개인 유형 검색";

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
  .header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTA0MDI0NzkxOSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU5NTI1MTYxMSwiZXhwIjoxNjEwODAzNjExLCJpYXQiOjE1OTUyNTE2MTF9.W4K3QQa57KhYUnsIcGyCK-jD_oBXMq1ZMKuN8KXZGO0")
  .ignoreContentType(true)
  .get().text())
  return doc['accessId']
}

function find_match_id(aI,start,end){ //user accessid를 파라미터로 공식경기 매치기록 조회(닉네임을 통해 조회가 불가능)
  var doc=JSON.parse(Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/users/"+aI+"/matches?matchtype=50&offset="+start+"&limit="+end)
  .header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTA0MDI0NzkxOSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU5NTI1MTYxMSwiZXhwIjoxNjEwODAzNjExLCJpYXQiOjE1OTUyNTE2MTF9.W4K3QQa57KhYUnsIcGyCK-jD_oBXMq1ZMKuN8KXZGO0")
  .ignoreContentType(true)
  .get().text())
  return doc
}

function find_match_info(match,aI){ //조회된 매치id를 이용하여 매치정보를 받아온다. 해당 Json 데이터에는 참 재미있는 정보가 많았고, 재미요소와 깔끔하게 보이기 위해 골대맞춘 횟수만 넣었다.
  var i
  var doc=JSON.parse(Jsoup.connect("https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+match)
  .header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTA0MDI0NzkxOSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU5NTI1MTYxMSwiZXhwIjoxNjEwODAzNjExLCJpYXQiOjE1OTUyNTE2MTF9.W4K3QQa57KhYUnsIcGyCK-jD_oBXMq1ZMKuN8KXZGO0")
  .ignoreContentType(true)
  .get().text())
  if(doc['matchInfo'][0]['accessId']==aI){ //내가 홈일 경우
    myName=doc['matchInfo'][0]['nickname']
    myShootHeading=doc['matchInfo'][0]['shoot']['shootHeading']
    myGoalHeading=doc['matchInfo'][0]['shoot']['goalHeading']
    myShootInPenalty=doc['matchInfo'][0]['shoot']['shootInPenalty']
    myGoalInPenalty=doc['matchInfo'][0]['shoot']['goalInPenalty']
    myShootOutPenalty=doc['matchInfo'][0]['shoot']['shootOutPenalty']
    myGoalOutPenalty=doc['matchInfo'][0]['shoot']['goalOutPenalty']
    myPossession=doc['matchInfo'][0]['matchDetail']['possession']
  }
  else{ // 내가 어웨이일 경우
    myName=doc['matchInfo'][1]['nickname']
    myShootHeading=doc['matchInfo'][1]['shoot']['shootHeading']
    myGoalHeading=doc['matchInfo'][1]['shoot']['goalHeading']
    myShootInPenalty=doc['matchInfo'][1]['shoot']['shootInPenalty']
    myGoalInPenalty=doc['matchInfo'][1]['shoot']['goalInPenalty']
    myShootOutPenalty=doc['matchInfo'][1]['shoot']['shootOutPenalty']
    myGoalOutPenalty=doc['matchInfo'][1]['shoot']['goalOutPenalty']
    myPossession=doc['matchInfo'][1]['matchDetail']['possession']
  }
  return myName+myShootHeading+myGoalHeading+myShootInPenalty+myGoalInPenalty+myShootOutPenalty+myGoalOutPenalty+myPossession
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith("!유형")) {
    search = msg.substr(3).trim();
    var aI=find_user_id(search)
    var match=find_match_id(aI,0,30)
    var i
    var len=0
    matchlist=""
    myTotalHeadingShoot=0
    myTotalHeadingGoal=0
    myTotalInPenaltyShoot=0
    myTotalInPenaltyGoal=0
    myTotalOutPenaltyShoot=0
    myTotalOutPenaltyGoal=0
    myTotalPossession=0
    try{ //만약 본인 혹은 상대방이 닉네임 변경했을 경우 matchInfo에서 nickname을 인덱스로 찾을 수 없어, 예외처리를 하였다. catch이후 빠져나가기때문에, try-catch문을 두번 돌렸는데, 불완전하다.
      for(i=0;i<match.length;i++){
        find_match_info(match[i],aI)
        myTotalHeadingShoot+=myShootHeading
        myTotalHeadingGoal+=myGoalHeading
        myTotalInPenaltyShoot+=myShootInPenalty
        myTotalInPenaltyGoal+=myGoalInPenalty
        myTotalOutPenaltyShoot+=myShootOutPenalty
        myTotalOutPenaltyGoal+=myGoalOutPenalty
        myTotalPossession+=myPossession
        len++
      }
    }catch(e){replier.reply(len+1+"경기째 본인 혹은 상대방이 닉네임 변경을 하였습니다. 넥슨측에서 반영 후 검색가능합니다.")}
    try{
      for(i=len+1;i<match.length;i++){
        find_match_info(match[i],aI)
        myTotalHeadingShoot+=myShootHeading
        myTotalHeadingGoal+=myGoalHeading
        myTotalInPenaltyShoot+=myShootInPenalty
        myTotalInPenaltyGoal+=myGoalInPenalty
        myTotalOutPenaltyShoot+=myShootOutPenalty
        myTotalOutPenaltyGoal+=myGoalOutPenalty
        myTotalPossession+=myPossession
        len++
      }
    }catch(e){replier.reply(len+1+"경기째 본인 혹은 상대방이 닉네임 변경을 하였습니다. 넥슨측에서 반영 후 검색가능합니다.")}
    replier.reply("<"+myName+">"+"\n최근 "+len+"경기 유형 조회\n"+"※ 각 정보는 경기당 기준 입니다."+"\n"+allsee+"\n"+"평균 점유율 : "+(myTotalPossession/len).toFixed(2)+"%\n"+"헤딩슛 시도 : "+(myTotalHeadingShoot/len).toFixed(2)+"번\n"+"헤딩골 : "+(myTotalHeadingGoal/len).toFixed(2)+"골\n"+"성공률 : "+(myTotalHeadingGoal/myTotalHeadingShoot *100).toFixed(2)+"%\n"
  +"페널티 안 슈팅 시도 : "+(myTotalInPenaltyShoot/len).toFixed(2)+"번\n"+"페널티 안 골 : "+(myTotalInPenaltyGoal/len).toFixed(2)+"골\n"+"성공률 : "+(myTotalInPenaltyGoal/myTotalInPenaltyShoot *100).toFixed(2)+"%\n"
+"페널티 밖 슈팅 시도 : "+(myTotalOutPenaltyShoot/len).toFixed(2)+"번\n"+"페널티 밖 골 : "+(myTotalOutPenaltyGoal/len).toFixed(2)+"골\n"+"성공률 : "+(myTotalOutPenaltyGoal/myTotalOutPenaltyShoot *100).toFixed(2)+"%\n" )
  }
}
