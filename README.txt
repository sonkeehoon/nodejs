윈도우에서 nodejs를 공부하다가..
pm2가 윈도우에서는 작동이 잘 안된다고해서 aws ec2인스턴스(ubuntu server)로 이사를 했다

리눅스에 nodejs 설치하는 방법

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.18.1
설치확인 : 
node --version


pm2 설치하기

pm2 설치 : npm install pm2 -g
pm2 실행 : pm2 start ${filename}.js --watch
현재 pm2에 의해 실행중인 프로그램 확인 : pm2 monit  // 나갈때는 q
현재 실행중인 프로세스들 확인 : pm2 list
pm2 프로그램 종료 : pm2 stop ${processName}
