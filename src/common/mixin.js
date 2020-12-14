import { debounce } from './utils';

export const itemListenerMixin = {
    data() {
        return {
            imgItemListener: null, //控制首页商品图片以及详情页商品推荐列表加载显示的listener
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        this.imgItemListener = ()=>{
            refresh;
        }
        this.$bus.$on('itemImgLoad', this.imgItemListener);
    },
}

// 返回顶部图标德混入
export const backTopMixin = {
    data(){
        return {
            isShowBackTop: false,   
        }
    },
    methods: {
        backTopClick(){
            this.$refs.scroll.scrollTo(0,0,500);
        },
    },
}