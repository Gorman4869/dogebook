<template>
  <div id="rank">
    <mt-navbar v-model="selected" swipeable class="clearfix" >
        <mt-tab-item id="1" ><span style="font-size: 16px;">男生</span></mt-tab-item>
        <mt-tab-item id="2"><span style="font-size: 16px;">女生</span></mt-tab-item>
        <mt-tab-item id="3"><span style="font-size: 16px;">出版</span></mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
<!-- male 感觉aside也能单独提出来-->
        <mt-tab-container-item id="1">
            <aside class="aside">
                <ul>
                    <li @click="showBookList(item._id)"
                    v-for="(item,i) in mRankList" :key="i" :class="{active:item._id === rankid}"
                    >{{item.shortTitle}}</li>
                </ul>
            </aside>
                    <div class="right-content">
                        <Article :bookList="bookList"></Article>
                    </div>
        </mt-tab-container-item>
<!-- female -->
        <mt-tab-container-item id="2">
                <aside class="aside">
                    <ul>
                        <li @click="showBookList(item._id)" :class="{active:item._id === rankid}"
                        v-for="(item,i) in fRankList" :key="i"
                        >{{item.shortTitle}}</li>
                    </ul>
                </aside>
                <div class="right-content">
                    <Article :bookList="bookList"></Article>
                </div>
        </mt-tab-container-item>
<!-- publish -->
        <mt-tab-container-item id="3">
                <aside class="aside">
                    <ul>
                        <li @click="showBookList(item._id)"
                        v-for="(item,i) in pRankList" :key="i" :class="{active:item._id === rankid}"
                        >{{item.shortTitle}}</li>
                    </ul>
                </aside>
                <div class="right-content">               
                    <Article :bookList="bookList"></Article>
                    <van-empty v-show="noBook"
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="这分类没有书籍，请选择其它选项！"
            />
                </div>
        </mt-tab-container-item>
    </mt-tab-container>
    <!-- v-for="(n,i) in 7" title="tab-container 3" :key="i" -->
</div>
</template>

<script>
//尽量简化下代码，把单个书籍样式拎出去，真的尽力了！
import Article from '../sub/Article.vue'
import {bookRank} from '../api/api.js'
import {bookRanks} from '../api/api.js'
import LoadMore from '../sub/LoadMore.vue'
export default {
  components: { Article, LoadMore },
    name:"Rank",
    data(){
        return{
            selected:"1",
            // 侧边栏排行列表
            mRankList:[],
            fRankList:[],
            pRankList:[],
            // 书的列表
            bookList:[],
            rankid:'',

            // allLoaded: false,
            count:0,

            showLast:false,
            noBook:false,

        }
    },
    created(){
        this.getRank()
    },
    mounted() {
            this.$bus.$on('loadRankBottom',this.loadRankBottom)
    },
    watch:{
        "selected":function(){
            //重置一下count
            this.count = 0
            this.bookList = [];
            // 每次切换都是清空列表的，貌似无法记录上一页面所滑动的距离。
            switch(this.selected){
                case '1' : this.rankid = this.mRankList[0]._id
                break;
                case '2' : this.rankid = this.fRankList[0]._id
                break;
                case '3' : this.rankid = this.pRankList[0]._id
                break;
            }
            bookRanks(this.rankid).then(res=>{
                this.bookList = res.data.ranking.books.slice(0,15)
                 if(this.bookList.length ==0){
                        this.noBook = true;
                    }else{
                        this.noBook = false
                    }
            })
        }
    },
    methods:{
        getRank(){
            bookRank().then(res=>{
                //这三种能用switch去判断下点击状态，结合selected
                this.mRankList = res.data.male.slice(0,10)
                this.fRankList = res.data.female.slice(0,10)
                this.pRankList = res.data.epub
                this.rankid = this.mRankList[0]._id
                this.showBookList(this.rankid)
                // console.log(this.pRankList)
                
            })
        },
        showBookList(rid){
            // console.log(rid)
            this.rankid = rid
            this.bookList = []
            bookRanks(rid).then(res=>{
                this.bookList = res.data.ranking.books.slice(0,15)
                if(this.bookList.length ==0){
                        this.noBook = true;
                    }else{
                        this.noBook = false
                    }
                // console.log(this.fBookList)

            })

        },
        loadRankBottom(){
            setTimeout(()=>{
                bookRanks(this.rankid).then(res=>{
                    // console.log(this.rankid)
                    this.bookList=res.data.ranking.books.slice(0,this.count*15+15);
                    this.count++
                    // console.log(this.count)
                    })
            //加载数据后需要对组件进行一些重新定位的操作。
                this.$refs.loadmore.onBottomLoaded();
            },100)
        },


    },
    
}
</script>

<style lang="less" scoped>
// #rank > div.mint-tab-container > div > div:nth-child(1) > aside{
//     display: flex;
// }
.mint-navbar .mint-tab-item.is-selected{
    margin-bottom: -1px ;
}

#rank > div.mint-navbar{
    position: fixed;
    width: 100%;
    z-index: 9999;
    border-bottom: 1px solid  rgba(127,127,127, 0.3);
}
#rank > div.mint-tab-container > div > div{
    display: flex;
    margin-top: 55px;
    // justify-content: space-between;
    .aside{
        position: fixed;
        // z-index: 9999;
        color: black;
        width: 20%;
        height: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 16px ;
        font-weight: 500;
        border-right: .5px rgba(127,127,127, 0.3) solid;
        background-color: #FFFFFF;
        
        li{
            border-bottom: 1px solid  rgba(127,127,127, 0.3);
        }
    }
    .right-content{
        // background-color: blanchedalmond;
        position: relative;
        margin: 20px 5px 0px 25%;
        width: 80%;
        overflow: scroll;
        height: 600px;
        
    }
    .active {
    // color: #26a2ff;;
    background-color: #F9F9FB;
    border-left: #26a2ff 2px solid;
    }
    
}
</style>