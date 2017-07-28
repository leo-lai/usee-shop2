<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" id="scroll-content" style="background:#d6edf7;">
        <div class="l-movie">
          <div class="_inner">
            <img style="width: 100%;margin-top: -1rem;" src="~assets/images/ssss-003.png" alt="">
            <div style="padding:0 0.75rem 0.75rem;">
              <img style="float:left; margin-right: 0.75rem; width: 5.2rem;" src="~assets/images/ssss-002.png" alt="">
              <p>抢到电影票并且到场者的就有眼贴赠送和神秘奖品等你抽哦~</p>
              <div class="l-margin-t">
                <p class="l-text-gray">活动地点：</p>
                <h3>广州天河区黄埔大道西120号高志大厦4楼中影南方WE影城</h3>
              </div>
              <div class="l-margin-t">
                <p class="l-text-gray">活动时间：</p>
                <h3>2017年08月05日（周六）14:30场</h3>
              </div>
              <div class="l-margin-t">
                <p class="l-text-gray">注意事项：</p>
                <p>电影票资源珍贵，请抢到票的您务必到场（无法到场的可以将电子票券转赠朋友），否则将无法参加下次电影活动</p>
              </div>
            </div>
          </div>
          <div style="margin:1rem 1rem 0;">
            <input type="tel" maxlength="11" v-model="form.phone" style="border:none; border-radius:0; margin:0;" placeholder="请输入正确的手机号码">
          </div>
          <div class="l-fs-s" style="margin: 0.25rem 1rem; line-height: 1.4; color: rgb(246, 142, 169);">
            手机号码将用于接收电子票信息及观影提醒
          </div>
          <div style="margin: 1rem;">
            <button :disabled="submiting" @click="submit" style="width:100%; background:#67bde3; color:#fff; border:none; padding: 0.5rem 0; font-size: 1 rem;">抢抢抢</button>
          </div>
          <div style="margin:1rem; font-size:0.6rem; color:#999; text-align:center;">
            本活动最终解释权归贵州优视一号生物科技有限公司所有
          </div>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-result">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" style="background:#fff;">
        <div class="l-text-center" v-if="result == 1">
          <br><br>
          <h3 style="color:#ee5859; font-size: 1.6rem;">抢券成功</h3>
          <p class="l-margin-t">识别下方二维码获取电子票</p>
          <br>
          <img style="width: 10rem;" src="~assets/images/ssss-006.jpg" alt="">
          <img style="width: 9rem;" src="~assets/images/ubaby-qr.jpg" alt="">
        </div>
        <div class="l-text-center" v-else>
          <br><br>
          <h3 style="color:#ee5859; font-size: 1.6rem;">抢光啦</h3>
          <p class="l-margin-t">手慢了，电影票已经被抢完了！</p>
          <br>
          <img style="width: 10rem;" src="~assets/images/ssss-005.jpg" alt="">
          <img style="width: 9rem;" src="~assets/images/ubaby-qr.jpg" alt="">
          <p style="font-size: 0.7rem;color:#ee5859;">活动多多，关注公众号第一时间参与下次活动</p>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-none">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" style="background:#f3f3f3;">
        <div class="l-text-center">
          <br><br>
          <img style="width: 15rem;" src="~assets/images/ssss-004.jpg" alt="">
          <div class="l-45deg">
            <p style="margin: 2rem 0 0.5rem;">小窍门：关注公众号<br>&emsp;&emsp;&emsp;&emsp;第一时间获取活动资讯</p>
            <img style="width: 7rem;" src="~assets/images/ubaby-qr.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      submiting: false,
      result: '',
      form: {
        projectId: 1,
        phone: ''
      }
    }
  },
  methods: {
    submit() {
      if(!/^1\d{10}$/.test(this.form.phone)){
        this.$mui.toptip('请输入正确的手机号码')
        return
      }

      this.$mui.showWaiting('抢券中')
      this.$server.movie.get(this.form).then(({data})=>{
        this.result = data
        if(data == 2){
          this.$pageTo('#page-none', 'U视一号爱眼护眼电影节')
        }else{
          this.$pageTo('#page-result', 'U视一号爱眼护眼电影节')
        }
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  mounted() {
    this.form.projectId = this.$route.params.id || 1
  }
}
</script>
<style scoped lang="less">
.l-45deg{
  transform: rotate(-15deg);
}
.l-movie{
  background: url('~assets/images/ssss-001.jpg') no-repeat 50% top;
  background-size: 100%;
  padding-top: 11rem;
  ._inner{
    margin:-0.5rem 1rem 0; background: #fff; font-size: 0.75rem;
  }
}
</style>