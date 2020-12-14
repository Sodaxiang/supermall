<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isShowTabControl"
                class="tab-control"
        />
        <scroll 
          class="content" 
          ref="scroll"
          @scroll="handleScrollContent"
          :probeType="3"
          :pullUpLoad= "true"
          @loadMore="loadMoreGoods"
          >
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoadFinish"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                ref="tabControl2"
                />
            <goods-list
                :goodsList="showGoods"
                class="goods-list"
            />    
        </scroll>
        <back-top @click.native="backTopClick" v-if="isShowBackTop" />
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from '@/components/common/navbar/NavBar';
import TabControl from '@/components/content/tabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList';
import Scroll from '@/components/common/scroll/Scroll';
import BackTop from '@/components/common/backTop/BackTop';

import { getHomeMultidata,getHomeGoods } from '@/network/home';
import { debounce } from '@/common/utils';

// import {itemListenerMixin} from '@/common/mixin';
import {backTopMixin} from '@/common/mixin';

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners:[],
            recommends:[],
            currentType: 'pop',
            goods: {
                'pop':{page: 0, list: []},
                new:{page: 0, list: []},
                sell:{page: 0, list: []}
            },
            // isShowBackTop: false, // 是否显示返回顶部按钮
            tabControlOffsetTop: 0, //tabControl距离顶部的距离
            isShowTabControl: false, //是否显示吸顶的tabControl
            saveScrollY: 0, //记录页面离开scrollY的距离
            imgItemListener: null, //控制首页商品图片加载显示的listener
        }
    },
    mixins:[backTopMixin],
    computed: {
        showGoods(){
            return this.goods[this.currentType].list;
        }
    },
    created() {
        this.getHomeMultidata();

        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    // mixins:[itemListenerMixin],
    mounted() {
        /**
         * 1.监听事件总线中商品图片全部加载完成
         * 运用函数防抖动
         */
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.imgItemListener = ()=>{
            refresh;
        }
        this.$bus.$on('itemImgLoad', this.imgItemListener);

        /**
         * 2. 获取tabControl的offsetTop，做tabControl的吸顶效果
         * 注意：swiper图片加载的过程会对offset造成影响，所以需要监听swiper图片加载完成才能获取offsetTop
         */
        // this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    // 保留页面的滚动位置
    activated() {
        if( this.$refs.scroll){
            this.$refs.scroll.scrollTo(0, this.saveScrollY);
            this.$refs.scroll.refresh();
        }
        // this.$refs.scroll.scrollTo(0, this.saveScrollY, 0);
        // this.$refs.scroll.refresh();
    },
    deactivated() {
        // 页面失活时获取页面Y轴滚动的位置
        this.saveScrollY = this.$refs.scroll.getScrollY();

        // 取消首页事件总线的监听，与详情页的推荐数据列表区分开
        this.$bus.$off('itemImgLoad', this.imgItemListener);
    },
    methods: {
        /**
         * 监听事件处理方法
         */
        tabClick(i){
            this.currentType = Object.keys(this.goods)[i];

            // 注意障眼法设置两个tabControl内部的currentIndex一致
            this.$refs.tabControl1.currentIndex = i;
            this.$refs.tabControl2.currentIndex = i;
        },
        handleScrollContent(position){
            // 1.是否显示backTop图标
            this.isShowBackTop = Math.abs(position.y) > 1000;

            // 2.障眼法显示tabControl吸顶
            this.isShowTabControl = Math.abs(position.y) > this.tabControlOffsetTop;

        },
        // backTopClick(){
        //     this.$refs.scroll.scrollTo(0,0,500);
        // },
        loadMoreGoods(){
            this.getHomeGoods(this.currentType);
        },
        // 当轮播图加载成功时获取tabControlOffsetTop
        swiperImgLoadFinish(){
            this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /**
         * 网络请求的方法
         */
        // 1.获取首页轮播图以及推荐数据
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            }).catch(err => {
                console.log(err);
            });
        },
        // 2.获取商品数据
        getHomeGoods(type){
            let page = this.goods[type].page+1;
            getHomeGoods(type, page).then(res=>{
                // this.goods[type].list.concat(res.data.list);此方法不会改变原来得数组
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page++ ;

                // 下拉刷新更多
                this.$refs.scroll.scroll.finishPullUp();
            });
        },
    },
}
</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
}
.home-nav {
    background: var(--color-tint);
    color: #fff;
    /* position: fixed; */
    /* position: sticky; */
    /* top:0;
    left: 0;
    right: 0;
    z-index: 9; */
}
.tab-control {
    position: relative;
    z-index: 9;
}
.content{
    /* height: 500px; */
    position: absolute;
    left: 0; 
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    /* background: #fff; */
}


.goods-list {
    padding: 8px;
}
</style>
