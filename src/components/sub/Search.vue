<template>
  <div class="search">
    <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @input="auto"
            clearable
        />
    </form>
    <van-cell v-for="(item,i) in autoList" :key="i"  
    v-show="cell" :title="item"
     icon="label-o"  size="large"
     @click="jump(item)" />
    <!-- 睡醒需求
    1.每个搜索热词点击事件，添加到输入框
    2.输入框的自动补充，根据接口提示，在输入框
    显示一个cell之类的单元格
    3. 更多热词的跳转
    4. -->
    <div class="hotwords">
        <div>搜索热词</div>
        <div>更多 <i class="iconfont icon-xiangyou_fanhui"></i></div>
    </div>
    <div class="hotwordlist">
        <div v-for="(item,i) in  hotWords " :key="i" 
        @click="setItem(item.word)">{{item.word}}</div>
    </div>
    <div v-show="show">
        <div class="historysearch" >
            <div>搜索历史</div>
            <div @click="clear"><van-icon name="delete-o" /></div>
        </div>
        <div class="historywords">
            <div v-for="(item,i) in historyWords " :key="i">{{item}}</div>
        </div>
    </div>
<!-- 这里记得点击跳转小说详情 -->
    <div class="nowhotsearch">
        <div class="books" v-for="(item,i) in  hotBooks " :key="i" @click="toDetail(item._id)">
            <img :src="item.img | setPic()" alt="">
            <div>
                <p>{{item.name}}</p>
                <span><van-icon name="fire" />
                {{item.tf>10000?parseInt(item.tf/10000)+
                '万':item.tf}}人气</span>
                <!-- <span><van-icon name="fire" />{{item.tf}}人气</span> -->
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import{ hotWord ,hotBook,search,bookDetail} from '../api/api'
export default {
    data(){
        return{
            value: '',
            hotWords:[],
            historyWords:[],
            hotBooks:[],
            show:false,
            nameArr:[],
            cell:false,
            autoList:[],

        }
    },
    created(){
        this.getHotWord()
        this.getHotBooks()
    },
    methods:{
    getHotWord(){
        hotWord().then(res=>{
            // console.log(typeof(this.historyWords.length))
            this.hotWords = res.data.searchHotWords.slice(0,11)
        })
    },
    getHotBooks(){
        hotBook().then(res=>{
            // console.log(res.data)
            this.nameArr = res.data.newHotWords
            this.nameArr.forEach(item=>{
                bookDetail(item.book).then(res=>{
                    // console.log(res.data)
                    this.hotBooks.push({name:item.word,
                    img:res.data.cover,tf:res.data.totalFollower,_id:item.book})
                })
            })
            // console.log(this.hotBooks)

        })
    },
    onSearch(val) {
    //   Toast(val);
      this.$router.push({name:'searchresult',query:{
		   val:this.value,
		}})
      if(this.historyWords.length<=5){
          this.historyWords.push(val)
        //   console.log(this.historyWords)
          this.show = true
      }else{
          this.historyWords.shift()
          this.historyWords.push(val)
      }

    },
    onCancel() {
    //   Toast('取消');
    },
    clear(){
        this.historyWords = [];
        this.show =false
    },
    setItem(word){
        this.value = word
        setTimeout(()=>{
            this.onSearch(this.value);
        },300)

    },
    auto(){
        // console.log(this.value)
        this.cell = true
        search(this.value).then(res=>{
            this.autoList = res.data.keywords
            
        })
    },
    jump(val){
        this.value = val
        this.onSearch(this.value);
        this.cell = false
        
    },
    toDetail(id){
            this.$router.push({name:'detail',query:{
            bookid:id,
            }})
    }

    }
}
</script>

<style lang="less" scoped>
.search{
    .hotwords,.historysearch{
        // background-color: red;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        // overflow: scroll;
        >div{
            flex: none;
            color: #8A8A8A;
            font-size: 16px;
        }
    }
    .hotwordlist,.historywords{
        // background-color: royalblue;
        margin: 10px 10px 0 10px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-evenly;

        >div{
            background-color: #EFEFF4;
            flex: none;
            padding: 2px 4px;
            border-radius: 8px;
            margin-right: 15px;
            margin-bottom: 15px;
            color: #5a5a5c;
        }
    }
    .nowhotsearch{
        margin: 10px 10px 0 10px;
        height: 350px;
        
        >.books{
            // float: left;
            width: 100%;
            margin-bottom: 10px;
            background-color: hsl(357, 100%, 96%);
            border-radius: 10px;
            height: 80px;
            // position: relative;
            img{
                float: left;
                border-radius: 10px;
                width: 60px;
                height: 80px;
            }
            >div{
                float: left;
                display: flex;
                font-size: 16px;
                flex-direction: column;
                margin-top: 20px;
                margin-left: 30px;
                >p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                }
                >span{
                    font-size: 13px;
                    color: red !important;
                }
            }

        }
    }

}
</style>