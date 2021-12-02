<template>
  <div class="hotcomment">
      <h1>热门书评</h1>
      <van-loading size="24px" v-show="cloading">评论加载中...</van-loading>
      <ul v-show="!cloading">
        <li v-for="(item,i ) in commentList" :key="i">
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
          <div class="clearfix">
            <div class="left ">
              <img  :src="imgUrl+item.author.avatar">
              <div  class="info">
                <p>{{item.author.nickname}}</p>
                <p>{{item.updated | fomatTime()}}</p>
              </div>
            </div>
            <div class="right ">
              <van-rate v-model='item.rating' color="#ffd21e" readonly/>
              <p>{{item.likeCount}}人觉得有用</p>
            </div>
          </div>
          <!-- <hr> -->
        </li>
      </ul>

  </div>
</template>

<script>
import {bookComment} from '../api/api'
export default {
  props:['bookId'],
    data(){
        return{
          imgUrl:'http://statics.zhuishushenqi.com',
          commentList:[],
          cloading:true,
          
        }
    },
    created(){
      this.getComment()
    },
    methods:{
        getComment(){
          // console.log(this.bookId)
          bookComment(this.bookId).then(res=>{
            this.commentList = res.data.reviews.slice(0,5)
            this.cloading = false
            // console.log(this.commentList)
          })
        }
    }
}
</script>

<style lang="less" scoped>
.hotcomment{
  // background-color: red;
  margin: 20px 10px 0px 10px;
  overflow: scroll;
  >h1{
    font-size: 25px;
    font-weight: bold;
  }
  >ul{
    margin-top: 15px;
    >li{
      margin-bottom: 30px;
      height: 100%;
      border-bottom: 1px solid #cecece ;
      >h2{
        font-size: 20px;
        // font-weight: 600;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      >p{
        color: #8A8A8A;
        text-indent: 1em;
        margin-top: 20px;
      }
      >div{
        margin: 20px 0px 10px 0px;
        >.left{
          float: left;
          display: flex;
          >img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          >div{
            margin-left: 5px;
            margin-top: 5px;
            color:rgb(109, 109, 109);
            p:nth-child(2){
              color: #8A8A8A;
              margin-top: 5px;

            }
          }
        }
        >.right{
          margin-top: 5px;
          float: right;
          >p{
            color: #8A8A8A;
              margin-top: 5px;
              padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>