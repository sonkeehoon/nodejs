var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

module.exports = M; // 이 파일에서 M이 가리키는 객체를 바깥에서 사용할수 있도록 허용