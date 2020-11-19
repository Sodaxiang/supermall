import { debounce } from './utils';

export const itemListenerMixin = {
    data() {
        return {
            imgItemListener: null, //控制首页商品图片以及详情页商品推荐列表加载显示的listener
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.imgItemListener = ()=>{
            refresh;
        }
        this.$bus.$on('itemImgLoad', this.imgItemListener);
    },
}