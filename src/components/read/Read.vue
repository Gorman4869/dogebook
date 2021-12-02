<template>
  <div class="read" ref="reads">
       <header :style="{backgroundColor:color}"><van-icon @click="goBack"  name="arrow-left" />{{bookTitle}}</header>
      <div class="read1" v-show="!Mulu">
        <van-loading id="loading" size="50px" :style="{backgroundColor:color}" text-size="20px" vertical v-show="loading">
            文章加载中,稍等一会儿...
        </van-loading> 
    <!-- 文章内容 -->
        <div v-show="!loading" :style="{backgroundColor:color}" @click="showSet" class="article">
                <p class="title">{{content.title}}</p>
                    <div  v-for="(item,i) in content.cpContent" :key="i">
                        <p class="read-text" :style="{ fontSize: font + 'px' }"  v-html="item"></p>
                    </div>

            <div class="btns">
                <van-button  round @click="next">下一章</van-button>
                <div class="down">
                    <van-button  round @click="before">上一章</van-button>
                    <van-button round @click="showMulu">目录</van-button>
                </div>
            </div>           
        </div>
        <div class="set" v-show="setStatus">
                <div class="font">
                    <van-button hairline round @click="setFont(0)">A-</van-button>
                    <van-button hairline round @click="setFont(1)">A+</van-button>
                </div>
                <div class="color">
                    <van-button  round @click="setColor(0)">默认</van-button>
                    <van-button round @click="setColor(1)">夜间</van-button>
                    <van-button round @click="setColor(2)">护眼</van-button>
                </div>
                <div class="chap">
                    <van-button  round @click="before">上一章</van-button>
                    <van-button round @click="showMulu">目录</van-button>
                    <van-button round @click="next">下一章</van-button>
                </div>
        </div>
      </div>
      <Mulu v-show="Mulu" @showContent="showContent"></Mulu>
  </div>
</template>

<script>
import {getLocalData,setLocalData} from '../api/utils'
import { bookContent ,bookMulu,book,bookDetail} from '../api/api'
import { Dialog } from 'vant';
import Mulu from './Mulu.vue'
export default {
    components: { Mulu },
    data(){
        return{
             bookId:this.$route.query.bookid,
             bookTitle:'',
             theBook:null,
             link:this.$route.params.link,
             chapters:'',
             content:[],
             loading:true,
             Mulu:false,
             sourceId:'',
             currentChap:0,
             currentlink:'',
             flag:true,
             noCrackBook:null,
             color:'#F6EDEE',
             font:15,
             setStatus:false,
        }
    },
    created(){
        this.checkFlag()      
        this.getSourceId()
    },
    mounted(){
        this.hide()
    },
    methods:{
        // 藏底部导航
        hide(){
            // document.querySelector(".mint-tabbar").style.opacity = '0'
            document.querySelector(".mint-header").style.display = 'none'
            document.querySelector(".mint-tabbar").style.display = 'none'
        },
// 判断这本书是否在书架中
        checkFlag(){
            let books = getLocalData('books')
            if(books&&books[this.bookId]){
                this.flag = false
                this.theBook = books[this.bookId]
                this.bookTitle = this.theBook.title
            }else{
                this.flag = true
                 bookDetail(this.bookId).then(res=>{
                        //    console.log('获取当前这本书的信息，不在书架上的')
                    this.noCrackBook = res.data
                    this.bookTitle = this.noCrackBook.title

                })

            }
        },
// 缓存当前章节索引
    getBookindex(){
      var bookCurrentChap =getLocalData('booksCurrentChap')
       bookCurrentChap[this.bookId]={
              bookCurrentChap:this.currentChap
        }
      setLocalData('booksCurrentChap',bookCurrentChap)
    },


// 重新拿书籍源的id
        getSourceId(){
            book(this.bookId).then(res=>{
                this.sourceId = res.data[0]._id
                // console.log(this.sourceId)
                    bookMulu(this.sourceId).then(res=>{
                    // console.log(res.data)
                    this.chapters = res.data.chapters
                    // 先看下本地有没有该书籍之前缓存的章节的索引
                    var bookCurrentChap =getLocalData('booksCurrentChap')
                    if(bookCurrentChap&&bookCurrentChap[this.bookId]){
                        this.currentChap = bookCurrentChap[this.bookId].bookCurrentChap
                    }



                    this.currentlink = this.chapters[this.currentChap].link
                    this.getContent(this.currentlink)
                    // console.log(this.chapters)
                })
            })
        },
// 根据link拿到章节内容
        getContent(link){
            link = encodeURIComponent(link)
            var con = []
            bookContent(link).then(res=>{
                // console.log(res.data)
                var datas = res.data.chapter;
                con.push({
                    cpContent: datas.isVip
                    ? ["接口返回的资源解析不了，别看了"]
                    : datas.cpContent?datas.cpContent.split('\n'):datas.body.split('\n'),
                    title:datas.title
                });
                var cont = con[0];
                this.content=cont
                this.loading = false
            })
        },

// 切换目录
        showMulu(){
            this.Mulu = true;
            this.$bus.$emit('scroll',this.currentChap)
            // this.$refs.gcell.scrollTop=0;
        },
// 切换内容
        showContent(link,currentChap){
            // console.log(link,currentChap)
            
            this.currentChap = currentChap
            //如果是通过章节列表里面拿内容的link，第一章的currentChap就是0
            //currentChap到时存在书架时，记得加1
            this.getBookindex()
            this.getContent(link)
            this.Mulu = false
            this.$refs.reads.scrollTop=0;
        },
//下一章
        next(){
            this.currentChap++;
            if(this.chapters.length == this.currentChap){
                Dialog.alert({
                message: '已是最新章节了！',
                }).then(() => {
                // on close
                });
            }
            this.currentlink = this.chapters[this.currentChap].link
            this.getBookindex()
            this.getContent(this.currentlink)
            document.documentElement.scrollTop =-this.$refs.reads.offsetHeight
            
        },
// 上一章
        before(){
            
            this.$refs.reads.scrollTop=0;
            this.currentChap--;
            if(this.currentChap <0){
                Dialog.alert({
                message: '已是第一章了！',
                }).then(() => {
                    
                });
                return this.currentChap = 0
            }
            this.currentlink = this.chapters[this.currentChap].link
            this.getBookindex()
            this.getContent(this.currentlink)
            document.documentElement.scrollTop =-this.$refs.reads.offsetHeight
        },
//将当前章节同步至书架
        updateBC(){
            if(this.theBook){
                this.theBook.currentChapter = this.currentChap+1;
                let books = getLocalData('books')
                books[this.bookId]=this.theBook
                // this.$notify({ type: 'success', message: '成功更新书架' });
                setLocalData('books',books)
            }
                
        },
// 返回详情页时
        goBack(){
            if(this.theBook){
            this.theBook.currentChapter = this.currentChap+1;
            let books = getLocalData('books')
            books[this.bookId]=this.theBook
            // this.$notify({ type: 'success', message: '成功更新书架' });
            setLocalData('books',books)
            this.$router.go(-1);
        }else{
            Dialog.confirm({
                    title: '提示',
                    message: '书架上还没有《'+this.bookTitle+'》这本书喔！是否需要帮您加入书架！',
                    })
                    .then(() => {                      
                        // console.log('12654')
                           let books = getLocalData('books')
                           if(this.flag){
                                books[this.bookId]={
                                    cover:this.noCrackBook.cover,
                                    flag:this.flag,
                                    id:this.noCrackBook._id,
                                    lastChapter:this.noCrackBook.lastChapter,
                                    updated:this.noCrackBook.updated,
                                    author:this.noCrackBook.author,
                                    sourceId:this.noCrackBook.sourceId,
                                    currentChapter:this.currentChap+1,
                                    title:this.noCrackBook.title,
                                }
                                this.$notify({ type: 'success', message: '成功加入书架' });
                                setLocalData('books',books)
                                this.$router.go(-1);
                            }
                       
                    })
                    .catch(() => {
                        this.$router.go(-1);
                    });
        }
        this.$store.state.headtitle = "真相永远只有一个！Bug却有无数个！"
        document.querySelector(".mint-tabbar").style.display =''
        document.querySelector(".mint-header").style.display = ''
    },
// 设置字体，颜色，其实字体和颜色也需要缓存下来的，这里就不处理了
    setFont(a){
    if(a===0){
       if(this.font<=10){
         return
       }else{
         this.font--
       }
     }
     if(a===1){
       if(this.font>=26){
         return
       }else{
        this.font++
       }
     }
    },
    setColor(a){
    if(a===0){
        this.color = '#F6EDEE'
     }
     if(a===1){
        this.color = '#1C1C1C'
     }
     if(a===2){
         this.color = '#bce0bc'
     }
    },
    showSet(){
        this.setStatus = !this.setStatus
    }
             
    },



    
}
</script>

