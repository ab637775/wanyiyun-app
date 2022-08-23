import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/vant_style/resetvant.less'
// 按需导入vant组件,可用插件导入函数替代
// import { Button } from 'vant';
// 导入插件调用函数
import getVant from './plugins/index.js'
const app = createApp(App)
getVant(app);
// app.use(Button)
app.use(store)
app.use(router).mount('#app')
