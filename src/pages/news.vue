<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <ul class="mui-table-view mui-table-view-chevron" style="margin-top:0;">
        <li class="mui-table-view-cell mui-media" v-for="item in list" @click="getInfo(item.newsId)">
          <a class="mui-navigate-right">
            <img v-if="item.newsMinImage" class="mui-media-object mui-pull-left" :src="$utils.image.thumb(item.newsMinImage, 60, 60)">
            <div class="mui-media-body">
              {{item.newsTitle}}
              <p class="mui-ellipsis l-text-gray l-fs-m">{{item.published}}</p>
            </div>
          </a>
        </li>
      </ul>
      <infinite-loading :on-infinite="onInfinite" ref="infinite">
        <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
        <div class="l-text-gray l-fs-m" slot="no-results">还没有相关数据</div>
        <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
import infiniteLoading from 'components/vue-infinite-loading'

export default {
  components: {
    infiniteLoading
  },
  data () {
    return {
      page: 1,
      list: []
    }
  },
  methods: {
    onInfinite() {
      this.$server.news.getList(this.page)
      .then(({data})=>{
        let returnList = data.websiteNews

        this.list = this.list.concat(returnList)
        
        if(returnList.length > 0){
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')
          })
          
          if(returnList.length >= data.rows){
            this.page++
          }else{
            this.$refs.infinite.$emit('$InfiniteLoading:complete')
          }
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:complete')
        }
      }).catch(()=>{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      })
    },
    getInfo(newsId = '') {
      let userInfo
      this.$server.user.getInfo().then(({data})=>{
        userInfo = data
      }).finally(()=>{
        this.$link('/news/info/' + newsId + '?_uc=' + (userInfo.userCode || ''), 'page-in')
      })
    }
  }
}
</script>
<style scoped lang="less">

</style>