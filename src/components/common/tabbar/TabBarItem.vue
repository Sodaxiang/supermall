<template>
   <div class="tab-bar-item" @click="handleClick">
       <div v-if="!isActive"><slot name="item-icon"></slot></div>
       <div v-else><slot name="item-icon-active"></slot></div>
       <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    data() {
      return {
        // isActive: false,
      }
    },
    props:{
      path: String,
      activeColor:{
        type: String,
        default: '#fb577f',
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1;
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      // 解决路由重复跳转报错
      /*
        pushRouteTo(params) {
            // get comparable fullPaths
                let from  = this.$route.fullPath;
                let to    = this.$router.resolve(params).route.fullPath;
                if(from === to) { 
                    // handle any error due the redundant navigation here
                    // or handle any other param modification and route afterwards
                        return ;
                    }

                // route as expected
                this.$router.push(params);
            },
      */
      handleClick(){
        this.$router.push(this.path)
                    // .catch((err)=>{console.log(err)});
        //  this.pushRouteTo(this.path);
      }
    },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>

