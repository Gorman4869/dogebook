<template>
<!-- 定义个公共的上拉加载，下拉刷新的。 -->
    <div class="loadmore">
        <mt-loadmore
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" ref="loadmore">
            <slot></slot>
            <!-- <div v-if="allLoaded" style="text-align:center;" class="data-none">我也是有底线的</div> -->
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    name:'LoadMore',
    data(){
        return{
            allLoaded: false,
            isLoadMore:false,
        }
    },
    created(){

    },
    methods:{
    loadTop(){
            // setTimeout(() => {
            //     this.$refs.loadmore.onTopLoaded();
            // }, 1000);
            // this.$emit('pull')
            //组件自身绑定一个自定义事件，和写好回调，
            //在这组件中触发就好。

      },
      loadBottom(){
        //   console.log(456)
        this.allLoaded = true;// 若数据已全部获取完毕
          setTimeout(() => {
            this.$bus.$emit('loadRankBottom')
            this.$refs.loadmore.onBottomLoaded();
          }, 1000);
          this.allLoaded =false
      },
    }
}
</script>

<style lang="less" scoped>
.loadmore{
    .data-none{
        font-size: 13px;
        color: #7F7F7F;
        opacity: 0.5;
    }
}
</style>