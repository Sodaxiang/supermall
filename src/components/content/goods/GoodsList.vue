<template>
    <div class="goods-list">
        <goods-item-list
          v-for="(item, i) in goodsList"
          :key = i
          :goodsItem="item"
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
