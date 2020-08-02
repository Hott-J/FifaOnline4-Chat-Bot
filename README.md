# * 피파온라인4 채팅 봇
- - -

      피파온라인4 유저 프로필, 선수 정보 검색(급여, 오버롤, 상세스텟 등 / 피파 어딕트 사이트 파싱), 진행중인 이벤트, 1vs1 / 2vs2 공식경기와 볼타라이브 전적 검색이 가능한 채팅봇입니다.

<br/>

## * 사용법
- - -

     사용 예시에서 직접 보여드리겠습니다. 템플릿으로 출력되는 것들은 모두 해당 칸을 누를 시 각 링크로 이동하여 상세정보를 볼 수 있습니다.
     

<br/>

## * 사용 예시
- - -

     !정보 (유저명)
   ![정보](https://user-images.githubusercontent.com/47052106/89118853-1ea54100-d4e4-11ea-9e35-b02dec235ad2.jpg)

<br/>

     !이벤트
  ![이벤트1](https://user-images.githubusercontent.com/47052106/89118859-311f7a80-d4e4-11ea-8fc5-ad572bccd497.jpg)
  ![이벤트](https://user-images.githubusercontent.com/47052106/89118880-7b086080-d4e4-11ea-972d-9db49420ed7d.jpg)
   
<br/>

     !일대일 (유저명)
  ![일대일](https://user-images.githubusercontent.com/47052106/89118887-89ef1300-d4e4-11ea-8939-b837d055761c.jpg)

<br/>

     !이대이 (유저명)
  ![일대일](https://user-images.githubusercontent.com/47052106/89118887-89ef1300-d4e4-11ea-8939-b837d055761c.jpg)

<br/>

     !일대일 (유저명)
  ![일대일](https://user-images.githubusercontent.com/47052106/89118887-89ef1300-d4e4-11ea-8939-b837d055761c.jpg)

<br/>

     !볼타격수 (유저명)
  ![KakaoTalk_20200802_172253278](https://user-images.githubusercontent.com/47052106/89119052-2e258980-d4e6-11ea-80ff-16b52947afbc.jpg)


   
<br/>

## * 구현 로직
- - -

     템플릿 type-object가 리스트이고, 리스트가 5개일시, 만약 리스트가 5개미만이라면 형식에 맞지 않아 전부다 공백으로 출력됩니다.
     따라서, try-catch 문을 활용하여 검색결과가 없을시에, 공백이 반환되도록 예외처리를 하였습니다.

<br/>

 ![맛집로직](https://user-images.githubusercontent.com/47052106/88889284-d3d4c080-d27a-11ea-9cf1-11912968bd15.JPG)