<style lang="less" scoped>

.read{
    
    // 
    z-index: 2;
    width: 100%;
    >header{
        background: #F6EDEE;
        font-size: 20px;
        position: fixed;
        left: 0;
        top: 0px;
        right: 0;
        z-index: 10;
        padding: 9px;
        >.van-icon{
            margin-right: 15px;
        }
    }
    >.read1>#loading{
        // margin-top: 250px;
            background: #F6EDEE;
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
    >.read1>.article{
        background-color: #F6EDEE;
        // background-color: black;
        // margin: 0 10px;
        >.title{
            // margin: 30px 10px ;
            padding: 15px 10px ;
            font-size: 22px;
            font-weight: 800;
        }
        >div >.read-text{
            padding: 0 10px;
            color: #5F5B58;
            text-indent: 2em;
            font-size: 15px;
            line-height: 40px;
        }
        >.btns{
            // margin: 10px;
            padding: 10px;
            text-align: center;
            
            >.van-button{
            // padding: 0px 150px;
            background-color: #F6EDEE ;
            border: 1px solid #bbbbbb;
            width: 100%;
            font-size: 18px;
            margin-right: 10px;
            color: #8A8A8A;
            margin-bottom: 10px;
            }
            >.down{
                display: flex;
                justify-content: space-around;
                margin-left: 5px;
                >.van-button{
                    background-color: #F6EDEE;
                    border: 1px solid #bbbbbb;
                    color: #8A8A8A;
                    width: 100%;
                    margin-right: 10px;
                }
            }
        }
    }
    >.read1>.set{
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 15px 15px 0 15px;
        // background: rgb(144, 144, 144) !important;
        background: rgba(144, 144, 144, 0.9);
        >div{
            margin-bottom: 15px;
            display: flex;
            justify-content: space-around;
            >.van-button{
                background-color: rgba(144, 144, 144, 0);
                border: 1px solid #bbbbbb;
                color: whitesmoke;
                width: 100%;
                margin-right: 10px;
                font-weight: bold;
                font-size: 15px;
            }

        }
        >.color{
            >.van-button:nth-child(2){
                background: #1C1C1C;
            }
            >.van-button:nth-child(3){
                background: #bce0bc;
            }
        }
    }
}
</style>