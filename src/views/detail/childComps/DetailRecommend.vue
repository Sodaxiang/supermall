<template>
    <div class="detail-recommend">
      <goods-list
         :goodsList="recommendList"
      />    
    </div>
</template>

<script>
import GoodsList from '@/components/content/goods/GoodsList';

export default {
    name: 'DetailRecommend',
    props:{
        recommendList: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        GoodsList
    }
}
</script>
<style scoped>
.detail-recommend {
    padding: 20px 8px 10px;
}
</style>
