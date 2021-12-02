<template>
  <div class="detail">
      <!-- <van-notify>
        </van-notify> -->
    <van-loading id="loading" size="50px" text-size="20px" vertical v-show="loading">
            小说详情页加载中,稍等一会儿...
    </van-loading> 
    <div class="getloading" v-show="!loading">
      <div class="head">
          <img :src="book.cover | setPic()" alt="" class="clearfix">
          <div class="right clearfix" >
              <div class="title">{{book.title}}</div>
              <div class="rate"><span>{{fen}} </span><van-rate v-model="value" color="#ffd21e" readonly/> | {{ren}}人评</div>
              <div class="intro"><span><van-icon name="contact" />{{book.author}}</span> | {{book.majorCate}}{{book.minorCate}}</div>
              <div class="count">{{book.wordCount>10000?parseInt(book.wordCount/10000):book.wordCount}}万字 |
                 
                  <span v-if="book.isSerial">{{book.updated | fomatTime()}}更新</span>
                  <span v-else>已完结</span>
                </div>
          </div>
      </div>
      <div class="btn" > 
          <van-button class="btn1" type="primary" color="#FFDEC6" 
          round block size="normal" @click="handleToCrack">{{flag?'加入书架':'撤出书架'}}</van-button>
          <van-button  type="info" color="#EE4745"
          round block size="normal" @click="toRead">立即阅读</van-button>
      </div>
      <div class="msg">
          <div>
              <p>{{book.latelyFollower}}</p>
              <p>追书人气</p>
          </div>
          <div>
              <p>{{book.retentionRatio}}%</p>
              <p>读者留存</p>
          </div>
          <div>
              <p>{{book.serializeWordCount}}</p>
              <p>日更字数</p>
          </div>
      </div>
      <div class="summary">
        <van-collapse class="collapse"  :border="false" v-model="activeNames">
            <van-collapse-item  size="large" :border="false"
            title="简介" name="1">
            {{book.longIntro}}
            </van-collapse-item>
        </van-collapse>
      </div>
      <div class="tags">
          <ul>
              <li v-for="(item,i) in book.tags" :key="i">{{item}}</li>
          </ul>
      </div>
      <div class="fenge"></div>
      <Hotcomment :bookId="bookId"></Hotcomment>
      <div class="fenge"></div>
      <Recommend :bookId="bookId"></Recommend>
    </div>
    <van-notice-bar
        mode="closeable"
        left-icon="volume-o"
        text="该小项目仅用于练手、学习，请勿商用，如有侵权！通知必删！Gorman4869。"
        />
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {bookDetail,book} from '../api/api'
import Hotcomment from './Hotcomment.vue'
import Recommend from './Recommend.vue'
import {getLocalData,setLocalData} from '../api/utils'
export default {
    components: { Hotcomment,Recommend },
    data(){
        return{
            value:5,
            activeNames:['1'],
            bookId:this.$route.query.bookid,
            fen:0,
            ren:0,
            book:{},
            updated:'',
            time:'',
            flag:true,
            sourceId:'',
            loading:true,

        }
    },
    created(){
        
        this.getBook()
        this.checkFlag()
        this.getSourceId()
    },
    mounted(){
        
    },
    computed:{
        ...mapState(['bookInfo',]),
    },
    methods:{
        ...mapMutations({
        setbook:'setBook',
        setSourceId:'setSourceId',
       setHeadTitle:'setHeadTitle'
      }),
        getBook(){
            // console.log(this.bookId)
            bookDetail(this.bookId).then(res=>{
                // console.log(res.data.rating.score)
                this.book = res.data
                this.setbook(this.book)
                //不知为啥老是报错，所以将这两项单独拿了出来。
                this.ren =  res.data.rating.count
                this.fen = res.data.rating.score.toFixed(1)

                this.setHeadTitle(this.book.title)
                this.loading = false
            })
        },
        // 拿到书源id=>从而拿章节的目录
        getSourceId(){
            book(this.bookId).then(res=>{
                // console.log(res.data)
                this.sourceId = res.data[0]._id
                this.setSourceId(this.sourceId)
                // console.log(this.$store.state.sourceId)
            })
        },
        // 进入详情页时，判断该书是否已经在书架上。
        checkFlag(){
            let books = getLocalData('books')
            if(books&&books[this.bookId]){
                this.flag = false
            }else{
                this.flag = true
            }
        },

        //将书籍的部分信息添加到localstorage里面存起来。
        handleToCrack(){
            // console.log(this.bookInfo)
            let books = getLocalData('books')
            this.flag = !this.flag
            if(!this.flag){
                books[this.book._id]={
                    cover:this.book.cover,
                    flag:!this.flag,
                    id:this.book._id,
                    lastChapter:this.book.lastChapter,
                    updated:this.book.updated,
                    author:this.book.author,
                    sourceId:this.sourceId,
                    currentChapter:1,
                    title:this.book.title,
                }
                this.$notify({ type: 'success', message: '成功加入书架' });
                setLocalData('books',books)

            }else{
                delete books[this.book._id]
                setLocalData('books',books)
                this.$notify({ type: 'danger', message: '已撤出书架' });
                
            }
        },
        // 去阅读页面
        toRead(){
            this.$router.push({name:'read',query:{
          bookid:this.bookId,
            }})
        }
        
    },
    beforeDestroy(){
        this.$store.state.headtitle = "真相永远只有一个！Bug却有无数个！"
    }

}
</script>

