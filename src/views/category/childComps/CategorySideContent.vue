<template>
    <div class="sidecontent">
        {{subCategoryInfo}}
    </div>
</template>

<script>
export default {
    name: 'CategorySideContent',
    props: {
        subCategoryInfo: {
            type: String,
            default: '',
        }
    }
}
</script>
<style scoped>
.sidecontent {
    text-align: center;
    padding-top: 50px;
}
</style>

