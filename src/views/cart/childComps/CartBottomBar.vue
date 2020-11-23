<template>
    <div class="bottom-bar">
        <div class="check">
            <check-goods-btn :isSelected="isSelectAllGoods" @click.native="handleSelectAllGoods"/>
            <span>全选</span>
        </div>
        <div class="all-price">合计：￥{{totalPrice}}</div>
        <div class="settle-accounts">去结算</div>
    </div>
</template>

<script>
import CheckGoodsBtn from '@/components/content/checkGoodsBtn/CheckGoodsBtn';

import { mapGetters } from 'vuex';

export default {
    name: 'CartBottomBar',
    components: {
        CheckGoodsBtn,
    },
     computed: {
        ...mapGetters(['cartList', 'cartListLength']),   
         isSelectAllGoods(){
            if(this.cartList.length && this.cartList.every(item=>item.isSelected)){
                    return true;
                }
                return false;
        },
        totalPrice(){
           return this.cartList.filter(item=>item.isSelected)
                                .reduce((prev,curr)=>{
                                    return prev + curr.realPrice * curr.num;
                                }, 0).toFixed(2);
        }
    },
    methods: {
        handleSelectAllGoods(){
           if(this.isSelectAllGoods){
               this.cartList.map(item => item.isSelected = false);
           }else {
               this.cartList.map(item => item.isSelected = true);
           }
        }
    },
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    text-align: center;
    background: #f6f6f6;
}
.bottom-bar .check{
    width: 70px;
    display: flex;
}
.bottom-bar .check span {
    margin-left: 8px;
}
.bottom-bar .all-price{
    flex: 1;
}
.bottom-bar .settle-accounts {
    width: 120px;
    height: 100%;
    line-height: 40px;
    color: #fff;
    background: red;
}
</style>
