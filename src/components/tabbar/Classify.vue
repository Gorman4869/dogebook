<template>
  <div class="classify" >
       <!-- -->
        <van-sidebar v-model="activeKey"  @change="onChange">
            <van-sidebar-item title="男生" />
            <van-sidebar-item title="女生" />
            <van-sidebar-item title="标签" />
            <van-sidebar-item title="出版" />
        </van-sidebar>
             <div class="c-right" >           
            <div class="booklist" >
<!-- male -->
                <van-divider :style="{ color: '#8A8A8A', borderColor: '#8A8A8A', padding: '0 16px' }">男生</van-divider>
                <ul>
                    <!-- <li v-for="(item,i) in mList" :key="i" > -->
                    <router-link :to="{name:'subcly',params:{major:item.name,gender:genderList[0]}}" v-for="(item,i) in mList" :key="i" tag="li">
                        <div class="desc">{{item.name}}<p>{{item.bookCount}}本</p></div>
                        <div class="pic">
                            <img :src="item.bookCover[0] | setPic()" >
                            <img :src="item.bookCover[1] | setPic()" >
                            <img :src="item.bookCover[2] | setPic()" >
                        </div>
                    </router-link>
                    <!-- </li> -->
                </ul>
<!-- female -->
                <van-divider :style="{ color: '#8A8A8A', borderColor: '#8A8A8A', padding: '0 16px' }">女生</van-divider>
                <ul>
                    <!-- <li v-for="(item,i) in fList" :key="i"> -->
                    <router-link :to="{name:'subcly',params:{major:item.name,gender:genderList[1]}}" v-for="(item,i) in fList" :key="i" tag="li">
                        <div class="desc">{{item.name}}<p>{{item.bookCount}}本</p></div>
                        <div class="pic">
                            <img :src="item.bookCover[0] | setPic()" >
                            <img :src="item.bookCover[1] | setPic()" >
                            <img :src="item.bookCover[2] | setPic()" >
                        </div>
                    </router-link>
                    <!-- </li> -->
                </ul>
                <van-divider :style="{ color: '#8A8A8A', borderColor: '#8A8A8A', padding: '0 16px' }">标签</van-divider>
<!-- publish -->
                <ul>
                    <!-- <li v-for="(item,i) in yList" :key="i"> -->
                    <router-link :to="{name:'subcly',params:{major:item.name,gender:genderList[3]}}" v-for="(item,i) in yList" :key="i" tag="li">
                        <div class="desc">{{item.name}}<p>{{item.bookCount}}本</p></div>
                        <div class="pic">
                            <img :src="item.bookCover[0] | setPic()"  >
                            <img :src="item.bookCover[1] | setPic()" >
                            <img :src="item.bookCover[2] | setPic()" >
                        </div>
                    </router-link>
                    <!-- </li> -->
                </ul>
                <van-divider :style="{ color: '#8A8A8A', borderColor: '#8A8A8A', padding: '0 16px' }">出版</van-divider>
                <ul>
                    <!-- <li v-for="(item,i) in pList" :key="i"> -->
                    <router-link :to="{name:'subcly',params:{major:item.name,gender:genderList[2]}}" v-for="(item,i) in pList" :key="i" tag="li">
                        <div class="desc">{{item.name}}<p>{{item.bookCount}}本</p></div>
                        <div class="pic">
                            <img :src="item.bookCover[0] | setPic()" >
                            <img :src="item.bookCover[1] | setPic()" >
                            <img :src="item.bookCover[2] | setPic()" >
                        </div>
                    </router-link>
                    <!-- </li> -->
                </ul>
            </div>
            
    </div>
  </div>
</template>

<script>
import { bookcly } from '../api/api'
// import BScroll from '@better-scroll/core'
export default {
    data() {
    return {
      activeKey: 0,
      pList:[],
      fList:[],
      mList:[],
      yList:[],
      genderList:[
          "male","female","press","picture",
      ]

    }
  },
  created(){
      this.getCate()
  },
  mounted(){
        //   this.scroll= new BScroll(this.$refs.wrapper,{})   
         window.addEventListener("scroll", this.handleScroll); 
  },
  methods:{
      getCate(){
          bookcly().then(res=>{
            // console.log(res.data)
            this.pList = res.data.press.slice(0,6)
            this.fList = res.data.female.slice(0,11)
            this.mList = res.data.male
            this.yList = res.data.picture
            // console.log( this.fList)
          })
      },
      onChange(index){
        let tags = document.querySelectorAll('.van-divider')
        document.documentElement.scrollTop = tags[index].offsetTop - 50
      },
    handleScroll(){
        let scrollY = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        if(scrollY < 360){
            this.activeKey = 0
        }
        if(scrollY >= 360){
            this.activeKey = 1
        }
        if(scrollY >= 800){
            this.activeKey = 2
        }
        if(scrollY >= 900){
            this.activeKey = 3
        }
    },
    // toSubCly(major,gender){
    //     console.log(major,gender)
    // }
  },
  destroyed(){
      //销毁监听
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style lang="less" scoped>
.classify{
    display: flex;
}
#app > div.classify{
    .van-sidebar{
    border-right: 1px solid #8A8A8A;
    position: fixed;
    height: 100%;
        .van-sidebar-item--select::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 4px;
            height: 30px;
            background-color: #26a2ff;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            content: '';
        }
    }
    .c-right{
        margin-left: 22%;
        // margin-top:2px;
        width:76%;
        // position: relative;
        // display: flex;
        // background-color: red;
        .booklist > ul{
            display: flex;
            flex-wrap:wrap;
            // height: 600px;
            // overflow: scroll;
            justify-content: space-around;
            
        }
        li{
            // background-color: #F9F9FB;
            background-color: #F9F9FB;
            color: #616166;
            margin-right: 5px;
            margin-bottom: 10px;
            // color: red;
            width: 140px;
            height: 60px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            // align-content: center;
            align-items: center;

            
            .desc{
                // float: left;
                font-size: 12px;
                color: #616166;
                margin-left: 12px;
                p{
                    font-size: 10px;
                    color: #9B9B9B;
                }
            }
            .pic{
                width: 70px;
                height: 100%;
                margin-right: 5px;
                // background-color: black;
                position: relative;

                img:nth-child(1){
                    position: absolute;
                    bottom: 0;
                    background-color: white;
                    margin-left: 12.5px;
                    width: 45px;
                    height: 55px;
                    z-index: 1;
                }
                img:nth-child(2){
                    position: absolute;
                    bottom: 0;
                    background-color: white;
                    // margin-left: 5px;
                    width: 40px;
                    height: 50px;
                }
                img:nth-child(3){
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background-color: white;
                    // margin-left: 5px;
                    width: 40px;
                    height: 45px;
                }
            }
        }
    }
} 
    
</style>