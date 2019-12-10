<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-movie-time">
      <div class="_timeout">
        <div class="l-flex-hc _time">
          <div>
            <span><i>{{h[0]}}</i></span>
            <span><i>{{h[1]}}</i></span>
          </div>
          <div>:</div>
          <div>
            <span><i>{{m[0]}}</i></span>
            <span><i>{{m[1]}}</i></span>
          </div>
          <div>:</div>
          <div>
            <transition-group name="page-bottom" tag="span">
              <i v-if="s[0]%2 === 0" :key="s[0]">
                {{s[0]}}
              </i>
              <i v-else :key="s[0]">
                {{s[0]}}
              </i>
            </transition-group>
            <transition-group name="page-bottom" tag="span">
              <i v-if="s[1]%2 === 0" :key="s[1]">
                {{s[1]}}
              </i>
              <i v-else :key="s[1]">
                {{s[1]}}
              </i>
            </transition-group>
          </div>
        </div>
        <div class="l-flex-hc" style="margin: 0 3%;">
          <div class="l-fs-xs">Hours</div>
          <div class="l-fs-xs">Minutes</div>
          <div class="l-fs-xs">Seconds</div>
        </div>
      </div>
      <div class="l-text-center" style="margin: -2% 10% 0; font-size: 0.7rem; line-height: 1.4;">
        温馨提示：倒计时结束后将会自动跳转至抢票页面，请提前收藏。
      </div>
    </div>
  </div>
</template>
<script>
function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  return {
    h: hours + days*24,
    m: minutes,
    s: Math.floor(seconds)
  }
}

export default {
  data () {
    return {
      h: [0, 0],
      m: [0, 0],
      s: [0, 0]
    }
  },
  methods: {
    numberToArr(number = 0) {
      let ret = [parseInt(number / 10), number % 10]
      return ret
    },
    getTimes() {
      let endTime = new Date(2017, 7, 2, 11, 30, 0).getTime()
      let nowTime = Date.now()
      if(endTime - nowTime > 0){
        let hms = formatDuring(endTime - nowTime)
        this.h = this.numberToArr(hms.h)
        this.m = this.numberToArr(hms.m)
        this.s = this.numberToArr(hms.s)
      }else{
        this.$utils.url.replace('/movie/1')
      }
    }
  },
  mounted() {
    let that = this
    that.$server.wxShare({
      title: '一起去看个电影吧',
      desc: '三生三世电影票限量免费抢',
      link: that.$server.getHost() + '/movie/' + that.$route.params.id,
      imgUrl: 'http://qiniu.ushiyihao.com/mall/share/sharePic.jpg',
      success(res) {
        that.$mui.toast('分享成功')
      }
    }).finally(()=>{
      this.$mui.hideWaiting()
    })

    setInterval(()=>{
      this.getTimes()
    }, 1000)
  }
}
</script>
<style scoped lang="less">
.l-movie-time{
  background: #e0d6cd url(~assets/images/ssss-008.jpg) no-repeat 50% top; background-size: 100%;
  ._timeout{
    background: url(~assets/images/ssss-007.png) no-repeat 50% top; background-size: contain;
    width: 50%; height: 16%; margin: 100% auto 0; color: #fff; overflow: hidden;
    div{
      flex:1; text-align: center; font-size: 0; white-space: nowrap; height: 1.7rem; 
    }
  }
  ._time{
    margin: 7% 5% 3%;
    span{position: relative; height: 1.7rem; line-height: 1.7rem; width: 40%;}
    span>i{position: absolute; top:0; left: 0; height: 100%; width: 100%;}
    &>div:nth-child(odd) span{
      display: inline-block; overflow: hidden; vertical-align: top;
      background-color: #e5dede; background-image: linear-gradient(180deg, #cebfc0, #ffffff, #cebfc0); color: #000; 
      box-shadow: 0 0 0 1px #999 inset;
      margin: 0 2%; font-weight: bold; font-size: 1rem; padding: 2% 10%;
    }
    &>div:nth-child(even){
      width: 5%; flex:none; font-weight: bold; font-size: 1rem;
    }
  }
}


</style>