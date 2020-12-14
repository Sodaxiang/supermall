<template>
    <div class="sidecontent-item">
        <img v-lazy="subCategoryItem.image" alt="subcategory" @load="imgLoad">
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
    },
    methods: {
        imgLoad(){
        this.$bus.$emit('itemImgLoad');
      }
    },
    
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

