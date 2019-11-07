/* 
  maxtime: 时间长度 单位秒
  minutes: 响应式的分  字符串
  seconds: 响应式的秒  字符串
  _this: vue实例
*/
function CountDown(maxtime,minutes,seconds,_this) {
    var timer
    (function () {
        timer = setInterval(function(){
            if (maxtime >= 0) {
                _this[minutes] = Math.floor(maxtime / 60)<10?('0'+Math.floor(maxtime / 60)):Math.floor(maxtime / 60);
                _this[seconds] = Math.floor(maxtime % 60)<10?('0'+Math.floor(maxtime % 60)):Math.floor(maxtime % 60);
                --maxtime;
            } else {
                clearInterval(timer);
                alert('倒计时结束')
            }
        }, 1000);
    })()
    
}
export default CountDown