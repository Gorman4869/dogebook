import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import './assets/iconfont/iconfont.css'
import './assets/css/global.css'
import axios from 'axios'

import './plugins/vant.js'
import store from './components/store/index'

import LoadMore from './components/sub/LoadMore'
Vue.component('LoadMore',LoadMore)//创建全局组件


//把axios放在vue原型链上。
axios.defaults.baseURL = 'https://novel.kele8.cn/'
axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.prototype.axios = axios
Vue.config.productionTip = false

//全局引入MIntUI
Vue.use(MintUI)







//过滤器一定要在实例之前使用！！！！

// 定义个全局过滤器处理图片
Vue.filter('setPic',(url)=>{
  if(!url){
    let myurl =  'http://img.1391.com/api/v1/bookcenter/cover/1/41991/41991_922b2454bebc4c44b3aa4da0cffffd54.jpg/'
    return myurl
  }
  return url.replace(/%2F/g,'/').replace(/%3A/g,':').replace(/\/agent\//,'')
})

// 定义个全局过滤器处理时间
Vue.filter('fomatTime', function (valueTime) {

  if(valueTime){
    var oldDate = Date.parse(valueTime)
    var newData =  Date.parse(new Date());
    var diffTime = Math.abs(newData-oldDate);
    if (diffTime > 7 * 24 * 3600 * 1000) {
      var date = new Date(valueTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('1' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y+'-'+ m + '-' + d+' '+h+':'+minute;

    } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");

      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      return dayNum + "天前";

    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
      return dayNum + "小时前";

    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 1000));
      return dayNum + "分钟前";

    }
  }
});



new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
  beforeDestroy(){
    this.$bus.$off('loadRankBottom')
  }
}).$mount('#app')