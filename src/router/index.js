import Vue from 'vue'
import VueRouter from 'vue-router'
import classify from '../components/tabbar/Classify'
import home from '../components/tabbar/Home'
import rank from '../components/tabbar/Rank'
import bookcrack from '../components/tabbar/Bookcrack'
import Subcly from '../components/sub/Subcly'
import Search from '../components/sub/Search'
import Searchresult from '../components/sub/Searchresult'
import Detail from '../components/sub/Detail'
// import Mulu from '../components/read/Mulu'
import Read from '../components/read/Read'


Vue.use(VueRouter)

const routes = [
    {path:'/',redirect:'/home'},
    {
        path: '/home',
        name: 'home',
        component:home,
        meta: {
            keepAlive: true // 需要被缓存
          }
    },
  
  
    {
        path: '/classify',
        name: 'classify',
        component:classify,
    },
  
    {
        path: '/bookcrack',
        name: 'bookcrack',
        component:bookcrack,
        
    },
  
    {
        path: '/rank',
        name: 'rank',
        component:rank,
        meta: {
            keepAlive: true // 需要被缓存
          }
    },
    {
      //这里记得加上gender和marjor路径
        path: '/subcly/:major:gender',
        name: 'subcly',
        component:Subcly,
        meta: {
          keepAlive: true // 需要被缓存
        },
    },
    {
        path: '/search',
        name: 'search',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component:Search,
        
    },
    {
      path: '/searchresult',
      name: 'searchresult',
      component:Searchresult,
    },
    {
      path: '/detail',
      name: 'detail',
      component:Detail,
    },
    // {
    //   path: '/mulu',
    //   name: 'mulu',
    //   component:Mulu,
    //   // meta: {
    //   //   keepAlive: true // 需要被缓存
    //   // }
    // },
    {
      path: '/read',
      name: 'read',
      component:Read,
    }
  
      
  ]


const router = new VueRouter({
    routes,
  })


export default router