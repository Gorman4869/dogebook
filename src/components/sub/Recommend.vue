<template>
  <div class="recommend">
      
    <div class="clearfix">
        <p>同类书籍推荐</p>
        <div @click="getRecommendBook">换一批看看<van-icon name="replay" /></div>       
    </div>
      <div class="books">
          <div class="book" v-for="(item,i) in reList" :key="i" @click="toDetail(item._id)" >
              <img :src="item.cover | setPic()" alt="">
              <p>{{item.title}}</p>
              <p>{{item.author}}</p>
          </div>
      </div>
          
  </div>
</template>

<script>
import { recommendBookList} from'../api/api'
export default {
    props:['bookId'],
    data(){
        return{
            reList:[],

        }
    },
    created(){
        this.getRecommendBook()
    },
    methods:{
        getRecommendBook(){
            recommendBookList(this.bookId).then(res=>{
                // console.log(res.data)
                // this.reList = res.data.books
               this.reList = this.getRandomArrayElements(res.data.books,6)
            //    console.log(this.reList)
            })
        },
        
        getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        },
        toDetail(id){
        // console.log(id)
            this.$router.push({name:'detail',query:{
          bookid:id,
        }})
        location.reload();
      }

    }
}
</script>

<style lang="less" scoped>
    .recommend{
        margin: 10px 10px 0px 10px;
        overflow: scroll;
        >div:nth-child(1){
            >p{
                float: left;
                font-size: 20px;
                // color: red;
            }
            >div{
                float: right;
                color: #888888;
            }
            
        }
        
        >.books{
             display: flex;
             justify-content: space-around;
             flex-wrap:wrap;
             margin-bottom: 10px;
             >.book{
                 margin-top: 10px;
                 flex: none;
                 >img{
                     width: 100px;
                     height: 150px;
                     box-shadow: 3px 3px 3px #888888; 
                 }
                 >p{
                     font-size: 18px;
                     width:120px;
                     margin-top: 5px;
                     overflow: hidden;
                     white-space: nowrap;
                     text-overflow: ellipsis;
                     overflow: hidden;
                 }
                 >p:nth-child(3){
                     font-size: 15px;
                     color: #888888;
                 }
             }

        }
    }
</style>