<style lang="less" scoped>
.detail{
    // position: relative;
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

    >.getloading {

        .head{
            margin: 50px 10px;
            background: whitesmoke;
            >img{
                float: left;
               border-radius: 5px;
                    width: 100px;
                    height: 150px;
                    box-shadow: 3px 3px 3px #888888; 
            }
            .right{
                float: left;
                margin-left: 15px;
                display: flex;
                flex-direction: column;
                >div{
                    flex: none;
                    // color: #ffd21e;
                }
                .title{
                    font-size: 25px;
                    font-weight: 800;
                    width: 220px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    
                }
                .rate{
                    margin-top: 15px;
                    color: #8A8A8A;
                    >span{
                        color: #ffde5a;
                        font-size: 25px;
                        font-weight: 800
                    }
    
                }
                .intro{
                    color: #8A8A8A;
                    margin-top: 10px;
                    >span{
                        // color: #f3767c;
                         color: black;
                        font-size: 18px;
                        font-weight: 800;
                    }
                }
                .count{
                    margin-top: 10px;
                    color: #8A8A8A;
                    font-size: 18px;
                }
            }
        }
        >.btn{
            width: 95%;
            // height: 100px;
            padding: 10px;
            display: flex;
            >.van-button{
                font-size: 18px;
                margin-right: 10px;
                
            }
            >.btn1{
                color: #FF5E01 !important;
            }
        }
        >.msg{
            display: flex;
            justify-content: space-around;
            background-color: rgb(245, 245, 245);
            border-radius: 10px;
            margin: 0px 10px;
            padding: 10px 10px;
            >div{
                flex: none;
                font-size: 18px;
                font-weight: bold;
                >p:nth-child(2){
                    color: #8A8A8A;
                    font-size: 14px;
                    font-weight: 500;
                }
            }
        }
        >.summary{
            border-radius: 10px;
            background-color: rgb(245, 245, 245);
            margin:10px;
            .collapse{
                padding: 10px;
            }
            
        }
        >.tags{
            
            margin: 0 10px;
            border-radius: 5px;
            background-color: #fbfbfa;
            // border: 1px solid #ebebeb;
            padding: 10px 10px;
            >ul{
                display: flex;
                overflow: scroll;
                >li{
                    flex: none;
                    margin-right: 5px;
                    background-color:  rgb(245, 245, 245);
                    border-radius: 10px;
                    padding: 1px 5px;
    
                }
            
            }
            >ul::-webkit-scrollbar{width:0;}
        }
        >.fenge{
            // width: ;
            height: 20px;
            background-color: #ebebeb;
        }
    }
}
</style>