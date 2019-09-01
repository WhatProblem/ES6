import Vue from 'vue'
import App from './App'
import router from './router/router.js'

import './style/myStyle.css'



/* 渲染模板 */
new Vue({
    router,
    render: h=>h(App)
}).$mount('#root')