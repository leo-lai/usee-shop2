<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <template v-if="info">
        <div class="l-article-tit">
          <h3>{{info.newsTitle}}</h3>
          <p>{{info.published}}&nbsp;&nbsp;U视一号</p>
        </div>
        <div class="l-padding l-zoom" v-html="info.newsContent"></div>
        <div class="l-article-ft" v-if="info.userqQRImage">
          <img width="200" :src="info.userqQRImage" alt="">
        </div>
      </template>
      <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      info: null,
      loading: false
    }
  },
  created() {
    this.loading = true
    let userCode = this.$route.query._uc || ''
    let newsId = this.$route.params.id || ''
    this.$server.news.getInfo(newsId, userCode)
    .then(({data})=>{
      let that = this

      that.info = data
      let url = that.$server.getHost() + that.$url.setArgs(that.$route.fullPath, '_uc', userCode || '')
      let imgUrl = that.$utils.image.thumb(data.userqQRImage, 60, 60)
      that.$server.wxShare({
        title: data.newsTitle,
        desc: data.newsDescribe,
        link: url,
        imgUrl: imgUrl,
        success(res) {
          that.$server.news.share(newsId, userCode).then(()=>{
            that.$mui.toast('分享成功')
          })
        }
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-article-tit{
  margin: 0.75rem;
  h3{margin-bottom: 10px; line-height: 1.2; font-weight: 400; font-size: 24px; }
  p{color: #999; font-size: 0.8rem;}
}
.l-article-ft{
  text-align: center; margin: 0.75rem;
}
</style>