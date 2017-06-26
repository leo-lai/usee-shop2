<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- <input type="file" accept="image/*" >  -->
      <img style="display:block;height:100%;width:100%;" src="~assets/images/index.hot2.jpg" alt="" @click="$link('/shop/goods/info/1', 'page-in')" >
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
export default {
  components: {
    navTab
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>

</style>