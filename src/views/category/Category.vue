<template>
    <div id="category">
        <nav-bar class="category-bar">
           <div slot="center">商品分类</div>
       </nav-bar>
       <div class="category-content">
           <scroll class="category-side-bar">
               <category-side-bar :categoryList="categoryList" @handleCategoryClick="handleCategoryClick"/>
           </scroll>
           <category-side-content  class="category-side-content"  :subCategoryInfo="subCategoryInfo"/>
       </div>
       
      
    </div>
   
</template>

<script>
import CategorySideBar from './childComps/CategorySideBar';
import CategorySideContent from './childComps/CategorySideContent';

import NavBar from '@/components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/Scroll';

import { getAllCategory, getSubCategory } from '@/network/category';

export default {
    name: 'Category',
    data() {
        return {
            categoryList:[],
            subCategoryMaitKey:'',
            // subCategoryList: [],
            subCategoryInfo:''
        }
    },
    components:{
        NavBar,
        CategorySideBar,
        CategorySideContent,
        Scroll
    },
    created() {
        getAllCategory().then(res=> {
            this.categoryList = res.data.category.list;
            this.subCategoryMaitKey = res.data.category.list[0].maitKey;
            return this.subCategoryMaitKey;
        }).then(key=>{
             this.getSubCategory(key);
        })
    },
    methods: {
        handleCategoryClick(maitKey){
            this.getSubCategory(maitKey);
        },
        getSubCategory(key){
            getSubCategory(key).then(res=>{
                this.subCategoryInfo = `maitKey为${key}的子类型获取成功`
                console.log(res, "sub");
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
}
.category-side-bar {
    width: 100px;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    /* height: calc(100% - 44px - 49px); */
    overflow: hidden;
}
.category-side-content {
    position: absolute;
    left: 100px;
    right: 0;
    top: 44px;
    bottom: 49px;
}
</style>

