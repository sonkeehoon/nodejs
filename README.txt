생활코딩 nodejs 강의 들으면서 따라하는 코드

윈도우에서 nodejs를 pm2로 작동 하려다가..
pm2가 윈도우에서는 작동이 잘 안된다고해서 aws ec2인스턴스(ubuntu server)로 이사를 했다

리눅스에 nodejs 설치하는 방법
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.18.1 (18.대버전은 pm2가 잘 안되는것 같다)
설치확인 : 
node --version

2022-12-02
ec2인스턴스(우분투)에서 pm2 start main.js --watch 를 하면 잠시 뒤에 인스턴스 자체가 멈춰버리는 오류가 나타났다.
우선 --watch가 주는 실시간으로 저장한 파일을 반영하는 기능은 포기하기로 하고
main.js를 수정한 경우에는 저장하고 pm2 restart main 하면 팅기지도 않고 안전하게 변경사항이 적용된다.

2022-12-04 
pm2 때문에 우여곡절이 많았다..
pm2는 안쓰기로 결정했다. 
참고로 forever 이라는 패키지도 있다.
forever 설치 : npm install -g forever

최종 결정
- 코드를 실행할때는 node main.js
- 코드를 수정하고 다시 실행할때는 ctrl+c 누른후 node main.js
- 수정을 마치고 ctrl+c
- 만약 main.js를 터미널이 종료됐을때도 계속 켜놓고 싶다면 forever start main.js
- 이렇게 하면 vscode를 꺼도 main.js는 꺼지지 않는다
- forever start한 main.js를 끄고 싶다면  forever stop main.js
- 실행중인 forever 목록보기 : forever list 
- nodejs는 일단 윈도우에서만 코딩하자..(생활코딩 강의 들을때는)



