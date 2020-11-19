<template>
    <div class="shop-info">
        <div class="shop-top">
            <img :src="shopInfo.logo" alt="logo">
            <span class="name">{{shopInfo.name}}</span>
        </div>
        <div class="shop-middle">
            <div class="sale-count">
                <p class="count">{{shopInfo.sells | bigNumberTransform}}</p>
                <p class="text">总销量</p>
            </div>
            <div class="all-goods">
                <p class="count">{{shopInfo.goodsCount}}</p>
                <p class="text">全部宝贝</p>
            </div>
            <div class="shop-score">
                <table>
                    <tr v-for="(item, index) in shopInfo.score" :key="index">
                        <td class="name">{{item.name}}</td>
                        <td class="score" :style="item.isBetter&&{color:'red'}">{{item.score}}</td>
                        <td class="cost-per" :style="item.isBetter&&{background:'red'}">{{item.isBetter?"高":"低"}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <p>进店逛逛</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props:{
        shopInfo:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    filters: {
        bigNumberTransform(value){
            const newValue = ['', '', ''];
            let fr = 1000;
            let num = 3;
            let text1 = '';
            let fm = 1;
            while(value/fr >= 1) {
                fr *= 10;
                num += 1;
                // console.log('数字', value / fr, 'num:', num)
            }
            if(num <=4) {//千
                newValue[1] = '千';
                newValue[0] = parseInt(value / 1000) + '';
            }else if(num <= 8 ){//万
                text1 = parseInt(num -4)/3 > 1 ? '千万' : '万';
                fm = '万' === text1 ? 10000: 10000000;
                newValue[1] = text1;
                if( value % fm === 0){
                    newValue[0] = parseInt(value / fm) + '';
                }else{
                    newValue[0] = parseFloat(value /fm).toFixed(2) + '';
                }
            }else if(num <= 16){//亿
                text1 = (num-8)/3 > 1 ? '千亿' : '亿';
                text1 = (num-8)/4 > 1 ? '万亿': text1;
                text1 = (num-8)/7 > 1 ? '千万亿' : text1;

                fm =1;
                if('亿' === text1){
                    fm = 100000000;
                } else if('千亿' === text1){
                    fm = 100000000000;
                } else if('万亿' === text1){
                    fm = 1000000000000;
                } else if('千万亿' === text1){
                    fm = 1000000000000000;
                }
                newValue[1] = text1;
                if( value % fm === 0){
                    newValue[0] = parseInt(value / fm) + '';
                }else{
                    newValue[0] = parseFloat(value /fm).toFixed(2) + '';
                }
            }
            if(value < 1000){
                newValue[1] ='';
                newValue[0] = value + '';
            }
            return newValue.join('');
        }
    }
}
</script>

<style scoped>
.shop-info {
    padding: 10px 10px 20px;
    border-bottom: 4px solid rgba(100, 100, 100, .3);
}
.shop-top {
    padding: 6px 10px 10px 4px;
}
.shop-top img{
    width: 60px;
    height: 60px;
    border: 1px solid rgba(100, 100, 100, .1);
    border-radius: 50%;
    margin-right: 8px;
}
.shop-top .name {
    display: inline-block;
    position: relative;
    top: -20px; 
    
}
.shop-middle {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
}
.shop-middle .all-goods {
    padding-right: 8px;
    border-right: 1px solid rgba(100, 100, 100, .5);
}
.shop-middle .shop-score table {
    text-align: center;
    font-size: 12px;
}
.shop-middle .shop-score table tr td {
    padding: 0 4px 0;
}
.shop-middle .shop-score table tr .score {
    color: green;
}
.shop-middle .shop-score table tr .cost-per {
    background: green;
    color: #fff;
}
.shop-bottom {
    padding: 20px 0 8px;
    text-align: center;
}
.shop-bottom p{
    display: inline-block;
    padding: 6px 40px;
    background: rgba(100, 100, 100, .2);
    border-radius: 20px;
}
</style>
