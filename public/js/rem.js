function remSize() {
  // 获取设备的宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  // 1rem == 100px , 7.5rem == 750 px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  // 设置body的字体大小为0.3rem，即15px
  document.querySelector('body').style.fontSize = .3 + 'rem'

}
remSize();
// 页面布局改变时，调用函数响应式布局
window.onresize = function () {
  remSize();
}