<template>
    <div id="cart">
        <nav-bar class="cart-nav">
            <div slot="center">购物车（{{cartListLength}}）</div>
        </nav-bar>
        <scroll class="cart-scroll">
            <cart-list :cartList="cartList" />
        </scroll>
        <cart-bottom-bar/>
    </div>
</template>

<script>
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import NavBar from '@/components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/Scroll';

import { mapGetters } from 'vuex';

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        Scroll,
        CartBottomBar,
    },
    data(){
        return {
            isSelectAllGoods: false,
        }
    },
    computed: {
        ...mapGetters(['cartList', 'cartListLength']),   
    },
    methods: {
        handleSelectAllGoods(){
            this.isSelectAllGoods = !this.isSelectAllGoods;
            console.log(this.isSelectAllGoods)
            this.cartList.map(item=>{
                item.isSelected = this.isSelectAllGoods;
            })
        }
    },
    
}
</script>

<style scoped>
#cart {
    height: 100vh;
}
.cart-nav {
    background: var(--color-tint);
    color: #fff;
}
.cart-scroll {
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
}
</style>
