<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-bg-white l-qrcode-desc l-zoom">
          <h3 class="l-margin l-text-center">二维码说明</h3>
          <ul class="l-fs-s">
            <li>非代理商且当前没有绑定关系的客户可以通过扫描您的二维码关注公众号后与您绑定关系，绑定关系客户成功购买指定商品都会产生返利到您账户；</li>
            <li>客户扫描您的二维码进入公众号后，可点击公众号推送进入代理商申请页面，填写并提交申请，如果经平台审核通过成为代理商，您可享受相关推荐奖励；</li>
            <li>具体细则见签订合同；</li>
          </ul>
        </div>
        <div class="l-bg-white l-margin-tb" style="padding:2rem 0;">
          <div class="l-qrcode-img" :class="{'_error': qrcodeNull }">
            <img :src="qrcodeImg" alt="" >
          </div>
          <!-- <p class="l-text-center l-margin-t">U视一号<i class="l-text-warn">™</i></p> -->
        </div>
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'

export default {
  components: {
    notU
  },
  data () {
    return {
      userInfo: {},
      qrcodeNull: false,
      qrcodeImg: ''
    }
  },
  created() {
    this.$server.user.getInfo().then(({data})=>{
      this.userInfo = data
      this.qrcodeImg = data.ticketImage
      this.qrcodeNull = !data.ticketImage
    })
  }
}
</script>
<style scoped lang="less">
.l-qrcode-desc{
  ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
  li{margin-bottom: 0.5rem;}
}
.l-qrcode-img{
  width: 12rem; height: 12rem; margin:0 auto; text-align: center; position: relative; z-index: 1;
  .canvas{display: none;}
  img{width: 100%; height: 100%;}
}
.l-qrcode-img:after{
  content: '正在加载中...'; position: absolute; left:0; right: 0; text-align: center; top: 50%; margin-top: -0.3rem;
  font-size: 0.6rem; color: #999; z-index: -1;
}
.l-qrcode-img._error:after{
  content: '二维码加载失败'
}
</style>