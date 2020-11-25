<template>
    <div class="sidecontent-item">
        <img :src="subCategoryItem.image" alt="subcategory">
        <p>{{subCategoryItem.title}}</p>
    </div>
</template>

<script>
export default {
    name: 'CategorySideContentItem',
    props:{
        subCategoryItem: {
            type: Object,
            default() {
                return {};
            }
        }
    }
}
</script>

<style scoped>
.sidecontent-item {
    width: 50%;
    flex: 1;
    text-align: center;
}
.sidecontent-item img{
    width: 100px; 
}
</style>

