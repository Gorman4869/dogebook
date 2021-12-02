<template>
  <div class="subcly">
      <div class="head-tags">
          <div class="type">
              <ul>
                  <li v-for="(item,i) in typeList" 
                  :key="i" :class="{active :item.value == type}"
                  @click="selected(item.value)">{{item.name}}</li>
              </ul>
          </div>
          <div class="minor">
              <ul>
                  <li :class="{active :all==1}" @click="minorSelected()" >全部</li>
                  <li v-for="(item,i) in mins" :key="i"  
                  v-show="mins.length>0"  
                  @click="minorSelected(item)" 
                  :class="{active :item ==minor}">{{item}}</li>
              </ul>
          </div>
      </div>
        <van-loading id="loading" size="50px" text-size="20px" vertical v-show="loading">
            {{this.$route.params.major}}小说加载中,稍等一会儿...
        </van-loading> 
      <div class="cly-booklist" ref="clyBook" v-show="!loading">
        <mt-loadmore
        :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="article"  v-for="(item,i) in bookInfoList" :key="i"  @click="toDetail(item._id)">
                    <div class="left">
                        <img :src="item.cover | setPic()" >
                    </div>
                        <div class="right">
                        <!-- <p class="p-title">凡人修仙传</p> -->
                        <h1>{{item.title}}</h1>
                        <p class="p-content">{{item.shortIntro}}</p>
                        <div>
                <!-- {{item.latelyFollower>1000?parseInt(item.latelyFollower/1000)+'k':item.latelyFollower}} -->
                            <div class="author"><van-icon name="contact" /> {{item.author}}</div>
                            <div class="a-tag">{{item.retentionRatio}}%留存</div>
                            <div class="a-tag">{{item.latelyFollower>1000?parseInt(item.latelyFollower/10000)+'万':item.latelyFollower}}人气</div>
                            <div class="a-tag">{{item.minorCate}}</div>
                        </div>
                    </div>
            </div>
        </mt-loadmore>
        <van-empty v-show="noBook"
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="这分类没有书籍，请选择其它选项！"
            />
      
      </div>

  </div>
</template>

