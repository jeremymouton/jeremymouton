<template>
  <div id="app">
    <site-header></site-header>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader'

export default {
  name: 'app',
  components: {
    SiteHeader,
  },
}
</script>

<style src="assets/less/styles.less" lang="less"></style>
