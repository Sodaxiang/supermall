<template>
    <div class="cart-list">
        <div v-if="cartList.length">
            <cart-list-item v-for="(item, index) in cartList" :key="index" :goodsItem="item"/>
        </div>
        <div v-else class="empty-cart">
            <p>购物车居然是空的（°ο°）~ @　</p>
            <p>再忙，也记得买点什么犒赏自己</p>
            <p @click="goHome">去逛逛</p>
        </div>
    </div>
</template>

<script>
import CartListItem from './CartListItem';

export default {
    name: 'CartList',
    props: {
        cartList:{
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        CartListItem
    },
    methods: {
        goHome(){
            this.$router.replace('/home');
        }
        
    },
}
</script>

<style scoped>
.empty-cart {
    padding-top: 50px;
    text-align: center;
}
.empty-cart p:nth-child(3){
    margin: 20px auto;
    width: 80px;
    padding: 4px 12px;
    background: #f3f3f3;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0, .3);
}
</style>

