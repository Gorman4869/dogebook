<template>
  <div class="searchresult">
      <div class="head"><van-icon name="guide-o" />书籍</div>     
      <div class="cly-booklist" ref="clyBook">
        <mt-loadmore
        :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="article"  v-for="(item,i) in bookList" :key="i"  @click="toDetail(item._id)">
                    <div class="left">
                        <img :src="item.cover | setPic()" >
                    </div>
                        <div class="right">
                        <h1>{{item.title}}</h1>
                        <p class="p-content">{{item.shortIntro}}</p>
                        <div>
                            <div class="author"><van-icon name="contact" /> {{item.author}}</div>
                            <div class="a-tag">{{item.retentionRatio}}%留存</div>
                            <div class="a-tag">{{item.latelyFollower>1000?parseInt(item.latelyFollower/1000)+'k':item.latelyFollower}}人气</div>
                            <div class="a-tag">{{item.cat}}</div>
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
import{searchresult} from '../api/api'
export default {
    data(){
        return{
            query:this.$route.query.val,
            bookList:[],
            count:0,
            noBook:false,
            allLoaded:false,
        }
    },
    created(){
        this.getBookList()
    },
    methods:{
        getBookList(){
            searchresult(this.query).then(res=>{
                // console.log(res.data)
                if(!res.data.books) return this.noBook = true
                this.bookList = res.data.books.slice(0,15)
            })
        },
        loadBottom(){       
          this.allLoaded = true;
          searchresult(this.query).then(res=>{
                this.bookList = res.data.books.slice(0,this.count*15+15)
                this.count++;
                this.$refs.loadmore.onBottomLoaded();
            })
          this.allLoaded =false
      },
      toDetail(id){
            this.$router.push({name:'detail',query:{
            bookid:id,
            }})
        },
    }
}
</script>

<style lang="less" scoped>
.searchresult{
    .head{
        font-size: 20px !important;
        text-align: center;
        border-bottom: 1px solid rgba(138,138,138,0.5);
        padding: 5px 18px 5px 0
    }
        >.cly-booklist{
        position: relative;
        margin: 10px 10px 0px 10px;
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
</style>