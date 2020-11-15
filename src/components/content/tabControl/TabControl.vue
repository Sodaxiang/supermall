<template>
    <div class="tab-control">
        <div
          v-for="(item, i) in titles"
          :key ="i"
          class="tab-control-item"
          @click="itemClick(i)">
           <span :class="{active: currentIndex === i}">{{item}}</span>  
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props:{
        titles: {
            type: Array,
            default(){
                return [];
            }
        }   
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index){
            this.currentIndex = index;
            this.$emit("tabClick", index);
        }
    },
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
    z-index: 9;
}
.tab-control-item {
    flex: 1;
}
.tab-control-item span {
    padding: 5px;
}
.tab-control-item span.active {
    border-bottom: 5px solid var(--color-tint);
    color: var(--color-tint);
}
</style>

