<template>
    <div id="hy-swiper">
        <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" >
            <slot></slot>
        </div>
        <div class="indicator" v-if="showIndicator && slideCount > 1">
            <slot name="indicator">
                <div v-for="(item, index) in slideCount" :key="index" class="indi-item" :class="{active:index===currentIndex-1 }"></div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props :{
        //轮播图间隔时间
        interval: { 
            type: Number,
            default: 3000,
        },
        //轮播图滚动动画时间
        animDuration: {
            type: Number,
            default: 300,
        },
        // 滑动比例
        moveRatio: {
            type: Number,
            default: 0.5,
        },
        // 是否显示indicator
        showIndicator:{
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            slideCount: 0, //保存slide个数
            totalWidth: 0, //保存swiper的宽度,
            swiperStyle: {}, //保存swiper的样式
            currentIndex: 1, //当前sldie的index
            scrolling: false, //是否正在滚动
            playerTimer: null, //保存定时器
            startX: 0, //保存开始滚动的位置
            distance: 0, //拖动开始到结束的距离
        }
    },
   mounted() {
    //    1.操作DOM，在前后添加slide
    setTimeout(() =>{
        this.handleDom();
        // 2.开启定时器
        this.startTimer();
    }, 300);
   },
    methods: {
        /**
         * 定时器操作
         */
        startTimer() {
            this.playerTimer = window.setInterval(() => {
                this.currentIndex ++;
                this.scrollContent(-this.currentIndex * this.totalWidth);
            }, this.interval);
        },
        stopTimer(){
            window.clearInterval(this.playerTimer);
        },
        /**
         * 图片滚动到正确的位置
         */
        scrollContent(cuurentPosition) {
            // 0.设置正在滚动
            this.scrolling = true;

            // 1.开始滚动动画
            this.swiperStyle.transition = `transform ${this.animDuration}ms`;
            this.setTransform(cuurentPosition);

            // 2.判断滚动到的位置
            this.checkPosition();

            // 3.滚动完成
            this.scrolling = false;
        } ,
        /**
         * 校验正确的位置
         */
        checkPosition(){
            window.setTimeout(()=>{
                // 1.对位置的判断
                this.swiperStyle.transition = '0ms';
                if(this.currentIndex >= this.slideCount + 1){
                    this.currentIndex = 1;
                    this.setTransform(-this.currentIndex * this.totalWidth);
                }else if(this.currentIndex <=0){
                    this.currentIndex = this.slideCount;
                    this.setTransform(-this.currentIndex * this.totalWidth);
                }

                // 2.结束移动后的回调
                // this.$emit('transitionEnd', this.currentIndex-1);
            }, this.animDuration);
        },
        /**
         * 设置滚动条的位置
         */
        setTransform(position) {
            this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
            this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`;
            this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`;
        },
        /**
         * 操作DOm，在DOM前后添加slide
         */
        handleDom(){
            // 1.获取要操作的DOM元素
            let swiperEl = document.querySelector('.swiper');
            let slideEls = document.getElementsByClassName('slide');

            // 2.保存个数
            this.slideCount = slideEls.length;

            // 3.如果个数大于1个，那么要分别在前后加一个slide
            if(this.slideCount > 1){
                let cloneFirst = slideEls[0].cloneNode(true);
                let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
                swiperEl.insertBefore(cloneLast, slideEls[0]);
                swiperEl.appendChild(cloneFirst);
                this.totalWidth = swiperEl.offsetWidth;
                this.swiperStyle = swiperEl.style;
            }

            // 4.让swiper元素，显示第一个swiper(目前显示的是前面添加的最后一个元素)
            this.setTransform(-this.totalWidth);
        },

        /**
         * 拖动事件的处理
         */
        touchStart(e){
            // 1.如果正在滚动，不可以拖动
            if(this.scrolling) return;
            
            // 2. 首先停止定时器
            this.stopTimer();

            // 3.保存开始滚动的位置
            this.startX = e.touches[0].pageX;
        },

        touchMove(e) {
            // 1.计算出用户拖动的距离
            let currentX = e.touches[0].pageX;
            this.distance = currentX - this.startX;
            let currentPosition = -this.currentIndex *  this.totalWidth;
            let moveDistance = this.distance + currentPosition;

            // 2.设置当前的位置
            this.setTransform(moveDistance);
        },

        touchEnd(e) {
            //1.获取移动的距离
            let currentMove = Math.abs(this.distance);

            //2.判断最终的距离
            if(this.distance === 0) {
                return;
            } else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){
                //左边移动超过0.5
                this.currentIndex --;
            } else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){
                // 右边移动超过0.5
                this.currentIndex ++;
            }

            //3.移动到正确的位置
            this.scrollContent(-this.currentIndex * this.totalWidth);

            //4.完成后重新开始定时器
            this.startTimer();
        },

        /**
         * 控制上一个,下一个
         */
        previous(){
            this.changeItem(-1);
        },

        next(){
            this.changeItem(1);
        },

        changeItem: function(num) {
            //1.关闭定时器
            this.stopTimer();

            //2.修改index和位置
            this.currentIndex += num;
            this.scrollContent(-this.currentIndex * this.totalWidth);

            //3.添加定时器
            this.startTimer();

        }
    },
}
</script>

<style scoped>
#hy-swiper {
    overflow: hidden;
    position: relative;
}
.swiper {
    display: flex;
}
.indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
}
.indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
}
.indi-item.active {
    background: rgba(212,62,46,1.0);
}
</style>

