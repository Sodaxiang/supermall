<template>
    <div class="sidebar">
       <ul>
           <li 
              v-for="(item, index) in categoryList" 
              :key="index" 
              :class="{active: currentIndex === index}"
              @click="handleCategoryClick(index, item)"
              >{{item.title}}</li>
       </ul>
    </div>
</template>

<script>
export default {
    name: 'CategorySideBar',
    data() {
        return {
            currentIndex: 0,
            maitKey: '', //记录maitKey
        }
    },
    props:{
        categoryList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
    },
    watch: {
        maitKey(to,from){
            // 当发现maitKey改变时再触发categoryClick函数
            this.$emit('handleCategoryClick', to);
        }
    },
    methods: {
        handleCategoryClick(index, item){
            this.currentIndex = index;
            this.maitKey = item.maitKey;
            // if(this.maitKey=== item.maitKey){
            //     return;
            // }else{
            //      this.$emit('handleCategoryClick', item.maitKey);
            // }
           
        }
    },
}
</script>
<style scoped>
.sidebar {
    width: 100px;
    background: #f6f6f6;
    font-size: 18px;
    height: 100%;
}
.sidebar ul li {
    text-align: center;
    padding: 4px;
}
.active {
    background: #fff;
    border-left: 4px solid var(--color-tint);
}
</style>

