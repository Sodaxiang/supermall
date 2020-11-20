<template>
  <nav-bar>
      <div slot="left" class="back" @click="backHome">
          <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
          <div 
            v-for="(item, i) in titles" 
            :key="i" 
            class="title-item"
            :class="{active: currentTitleIndex === i}"
            @click="titleClick(i)">{{item}}</div>
      </div>
  </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentTitleIndex: 0,
        }
    },
    components: {
        NavBar,
    },
    methods: {
        backHome() {
            this.$router.push('/home');
        },
        titleClick(i){
            this.currentTitleIndex = i;
            this.$emit('tabClick', i, 500);
        }
    },
}
</script>

<style scoped>
 .back img {
     width: 24px;
     height: 24px;
     vertical-align: middle;
 }
 .titles {
     display: flex;
 }
 .titles .title-item{
     flex: 1;
 }
 .active {
     color: var(--color-tint);
 }
</style>
