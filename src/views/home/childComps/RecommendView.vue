<template>
    <div class="recommend">
        <div v-for="(item, i) in recommends" :key="i" class="recommend-item">
            <img :src="item.image" />
            <div class="title">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props:{
        recommends:{
            type: Array,
            default() {
                return [];
            }
        }
    }
}
</script>

<style>
.recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 8px 0 10px;
    border-bottom: 10px solid #eee;
}
.recommend-item {
    flex: 1;
}
.recommend-item img {
    width: 60px;
    margin-bottom: 6px;
}

</style>
