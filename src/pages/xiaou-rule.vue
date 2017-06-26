<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">关于U视一号</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-help-top l-flex-hc">
        <img src="~assets/images/icon-017.png" alt="">
        <div class="l-rest">
          注：具体细则见签订的加盟合同，与合同不一致地方，以签订的加盟合同为准。<br>如有疑问，可联系客服400-1806900</div>
      </div>
      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">01</i>
          <h3 class="l-rest">我成为小U能得到什么好处？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>获得加盟资金零售价等值货品，并一次性发货</li>
          <li>获得300元的等值赠送商品</li>
          <li>平台小U账号资格，通过扫码关注公众号可以发展自己的客户</li>
          <li>商城返佣，凡所属自己的客户成功购买商品，都能获得商品销售额的25%的返佣</li>
          <li>推荐返佣，推荐合伙人或小U加入平台都有相应的返佣金额</li>
          <li>晋升通道</li>
        </ul>
      </div>

      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">02</i>
          <h3 class="l-rest">我成为小U该做什么才能得到这些好处？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>发展客户，通过扫描您的专属小U码关注公众号与您绑定关系，绑定关系客户购买数额越大，您获得的返佣就会愈多</li>
          <li>推荐代理商，不断推荐小U店长或者区域合伙人，您将获得大量的推荐返佣</li>
          <li>提现，平台将在客户确认收货后的7天对返利流水进行审核，审核通过的返利将会进入您的账户余额，当账户余额>50元即可发起提现，平台将根据提现申请进行打款至您的提现账户</li>
        </ul>
      </div>

      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">03</i>
          <h3 class="l-rest">我的朋友也想加入该怎么办？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>您可以让朋友扫描您的专属小U码关注“U视一号“公众号，通过点击公众号推送招商信息填写申请并提交平台申请</li>
          <li>推荐代理商必须为法人单位，且由本人提交申请</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      
    }
  }
}
</script>
<style scoped lang="less">
.l-help-top{
  background: #fff; padding: 0.5rem;
  img{width: 3rem; height: 3rem; margin-right: 0.5rem;}
  .l-rest{padding: 0.25rem; font-size: 0.7rem; }
}
.l-help-item{
  margin: 0.75rem 0; background: #fff;overflow: hidden;
  ul{padding-right: 0.75rem; font-size: 0.75rem;}
  li{margin:0.5rem 0;}
}
.l-help-item-hd{
  padding: 0.5rem 0.75rem;
  i{font-size: 1.6rem; margin-right: 0.5rem;}
  img{width: 1.6rem;margin-left: 0.5rem;}
}
</style>