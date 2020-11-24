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
    methods: {
        handleCategoryClick(index, item){
            this.currentIndex = index;
            this.$emit('handleCategoryClick', item.maitKey);
        }
    },
}
</script>
<style scoped>
.sidebar {
    width: 100px;
    background: #f6f6f6;
    font-size: 18px;
}
.sidebar ul li {
    text-align: center;
    padding: 10px;
}
.active {
    background: #fff;
    border-left: 4px solid var(--color-tint);
}
</style>

