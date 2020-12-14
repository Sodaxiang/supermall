<template>
    <div id="category">
        <nav-bar class="category-bar">
           <div slot="center">商品分类</div>
       </nav-bar>
       <div class="category-content">
           <div class="category-side-bar">
               <category-side-bar :categoryList="categoryList" @handleCategoryClick="handleCategoryClick"/>
           </div>
            <scroll class="category-side-content" ref="scroll" >
               <category-side-content :subCategoryList="subCategoryList" />
            </scroll>
       </div>
       
      
    </div>
   
</template>

<script>
import CategorySideBar from './childComps/CategorySideBar';
import CategorySideContent from './childComps/CategorySideContent';

import NavBar from '@/components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/Scroll';

import { getAllCategory, getSubCategory } from '@/network/category';
import {itemListenerMixin} from '@/common/mixin';//监听图片加载的混入
export default {
    name: 'Category',
    data() {
        return {
            categoryList:[],
            subCategoryMaitKey:'',
            subCategoryList: [],
        }
    },
    components:{
        NavBar,
        CategorySideBar,
        CategorySideContent,
        Scroll
    },
    mixins:[itemListenerMixin],
    created() {
        getAllCategory().then(res=> {
            this.categoryList = res.data.category.list;
            this.subCategoryMaitKey = res.data.category.list[0].maitKey;
            return this.subCategoryMaitKey;
        }).then(key=>{
             this.getSubCategory(key);
        })
    },
    deactivated() {
        // 取消首页事件总线的监听，与首页商品图片加载分开
        this.$bus.$off('itemImgLoad', this.imgItemListener);
    },
    watch: {
    },
    methods: {
        handleCategoryClick(maitKey){
            this.getSubCategory(maitKey);
        },
        getSubCategory(key){
            getSubCategory(key).then(res=>{
                this.subCategoryList = res.data.list;
                this.$refs.scroll.scrollTo(0,0,500);
            })
        }
    },
}
</script>
<style scoped>
#category {
    height: 100vh;
    position: relative;
}
.category-bar {
    background: var(--color-tint);
    color: #fff;
    z-index: 9;
}
.category-side-bar {
    width: 100px;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    /* height: calc(100% - 44px - 49px); */
    /* overflow: hidden; */
}
.category-side-content {
    position: absolute;
    left: 100px;
    right: 0;
    top: 44px;
    bottom: 49px;
    width: calc(100% - 100px);
    overflow: hidden;
}
</style>

