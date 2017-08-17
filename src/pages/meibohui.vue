<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-text-center">
        <img src="~assets/images/mbh-share-01.jpg" alt="">
        <img src="~assets/images/mbh-share-02.jpg" alt="">
        <img src="~assets/images/mbh-share-03.jpg" alt="">
      </div>
      <div class="l-text-center" style="margin:1rem;">
        <h3>美博会视频</h3>
        <div style="margin: 0.75rem 0; background:#000;">
          <!-- <video-player class="vjs-custom-skin" :options="playerOptions" :playsinline="true"></video-player> -->
          <video style="display:block;object-fit:fill;" controls width="100%" height="100%" webkit-playsinline playsinline>
            <source src="https://www.ushiyihao.com/uploads/meibohui.ogv" type='video/ogg; codecs="theora, vorbis"'/>
            <source src="https://www.ushiyihao.com/uploads/meibohui.webm" type='video/webm' >
            <source src="https://www.ushiyihao.com/uploads/meibohui.mp4" type='video/mp4'>
            <p>Video is not visible, most likely your browser does not support HTML5 video</p>
          </video>
        </div>
      </div>
      <div class="l-text-center">
        <img src="~assets/images/mbh-share-04.jpg" alt="">
      </div>
      <div style="background:#8d192b; color:#fff; margin: 0.75rem; padding:0.75rem; font-size:0.7rem;">
        <p>地址：海珠区阅江中路380-382号（中国进出口商品交易会）</p>
        <p>展示位：B区11.2馆L39</p>
        <p>时间：2017年9月3-5日（9：00-16：30）</p>
      </div>
      <div class="l-text-center l-margin">
        <br>
        <p><input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="form.phoneNumber"></p>
        <button :disabled="submiting" @click="submit" style="background:#af1119; width: 100%; padding: 0.5rem; color:#fff; font-size:1rem;">
        {{ submiting ? '报名中...' : '报名参加' }}</button>
        <p class="l-text-gray l-fs-xs l-margin-t">本活动最终解释权归贵州优视一号生物科技有限公司所有</p>
      </div>
    </div>
    
    <transition name="fade">
      <div class="l-layer l-rel" v-show="result">
        <div style="color:#fff; position: absolute; top: 0; right: 0;padding: 1rem; ">
          <i class="l-icon" style="font-size: 2rem; line-height:1;">&#xe60e;</i>  
        </div>
        <br><br><br>
        <div style="padding: 1rem;  margin: 1rem; background:#fff;">
          <h3 class="l-fs-l l-text-center">恭喜您，报名成功！</h3>  
          <p class="l-fs-m l-margin-t">点击微信右上角分享到朋友圈，并于<b class="l-text-hot">2017年9月3-5日 (9：00-16：30）</b>到场参加美博会，出示朋友圈转发内容即可向工作人员领取<b class="l-text-hot">价值99元的白加黑眼贴一份（含6片）</b>。 现场还有惊喜礼品提供抽奖</p>
        </div>
        <div class="l-text-center" style="color:#fff;">
          <i class="l-icon" style="font-size: 1.4rem;" @click="result = false">&#xe61a;</i>
        </div>
      </div>
    </transition>
    
  </div>
</template>
<script>
// import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    // videoPlayer
  },
  data () {
    return {
      result: false,
      submiting: false,
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/webm',
          src: 'https://www.ushiyihao.com/uploads/meibohui.webm'
        },{
          type: 'video/mp4',
          src: 'https://www.ushiyihao.com/uploads/meibohui.mp4'
        }],
        poster: 'http://opii7iyzy.bkt.clouddn.com/mall/active/coverMeibo.png',
      },
      form: {
        shareTitle: '美博会报名活动',
        phoneNumber: ''
      }
    }
  },
  methods: {
    submit() {
      if(!/^1\d{10}$/.test(this.form.phoneNumber)){
        this.$mui.toptip('请输入手机号码')
        return
      }

      this.submiting = true
      this.$server.meibohui.apply(this.form).then(()=>{
        this.result = true
      }).finally(()=>{
        this.submiting = false
      })
    }
  },
  mounted() {
    let that = this

    let url = that.$server.getHost() + that.$route.path
    let imgUrl = that.$utils.image.thumb('http://opii7iyzy.bkt.clouddn.com/mall/active/useeAndMeibo.png', 60, 60)
    that.$server.wxShare({
      title: '第47届了，这次你会来参加吗？',
      desc: '免费参展体验涵盖美容，美发，水疗等多个主题，到场更有礼品赠送？',
      link: url,
      imgUrl: imgUrl,
      success(res) {
        that.$server.meibohui.share({
          shareTitle: '美博会报名活动',
          channel: '活动页面'
        }).then(()=>{
          that.$mui.toast('分享成功')  
        }).finally(()=>{
          that.result = false
        })
      }
    }).finally(()=>{
      this.$mui.hideWaiting()
    })
  }
}
</script>
<style scoped>
/*@import url(~video.js/dist/video-js.css);*/
/*@import url(~vue-video-player/src/custom-theme.css);*/
</style>

<style lang="less">
// .vjs-custom-skin > .video-js{height: 9.5rem; }
// .vjs-custom-skin > .video-js .vjs-big-play-button{font-size: 0.75rem !important; }
</style>