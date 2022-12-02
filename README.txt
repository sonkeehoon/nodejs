윈도우에서 nodejs를 공부하다가..
pm2가 윈도우에서는 작동이 잘 안된다고해서 aws ec2인스턴스(ubuntu server)로 이사를 했다

리눅스에 nodejs 설치하는 방법
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.18.1 (18.대버전은 pm2가 잘 안되는것 같다)
설치확인 : 
node --version

pm2 설치하기
터미널을 종료해도 nodejs 서버가 실행되게 하려면 pm2가 필요하다
pm2 설치 : npm install pm2 -g
pm2 실행 : pm2 start ${filename}.js --watch
현재 pm2에 의해 실행중인 프로그램 확인 : pm2 monit  // 나갈때는 q
현재 실행중인 프로세스들 확인 : pm2 list
pm2 프로그램 종료 : pm2 stop ${processName}.js
실시간 로그 : pm2 log
* 마무리 할때는 pm2 stop main.js 먼저 하고 ec2 인스턴스를 끄자.

2022-12-02
ec2인스턴스(우분투)에서 pm2 start ${filename}.js --watch 를 하면 잠시 뒤에 인스턴스 자체가 멈춰버리는 오류가 나타났다.
우선 --watch가 주는 실시간으로 저장한 파일을 반영하는 기능은 포기하기로 하고
main.js를 수정한 경우에는 저장하고 pm2 restart ${filename}.js 하면 팅기지도 않고 안전하게 변경사항이 적용된다. 


