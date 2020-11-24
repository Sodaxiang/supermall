<template>
    <div class="goods-list">
        <goods-item-list
          v-for="(item, i) in goodsList"
          :key = i
          :goodsItem="item"
          @click.native="clickGoods(item)"
         />
    </div>
</template>

<script>
import GoodsItemList from './GoodsListItem.vue';

export default {
    name: 'GoodsList',
    components: {
        GoodsItemList,
    },
    props: {
        goodsList:{
            type: Array,
            default(){
                return [];
            }
        }
    },
    mounted() {
    },
    methods: {
        clickGoods(item){
            /**
             * iid 对应首页的id
             * tradeItemId对应商品详情页推荐的id
             */
            if(item.iid){
                 this.$router.push('/detail/'+ item.iid); 
            }else {
                this.$router.replace('/detail/'+item.tradeItemId);
            }
            // this.$router.push( item.iid ? '/detail/'+ item.iid : '/detail/'+item.tradeItemId);
        }
    },
}
</script>

<style scoped>
.goods-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
