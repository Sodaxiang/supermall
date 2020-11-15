<template>
    <swiper>
        <swiper-item v-for="(item, i) in banners" :key="i">
            <a :href="item.link">
                <img :src="item.image" alt="swiper-image" @load="swiperImgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper';

export default {
    name: 'HomeSwiper',
    props: {
        banners: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isLoad: false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        swiperImgLoad(){
            // 只让swiperImgLoad发送一次
            if(!this.isLoad){
                this.$emit('swiperImgLoad');
                this.isLoad = true;
            }
        }
    },
}
</script>