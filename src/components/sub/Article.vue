<template>
<!-- 这里也要处理页面跳转 -->
  <div>
      <LoadMore>
            <div class="article"  v-for="(item,i) in bookList" :key="i" @click="toDetail(item._id)">
                <div class="left">
                    <img :src="item.cover | setPic()" >
                </div>
                    <div class="right">
                    <!-- <p class="p-title">凡人修仙传</p> -->
                    <h1>{{i+1}}. {{item.title}}</h1>
                    <p class="p-content">{{item.shortIntro}}</p>
                    <div>
                        <div class="author">{{item.author}}</div>
                        <div class="a-tag">{{item.retentionRatio}}%留存</div>
                        <div class="a-tag">{{item.minorCate}}</div>
                    </div>
                </div>
            </div>
            <!-- <div v-show="showLast" class="Last">哦豁！就这点书</div> -->
    </LoadMore>
  </div>
</template>

<script>
export default {
    props:['bookList','showLast'],
    methods:{
        toDetail(id){
            this.$router.push({name:'detail',query:{
            bookid:id,
            }})
        }
    }
}
</script>

<style lang="less" scoped>
        .article{
            margin-bottom: 15px;
            display: flex;
            // padding-right: 20px;
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
                    width: 190px;
                    height: 40px;
                    // white-space: wrap;
                    line-height: 13px;
                    font-size:13px;
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
                        color:#8A8A8A;
                        float: left ;
                        font-size: 12px;
                    }
                    .a-tag{
                        float: right ;
                        // width: 50px;
                        color:#8A8A8A;
                        padding: 1px 4px;
                        margin-top: 0;
                        font-size: 10px;
                        margin-right: 2px;
                        border:solid 0.5px #8A8A8A;
                        border-radius: 10px;
                        background-color: #F1F0F5;
                        
                    }
                    >div:nth-child(2){
                        color: #f85860;
                        background-color: #FBEAF1;
                    }
                }
            }
        }

</style>