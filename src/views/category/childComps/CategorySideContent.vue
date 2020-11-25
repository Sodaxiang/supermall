<template>
    <div class="sidecontent">
        <category-side-content-item 
            v-for="(item, index) in subCategoryList" 
            :key="index"
            :subCategoryItem="item"
        />
    </div>
</template>

<script>
import CategorySideContentItem from './CategorySideContentItem';
export default {
    name: 'CategorySideContent',
    props: {
        subCategoryList:{
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        CategorySideContentItem
    }
}
</script>
<style scoped>
.sidecontent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
}
</style>

