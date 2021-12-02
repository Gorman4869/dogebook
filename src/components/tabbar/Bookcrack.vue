<template>
  <div class="bookcrack">
    <div class="head clearfix">
      <div >共 {{list.length}} 本</div>
      <!-- <van-icon  class="icon" name="setting-o" v-show="false"  @click="selectedAll"/> -->
      <div class="edit" v-if="editStatus" @click="edit">编辑</div>
      <div class="edit" v-else  @click="selectedAll">全|反选</div>
    </div>   
    <van-checkbox-group v-model="result"  ref="checkboxGroup">
      <van-cell-group>
        <van-cell 
          v-for="(item, index) in list"
          clickable
          :key="index"
          
          @click="toggle(item.id)"
        >

        <div id="article">
            <div class="left">
                <img :src="item.cover | setPic()" >
            </div>
                <div class="right">
                <h1>{{item.title}}</h1>
                <p class="p-content"><span>{{item.updated | fomatTime()}}</span>{{item.lastChapter}}</p>
                <p class="p-content2">阅读到第{{item.currentChapter}}章</p>
                <div class="author"><van-icon name="contact" /> {{item.author}}</div>
            </div>
            <!-- 跳转到详情页 -->
            <van-icon @click="toDetail(item.id)" v-show="editStatus" class="myicon" name="description" />
        </div>
        <!-- <img src="../../assets/img/6.jpg" alt=""> -->
          <template #right-icon >
            <van-checkbox v-show="!editStatus" :name="item" ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="footbtn" v-show="!editStatus">
      <van-button class="btn1" type="primary" color="#FFDEC6" 
          round block size="normal" @click="edit">取消</van-button>
          <van-button  type="info" color="#EE4745"
          round block size="normal" @click="delBook">确定</van-button>
    </div>  
  </div>
</template>

<script>
import {getLocalData,setLocalData} from '../api/utils'
export default {
    data(){
        return{
            list: [],
            result: [],
            editStatus:true,
        }
    },
    created(){
     this.getBooks()
    },
    mounted(){
      // document.querySelector(".mint-header").style.display = 'none'

    },
    methods:{
      getBooks(){
        let books = getLocalData('books')
        this.list = Object.values(books)
        
      },
// 去阅读页面
      toggle(id) {
        this.$router.push({name:'read',query:{
              bookid:id,
            }}) 
      },
      selectedAll(){
        this.$refs.checkboxGroup.toggleAll();
      },
      edit(){
        this.editStatus = !this.editStatus
        this.result =[]
      },
      //删除result里的选中的书籍
      delBook(){
          let books =getLocalData('books')
          this.result.forEach(item=>{
            // console.log(item.id)
            delete books[item.id]
          })
          setLocalData('books',books)
          this.$notify({ type: 'danger', message: '已将所选书籍移出书架' })
          window.location.reload();
      },
      toDetail(id){
            this.$router.push({name:'detail',query:{
          bookid:id,
        }})
      },
// 去阅读页面
        toRead(id){
            
        }
    }
}
</script>

<style lang="less" scoped>
.bookcrack{
  // position: relative;
  // >.van-checkbox-group{
  //   height: auto;
  // }
  .head{
        background: white;
        position: sticky;
        z-index: 2;
        top: 30px;
        font-size: 20px !important;
        color: #8A8A8A;
        border-bottom: 1px solid rgba(138,138,138,0.5);
        padding: 10px;
        >div{
          float: left;
        }
        >.edit{
          color: #ff5f5f;
          float: right;
        }
    }
    >.footbtn{
        position: fixed;
        bottom: 47px;
        width: 95%;
        border-top:  1px solid rgba(138,138,138,0.5);
        padding: 10px;
        display: flex;
        background: white;
        // justify-content: space-between;
        >.van-button{
            font-size: 18px;
            margin-right: 10px;
            
        }
        >.btn1{
            color: #FF5E01 !important;
        }
    }
    #article{
            // margin-bottom: 10px;
            display: flex;
            img{
                border-radius: 5px;
                width: 60px;
                height: 100px;
                box-shadow: 2px 2px 2px #888888;
            }
            .right{
                // position: relative;
                display: flex;
                margin-left: 10px;
                width: 100%;
                flex-direction: column;
                // justify-content: start;
                h1{
                    font-size: 20px;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    width: 260px;
                }
                .p-content{ 
                    width: 260px;
                    // height: 60px;
                    white-space: nowrap;
                    margin-top: 13px;
                    font-size:12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    color: #8A8A8A; 
                }
                .p-content2{ 
                    width: 260px;
                    // height: 60px;
                    white-space: nowrap;
                    font-size:12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    color: #8A8A8A; 
                }
                >.author{

                        color:#8A8A8A;
                        float: left ;
                        font-size: 12px;
                        // margin-top: 9px;
                    }
            }
            >.myicon{
              font-size: 20px;
              padding-top: 40px;
            }
        }   
}
</style>