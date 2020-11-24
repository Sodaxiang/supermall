<template>
    <div class="goods-item">
        <!--  
          goodsItem.show && goodsItem.show.img -对应首页图片
          goodsItem.image 对应详情页推荐图片
        -->
        <img  v-lazy="(goodsItem.show && goodsItem.show.img) || goodsItem.image " alt="goods-img" @load="imgLoad">
        <div class="goods-info">
            <p class="title">{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props:{
        goodsItem:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        // 图片加载完成，解决图片没有加载完成时候better-scroll的bug
        imgLoad(){
            this.$bus.$emit('itemImgLoad');
        }
    },
}
</script>
<style scoped>
.goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
}
.goods-item img{
    width: 100%;
    border-radius: 8px;
}
.goods-info {
    text-align: center;
    padding: 3px;
    position: absolute;
    bottom: 0px;
    left:0;
    right: 0;
    overflow: hidden;
    font-size: 14px;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 24px;
}
.goods-info .collect {
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
    width: 14px;
    height: 14px;
    background: url('~@/assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>

