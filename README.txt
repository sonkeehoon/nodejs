리눅스(레드헷 계열)에 nodejs 설치하는 방법

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.18.1
설치확인
node --version

PM2 설치 : npm install pm2 -g
PM2 실행 : `pm2 start ${filename}.js`
