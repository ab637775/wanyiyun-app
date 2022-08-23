// 调用Vant库里的插件
import { Button, Swipe, SwipeItem, Popup  } from 'vant';
let vantArr = [Button, Swipe, SwipeItem, Popup ]
// 定义函数来循环调用app.use
export default function getVant(app){
  vantArr.forEach(item => {
    app.use(item)
  })
}