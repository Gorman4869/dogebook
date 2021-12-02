<template>
  <div id="app">
    <!-- 头部信息 -->
    <mt-header :title="this.$store.state.headtitle" fixed  ref="header" >     
      <div @click="getBack"  slot="left">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <keep-alive >
      <router-view v-if="$route.meta.keepAlive" ></router-view> 
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> 
    
    <!-- 底部导航 -->
    <mt-tabbar  ref="tabbar" fixed v-model="selected" >
      <mt-tab-item id="home">
        <router-link :to="{name:'home'}"  tag="div">
          <div><i class="iconfont icon-shouye"></i></div>
          <h1>首页</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="bookcrack">
        <router-link :to="{name:'bookcrack'}" tag="div">
          <div><i class="iconfont icon-shujia"></i></div>
          <h1>书架</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="classify">
        <router-link :to="{name:'classify'}"  tag="div">
          <div><i class="iconfont icon-fenlei"></i></div>
          <h1>分类</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="rank">
        <router-link :to="{name:'rank'}" tag="div">
            <div><i class="iconfont icon-paihangbang" ></i></div>
            <h1>排行</h1>
        </router-link>

      </mt-tab-item>
    </mt-tabbar>

    
  </div>
  
</template>

<script>
// import './assets/iconfont/iconfont.css'
export default {
  name: 'App',
  data(){
    return{
      selected:'',
      flag:true,
      fag:true,
    }
  },
  mounted(){
    this.selected = this.$route.name
  },
  methods:{
    getBack(){
      this.$router.go(-1)
      
      setTimeout(() => {
        this.selected = this.$route.name
        location.reload()
      }, 500);
      
    },

  }
}
</script>

<style>

/* body{
  background-color: #fff;
} */
.mint-header.is-fixed{
  /* height: 30px; */
  z-index: 10 !important;
}
#app > header > h1{
  font-size: 20px;
}
#app{
  background-color: #fff;
  margin-top: 40px;
}
/* #app > div.mint-tabbar.is-fixed{ */
    /* position: sticky !important; */
    /* position: sticky !important; */
/* } */
#app .mint-tabbar > .mint-tab-item.is-selected{
  color: #00728D;
  /* background-color:#fff; */
  background-color:whitesmoke;
  
}


/* tabbar图标和字体调整 */
#app .mint-tabbar > .mint-tab-item .mint-tab-item-label h1{
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
}
#app .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label{
 animation:myfirst .5s linear;
}
/* tabbar缩放小动画 */
@keyframes myfirst{
    0%   {transform: scale(1,1);}
    50%  {transform: scale(1.1,1.1);}
    100% {transform: scale(1,1);}
}
.mint-header{
  background-color: #00728D !important;
}

/* #app > div.empty{
  height: 47px;
} */
</style>
