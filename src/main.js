import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'
import filter from './filter'
// import config from 'common/js/config'
// import util from 'common/js/util'
// import popup from 'popup'
// rem像素比
// require('common/js/flexible')
//公用样式文件
// require('common/css/base.scss');

// 路由模块和HTTP模块
Vue.use(VueRouter); 

// 使用filter
for (var k in filter) {
	Vue.filter(k, filter[k]);
};

// window.util 	= util;
// window.config 	= config;
// window.popup 	= popup;


/*--------------------------------------------dom操作 相关 end -------------------------------------------------------*/

let router = new VueRouter({
	mode: 'history',
	routes: routes
})

Vue.config.productionTip = false
const app = new Vue(Vue.util.extend({
	router,
}, App))

// 从而让整个应用都有路由功能
app.$mount('#app')


