<template>
  <div class="detail">
      <detail-nav-bar class="detail-bar"/>
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :baseInfo="baseInfo"/>
        <detail-shop-info :shopInfo="shopInfo"/>
        <detail-goods-info :goodsInfo = "goodsInfo" @goodsInfoImgLoad="goodsInfoImgLoad"/>
        <detail-goods-params :goodsParams="goodsParams" />
        <detail-comment-info :commentInfo="commentInfo"/>
        <detail-recommend :recommendList="recommendList"/>
      </scroll>
     
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailGoodsParams from './childComps/DetailGoodsParams';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailRecommend from './childComps/DetailRecommend';

import Scroll from '@/components/common/scroll/Scroll';

import { getGoodsDetail, getGoodsRecommend, Goods, Shop } from '@/network/detail.js';
import { debounce } from '@/common/utils';
// import {itemListenerMixin} from '@/common/mixin';

export default {
    name: 'Detail',
    data() {
        return {
            iid: '',
            topImages: [],
            baseInfo: {},
            shopInfo: {},
            goodsInfo:{},
            goodsParams:{},
            commentInfo:{},
            recommendList:[],
            imgItemListener: null, //控制商品推荐图片加载显示的listener
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailGoodsParams,
        DetailCommentInfo,
        DetailRecommend,
        Scroll
    },
    // mixins:[itemListenerMixin],
    created() {
        this.iid = this.$route.params.iid || this.$route.params.tradeItemId;
        getGoodsDetail(this.iid).then(res =>{
           let data = res.result;

           // 获取顶部轮播图
           this.topImages = data.itemInfo.topImages;
           // 获取商品的基本信息
           this.baseInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
           // 获取商家信息
           this.shopInfo = new Shop(data.shopInfo);
           // 获取商品图片信息
           this.goodsInfo = data.detailInfo;
           // 获取商品参数信息
           this.goodsParams = data.itemParams
           //获取评论信息
           this.commentInfo = data.rate;
        });

        // 获取推荐商品列表
        getGoodsRecommend().then(res=> {
            this.recommendList = res.data.list;
        })
    },
    mounted() {
         const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.imgItemListener = ()=>{
            refresh;
        }
        this.$bus.$on('itemImgLoad', this.imgItemListener);
    },
    destroyed() {
         // 取消详情页推荐商品事件总线的监听，与首页商品列表区分开
        this.$bus.$on('itemImgLoad', this.imgItemListener);
    },
    methods: {
        goodsInfoImgLoad(){
            this.$refs.scorll &&  this.$refs.scorll.refresh();
        }
    },
}
</script>

<style scoped>
.detail {
    height: 100vh;
    position: relative;
    background:#fff;
    position: relative;
    z-index: 9;
}
.detail-bar {
    position: relative;
    z-index: 9;
}
.content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
   /* height: 400px; */
   /* height: calc(100% - 44px);  */
   overflow: hidden;
}
</style>
