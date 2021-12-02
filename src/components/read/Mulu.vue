<template>
  <div class="mulu" >
    <van-loading id="loading" size="50px" text-size="20px" vertical v-show="loading">
        文章目录加载中,稍等一会儿...
    </van-loading>     
      <div class="header clearfix">
          <div >目录(共{{this.chapters.length}}章)</div>
          <div @click="show = true" 
          >{{subChap}}<van-icon name="arrow-down" /></div>
      </div>
      <van-cell-group  ref='gcell'>
          <!-- @click="backRead(item.link)" -->
          <van-cell v-for="(item,i) in chapters " @click="showContent(item.link,i)" :key="i">
              <span>{{i+1}}</span>
               {{item.title}}
          </van-cell>
        </van-cell-group>
        <van-action-sheet v-model="show" :actions="actions" 
        close-on-click-action @select="onSelect" />
    </div>

</template>
<script>
import {bookMulu,book} from '../api/api'
export default {
    // props:['sourceId'],
     name:'Mulu',
    data(){
        return{
            chapters:'',
            loading:true,
            show: false,
            sourceId:'',
            actions: [],
            // length:3522,
            subChap:'',
            bookId:this.$route.query.bookid,
        }
    },
    created(){
        this.getSourceId()
        
       
    },
    mounted(){
        this.$bus.$on('scroll',(data)=>{
            document.documentElement.scrollTop = data*24
        })
    },
    methods:{
// 显示章节范围
        handleChapters(){
            // console.log(this.chapters)
            let b = this.chapters.length%100
            let v = Math.ceil(this.chapters.length/100)
            for(let i = 0;i<v;i++){
                if(i==v-1){
                    this.actions.push({name:100*i+1+'-'+(100*i+b)})
                }else{
                    this.actions.push({name:100*i+1+'-'+(i+1)*100}) 
                }
            }
            this.subChap = this.actions[0].name
        },
// 选中章节范围
         onSelect(item) {
            this.show = false;
            this.subChap = item.name
            document.documentElement.scrollTop = (this.actions.indexOf(item))*5400
        },
         getSourceId(){
            book(this.bookId).then(res=>{
                this.sourceId = res.data[0]._id
                    bookMulu(this.sourceId).then(res=>{
                    // console.log(res.data)
                    this.chapters = res.data.chapters
                    this.handleChapters()
                    this.loading = false
                })
            })
        },
        showContent(link,i){
            this.$emit("showContent",link,i)
        },
            
    },
    
    beforeDestroy() {
        this.$bus.$off('scroll')
    },
    
}
</script>

<style lang="less" scoped>
.mulu{
    // position: relative;
    // background: #fff1d6;
    #loading{
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
    .header{
        padding: 15px;
        position: fixed;
        z-index: 100;
        top: 40px;
        width: 100%;
        background-color: #F6EDEE;
        >div:nth-child(1){

            float: left;
            font-size: 20px;
            font-weight: 600;
        }
        >div:nth-child(2){
            margin-top: 5px;
            float: right;
            font-weight: 600;
            padding-right: 30px;
        }
    }
    >.van-cell-group {
        margin-top: 95px;
        >.van-cell{
        background-color: #F6EDEE !important;
        font-size: 16px;
        padding: 15px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        span{
            font-size: 15px;
            margin: 0px 10px;
            color: #AAA8A9;
        }
            }
    }
}
</style>