<script>
import {bookclylist,bookclyinfo} from '../api/api'
export default {
        data(){
            return{
        allLoaded:false,
        type:'hot',//类型词的默认值
        all:1,//子分类选择全部
        noBook:false,//没有书的界面显示图片
        typeList: [
            {
            value: "hot",
            name: "热门"
            },
            {
            value: "new",
            name: "新书"
            },
            {
            value: "reputation",
            name: "好评"
            },
            {
            value: "over",
            name: "完结"
            },
            {
            value: "monthly",
            name: "包月"
            }
        ],// 类型词列表
        mins:[],
        minor:'',//minor是mins里的一个子项。
        gender: this.$route.params.gender,
        major:this.$route.params.major,
        bookInfoList:[],
        start:0,
        limit:15,
        loading:true,
        
            }
        },
        created(){
            this.getClyBookInfoList()
            this.enter()
        },
        methods:{
            getClyBookInfoList(){
                bookclyinfo(this.gender,this.type,this.major
                ,this.minor,this.start,this.limit).then(res=>{
                    this.bookInfoList = res.data.books
                    this.loading = false
                    if(this.bookInfoList.length ==0){
                        this.noBook = true;
                    }else{
                        this.noBook = false
                    }
                })
            },
            selected(value){
                this.type = value
                // console.log(this.type)
                this.start = 0
                this.getClyBookInfoList();
                document.documentElement.scrollTop =-document.querySelector(".mint-loadmore-content").offsetHeight
                // document.documentElement.scrollTop = document.body.scrollTop =0
            },
            // 跳转小说详情页
                toDetail(id){
                // console.log(id)
                    this.$router.push({name:'detail',query:{
                    bookid:id,
                }})
                },
                // 第二行标签点击
            minorSelected(keyword){
                if(!keyword){
                    this.minor = ''
                    this.all = 1
                }else{
                    this.minor =keyword
                    this.all = 0
                }
                //这里有个bug，当上拉加载更多数据时，
                //再切换别的标签，可视区域没法返回顶部。
               document.documentElement.scrollTop = document.body.scrollTop =0
                this.start = 0
                this.getClyBookInfoList();
            },
        loadBottom(){
          this.allLoaded = true;
            this.start = this.start +1;
             bookclyinfo(this.gender,this.type,this.major
                ,this.minor,this.start*15,this.limit).then(res=>{
                    this.bookInfoList=this.bookInfoList.concat(res.data.books)
                    // this.start++
                     this.$refs.loadmore.onBottomLoaded();
                })
          this.allLoaded =false 
            },

            enter(){
                bookclylist().then(res => {
                    res.data[ this.$route.params.gender].forEach(item => {
                    if (item.major ===this.$route.params.major) {
                        this.mins = item.mins;
                        //   console.log(vm.mins)
                    }
                    });
                });
                this.getClyBookInfoList(this.$route.params.gender, this.type, this.$route.params.major);
            }

        },
//     beforeRouteEnter(to, from, next) {
//     //   获取大类中的小类
//     next(vm => {
//     //在路由进来时，将分类中的子类名称放到mins中，渲染子类标签
//       bookclylist().then(res => {
//         res.data[ vm.$route.params.gender].forEach(item => {
//           if (item.major ===vm.$route.params.major) {
//             vm.mins = item.mins;
//             //   console.log(vm.mins)
//           }
//         });
//       });
//       //渲染书的列表，有个bug，直接刷新网址，这里执行的请求没有数据返回？
//       vm.getClyBookInfoList(vm.$route.params.gender, vm.type, vm.$route.params.major);
//     });
//   }
}
</script>
<style lang="less" scoped>
// #app > div.Subcly > div.head-tags
.subcly{
    >.head-tags{
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 90px;
        top: 38px;
        background-color:white;
        // background-color:blue;
        border-bottom: rgba(138,138,138,0.2) 1px solid;
        >.type ul{
            height: 40px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: nowrap;
            width: 100%; 
            border-bottom: 1px solid rgba(138,138,138,0.2);
            align-items: center;
            // #app > div.subcly > div.head-tags > div.type > ul 
            >li{
                flex: none;
                color: rgb(138,138,138,);
                font-size: 18px;
                margin-right: 25px;
                padding: 0 5px;
            }
            >li:nth-child(1){
                margin-left: 20px;
            }

        }

        >.minor ul{
            // background-color:black;
            height: 45px;
            // padding-bottom: 30px;
            display: flex;
            flex-wrap: nowrap;
            margin-top: 5px;
            align-items: center;
            overflow-x: scroll;
            position: relative;
            
            
            >li{
                flex: none;
                color: rgb(138,138,138,);
                font-size: 18px;
                margin-right: 20px;
                padding: 0 5px;
            }
            > li:nth-child(1){
                position: fixed;
                // position: absolute;
                // left: 20px;
            }
        }
        >.minor ul{
            margin-left: 80px;
            > li:nth-child(1){
                margin-left: -60px;
                position: fixed;
            }
        }
        >.minor ul::-webkit-scrollbar{width:0;}
    }
    >#loading{
        // margin-top: 250px;
            background: white;
            width: 100%;
            height: 700px;
            >span{
                margin-top: 250px;
            }
            >.van-loading__text{
                // color: green;
                margin-top: 25px;
            }
    }
    >.cly-booklist{
        position: relative;
        margin: 140px 10px 0px 10px;
        overflow: scroll;
        height: 600px;
        >.custom-image .van-empty__image {
            width: 90px;
            height: 90px;
        }
        .article{
            margin-bottom: 15px;
            display: flex;
            img{
                border-radius: 5px;
                width: 80px;
                height: 120px;
                box-shadow: 3px 3px 3px #888888;
            }
            .right{
                // position: relative;
                display: flex;
                margin-left: 10px;
                width: 100%;
                flex-direction: column;
                justify-content: space-around;
                h1{
                    font-size: 20px;
                    display: inline-block;
                }
                .p-content{ 
                    width: 100%;
                    height: 60px;
                    // white-space: wrap;
                    // line-height: 13px;
                    font-size:12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    color: #8A8A8A; 
                }
                >div{
                    margin-top: 3px;
                    // display: flex;
                    text-align: center;
                    // justify-content: space-between;
                    .author{
                        // height: 50px;
                        color:#8A8A8A;
                        float: left ;
                        font-size: 12px;
                        margin-top: 9px;
                    }
                    .a-tag{
                        float: right ;
                        // width: 50px;
                        color:#8A8A8A;
                        padding: 1px 4px;
                        margin-top: 5px;
                        font-size: 10px;
                        margin-right: 10px;
                        border:solid 0.5px #8A8A8A;
                        border-radius: 10px;
                        background-color: #F1F0F5;
                        
                    }
                    >div:nth-child(2), >div:nth-child(3){
                        color: #f85860;
                        background-color: #FBEAF1;
                    }
                }
            }
        }   
    }
}
.active{
    color: #26a2ff !important;
    border: 0.5px solid #26a2ff;
    border-radius: 12px;
    background-color:  whitesmoke;

}
</style>