<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content l-flex-vhc">
        <div v-show="!isQuanMa">
          <button class="l-qingse-btn" @click="scan">扫码核销</button>
          <br>
          <button class="l-qingse-btn" @click="isQuanMa = true">券码核销</button>
        </div>

        <div v-show="isQuanMa">
          <div class="mui-input-row">
            <input class="mui-input-clear" type="text" style="width: 12rem; border-radius:0; padding: 0.5rem 0.3rem; " v-model="number" placeholder="请输入券码">
          </div>
          <button class="l-qingse-btn" @click="submit">确定核销</button>
          <button class="l-baise-btn" @click="isQuanMa = false">返回</button>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-result">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content l-bg-white">
        <div class="l-text-center">
          <br><br><br>
          <i class="l-icon l-text-main2" style="font-size:3rem;">&#xe7f8;</i>
          <h3 class="l-fs-xl">核销成功</h3>
          <p class="l-margin-t">请发放电影票</p>
          <br>
          <button class="l-qingse-btn" @click="$router.back()">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isQuanMa: false,
      number: ''
    }
  },
  methods: {
    submit() {
      this.$mui.showWaiting('校验中...')
      this.$server.movie.hexiao(this.number).then(()=>{
        this.$pageTo('#page-result')
        this.number = ''
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    scan() {
      let that = this
      this.$mui.showWaiting()
      this.$server.getWxConfig().then((wx)=>{
        wx.scanQRCode({
          needResult: 1, 
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            that.number = res.resultStr
            that.submit()
          }
        })
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.$mui('.mui-input-clear').input()
    })
  }
}
</script>
<style scoped lang="less">
.l-qingse-btn, .l-baise-btn{
  background: #64c4a8; display: block; margin: 1rem auto; width: 12rem; color: #fff; font-size: 0.85rem; padding: 0.5rem 0; 
  border-radius: 0; border:none;
}
.l-baise-btn{
  background: #fff; color: inherit;
}
</style>