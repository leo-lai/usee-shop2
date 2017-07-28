<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-bg-white l-margin-b">
          <div class="l-border-t l-padding-btn l-flex-hc" v-for="item in list" @click="viewInfo(item)">
            <div class="l-rest">
              <p>{{item.receivablesDate}}</p>
              <p class="l-fs-m">{{item.purpose}}</p>
            </div>
            <div class="l-text-right" :class="stateCls[item.receivablesState]"> 
              <p>{{item.amount | currency}}</p>
              <p class="l-fs-m">{{receivablesState[item.receivablesState]}}</p>
            </div>
          </div>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infinite">
          <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
          <div class="l-text-gray l-fs-m" slot="no-results">还没有收款历史记录</div>
          <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
        </infinite-loading>
      </div>
    </div>
    <!-- 流水详情 -->
    <div class="l-page" id="page-txinfo">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">收款详情</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <template v-if="info">
          <div class="l-bg-white l-padding">
            <div class="l-border-b l-flex-hc" style="padding: 1rem 0;">
              <span class="l-rest">收款金额</span>
              <span class="mui-pull-right l-fs-xl">{{info.amount | currency}}</span>
            </div>
          </div>
          <div class="l-bg-white l-margin-b">
            <div class="l-fs-s l-padding-btn">
              <p class="l-margin-tb-m">
                <span class="mui-pull-right">{{info.receivablesDate}}</span>
                <span class="l-text-gray">收款时间</span>
              </p>
              <p class="l-margin-tb-m">
                <span class="mui-pull-right">{{payWay[info.channel].name}}</span>
                <span class="l-text-gray">支付方式</span>
              </p>
              <p class="l-margin-tb-m">
                <span class="mui-pull-right" :class="stateCls[info.receivablesState]">{{receivablesState[info.receivablesState]}}</span>
                <span class="l-text-gray">支付状态</span>
              </p>
              <p class="l-margin-tb-m">
                <span class="mui-pull-right">{{info.purpose}}</span>
                <span class="l-text-gray">收款事由</span>
              </p>
              <p class="l-margin-tb-m">
                <span class="mui-pull-right">{{info.remarks}}</span>
                <span class="l-text-gray">收款备注</span>
              </p>
            </div>
          </div>
        </template>
      </div>
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
      receivablesState: ['等待付款', '支付成功', '支付失败'],
      stateCls: ['l-text-warn', 'l-text-ok', 'l-text-error'],
      page: 1,
      list: [],
      info: null,
      payWay: {
        'wx_pub_qr': {
          name: '微信支付'
        },
        'alipay_qr': {
          name: '支付宝支付'
        },
        'pos': {
          name: 'POS机刷卡'
        }
      }
    }
  },
  methods: {
    onInfinite() {
      this.$server.pay.getRecord(this.page)
      .then(({data})=>{
        let returnList = data
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
    reset() {
      this.page = 1
      this.list = []
      this.$refs.infinite.$emit('$InfiniteLoading:reset', true)
    },
    viewInfo(item) {
      this.info = item
      this.$pageTo('#page-txinfo', '收款详情')
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="less">

</style>