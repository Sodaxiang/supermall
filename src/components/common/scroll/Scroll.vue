<template>
    <div class="wrapper" ref="wrapper">
        <div class="content"> 
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Scroll',
    data(){
        return {
            scroll: null,
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: true,
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: true,
              click: true,
              observeDOM: true,
              probeType: this.probeType,
              pullUpLoad: this.pullUpLoad,
        });

        // 2.监听滚动的位置
        this.scroll.on('scroll', position => {
            this.$emit('scroll', position);
        });

        // 3.监听下拉
        if(this.pullUpLoad){
            this.scroll.on('pullingUp', ()=>{
            this.$emit('loadMore')
          });
        }
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        // 获取滚动的距离
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    },
}
</script>

