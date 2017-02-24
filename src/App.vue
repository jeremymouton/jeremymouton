<template>
  <div id="app">
    <site-header></site-header>
    <main role="main">
      <router-view></router-view>
    </main>
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

<style lang="less">
body {
  @media (min-height: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#app {
  padding-bottom: 40px;
}
</style>
