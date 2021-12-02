<template>
<!-- <LoadMore
  @pull='pulldown'> -->
  <div class="home">
<!-- 搜索 -->
    <div id="search" @click="goSearch">
        <input type="text" name="s" class="text" :placeholder="holdWord" disabled />
        <i class="iconfont icon-sousuo"></i>
    </div>
<!-- 超级简陋的轮播图 -->
    <mt-swipe :auto="4000" >  
        <mt-swipe-item >
          <img src="../../assets/img/6.jpg"  @click="toBlog">
        </mt-swipe-item>
        <mt-swipe-item   @click="toBlog">
          <img src="../../assets/img/7.jpg">
        </mt-swipe-item>
        <mt-swipe-item  @click="toBlog">
          <img src="../../assets/img/8.jpg">
        </mt-swipe-item>
        <mt-swipe-item >
          <img src="../../assets/img/9.jpg">
        </mt-swipe-item>
    </mt-swipe>
    <div class="hotsale">
      <div class="hotsale-title clearfix">
        <p>全网热搜TOP10</p>
<!-- 这里记得处理点击更多跳转热搜版截面 -->
        <div><span>更多<i class="iconfont icon-xiangyou_fanhui"></i></span></div>
      </div>
<!-- 这里记得处理点击跳转小说详情页 -->
      <div class="hotsale-body clearfix">
          <div v-for="(item,i) in hotSaleBooks" :key="i" @click="toDetail(item._id)">
            <div class="left">
              <img :src="item.cover | setPic()">
            </div>
            <div class="right">
              <p class="p-title">{{item.title}}</p>
              <mt-badge size="small">{{item.majorCate}}</mt-badge>
              <div>{{item.retentionRatio}}%<span>留存</span></div>
            </div>
          </div>
      </div>
    </div>
    <hr SIZE=1>
    <div class="hotsale">
      <div class="hotsale-title clearfix">
        <p>起点推荐TOP10</p>
<!-- 这里记得处理点击更多跳转起点截面 -->
        <div><span>更多<i class="iconfont icon-xiangyou_fanhui"></i></span></div>
      </div>
<!-- 这里记得处理点击跳转小说详情页 -->
      <div class="hotsale-body clearfix">
          <div v-for="(item,i) in ReList" :key="i"  @click="toDetail(item._id)">
            <div class="left">
              <img :src="item.cover | setPic()">
            </div>
            <div class="right">
              <p class="p-title">{{item.title}}</p>
              <mt-badge size="small">{{item.majorCate}}</mt-badge>
              <div>{{item.retentionRatio}}%<span>留存</span></div>
            </div>
        </div>
      </div>
    </div>
  </div>
<!-- </LoadMore> -->
</template>

<script>
// import '../../'
export default {
    name:'Home',
    data(){
        return{
          holdWord:'',
          hotWordList:[],
          intNum:null,
          count:0,
          hotSaleBooks:[],
          ReList:[],

        }
    },
    created(){
      this.getHotWord()
      this.getHotSale()
      this.getRe()
    },

    
    methods:{
      getHotWord(){
        this.axios.get('hot-books')
        .then(res => {
          this.hotWordList = res.data.newHotWords
          this.holdWord = this.hotWordList[this.count].word;
        });       
      },
      //稍微调皮一下
      toBlog(){
        window.open('https://gorman4869.github.io/','_blank')
      },
      getHotSale(){
        this.axios.get('rank/54d42d92321052167dfb75e3')
        .then(res => {
          // console.log(res.data.ranking.books)
          this.hotSaleBooks = res.data.ranking.books.slice(0,10)
        })
      },
      getRe(){
        this.axios.get('rank/54d430e9a8cb149d07282496')
        .then(res => {
          // console.log(res.data.ranking.books)
          this.ReList = res.data.ranking.books.slice(0,10)
        })
      },
      pulldown(){
        // console.log(8888888888)
      },
      goSearch(){
        this.$router.push({name:'search'})
      },
      toDetail(id){
            this.$router.push({name:'detail',query:{
          bookid:id,
        }})
      }
    },
    mounted(){
      clearInterval(this.intNum)
          this.intNum = setInterval(() => {
              this.count = this.count+1
              this.holdWord = this.hotWordList[this.count].word
              if(this.count == this.hotWordList.length-1){
                return this.count =0;
              }
            }, 5000)
    },
    destroyed() {
        clearInterval(this.intNum)
      },

}
</script>

<style lang="less" scoped>


#search{
  width:100%;
	float:right;
	height:50px;
  text-align: center;
	position:relative;
	margin-top:16px;
  i{
    font-size: 20px;
    position: absolute;
    left:20px;
    top:7px;
  }
}
#search input{
  background:#EBEBF0;
	padding-left:35px;
  width: 85%;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 12.5px;
}
.home{
  .mint-swipe{
    width: 92%;
    height: 150px;
    margin:0 auto;
    border-radius: 10px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .hotsale{
    width: 92%;
    margin: 20px auto;
    .hotsale-title{
      display: flex;
      justify-content: space-between;
      p{
        text-align: center;
        color: black;
        font-size: 20px;
        font-weight: bolder;
      }
      div{
        font-size: 16px !important;
        color: grey;
        margin-top: 3px;
        margin-right: -180px;
      }
    }
    .hotsale-body{ 
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: flex-start;
      >div{
        display: flex;
        width: 180px;
        height: 100px;
        margin-top: 20px;
        // margin-right: 5px;
        .right{
          // flex: 1;
          position: relative;
          margin-left: 10px;
          width: 85px;
          p{
            height: 36px;
            line-height: 18px;
            position:relative;
            font-size: 18px;
            overflow: hidden;
            text-overflow:ellipsis;
            color: #333333; 
            // color: whitesmoke;
          }
          .mint-badge{
              position:absolute;
              margin-top: 8px;
              background: #EFEFF4;
              color: #7F7F7F;
            }
          div{
            color: #DA3D3F;
            position: absolute;
            bottom: 0;
            font-size: 15px;
            font-weight: bold;
            
            span{
              color: #DA3D3F;
              font-size: 13px;
              font-weight: 300;
            }
          }
        }
      }
      img{
        width: 80px;
        height: 100px;
        box-shadow: 3px 3px 3px #888888;
      }
      
    }
    .hotsale-body:after{
        content: '';
        width: 30%;
        border:1px solid transparent;
      }
    

  }
  
}
#app > div.home > hr{
      margin-top: 25px;
      width:95%;
      color: red !important;
      opacity:0.5;
    }
</style>