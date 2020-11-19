<template>
  <div id="app">
    <!-- <router-view #="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view> -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar';
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import './assets/css/base.css';
</style>
