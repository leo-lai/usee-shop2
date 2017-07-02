<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <div class="mui-content">
      <div class="l-bg-white l-padding" v-if="list.length > 0">
        <table class="l-report-list">
          <tr>
            <td width="50%" style="background:#64c4a8;color:#fff;">U视门诊检测报告</td>
            <td width="50%"></td>
          </tr>
          <tr v-for="item in list" @click="$link('/check/report/info/' + item.uuidCode, 'page-in')">
            <td>{{item.createDate}}</td>
            <td>{{item.constitutionRemark}}<i class="l-icon l-fr l-text-gray">&#xe603;</i></td>
          </tr>
        </table>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infinite">
        <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
        <div class="l-text-gray l-fs-m" slot="no-results">
          <br>
          <p>还没有检测报告记录</p>
          <br>
          <button type="button" class="mui-btn l-btn-main2 _m" style="width: 50%;" @click="$link('/check/eye', 'page-in', 'replace')">去检测</button>
        </div>
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
      this.$server.check.getReportList(this.page)
      .then(({data})=>{
        let returnList = data

        this.list = this.list.concat(returnList.filter((item)=>!!item.uuidCode))
        
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
    }
  },
  created() {
  }
}
</script>
<style scoped lang="less">
.l-report-list{
  width: 100%;
  tr>td:first-child{
    border-right: 2px solid #64c4a8;
  }
  tr>td{
    padding: 0.75rem; text-align: center;
  }
}
</style>