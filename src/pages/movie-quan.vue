<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content" id="scroll-content">
      <div class="l-movie-quan">
        <div class="_name">
          <p class="l-fs-s l-text-gray">电影名称</p>
          <h3>{{info.projectName}}</h3>
        </div>
        <img :src="info.projectImage" alt="">
        <div class="l-flex-hc l-margin">
          <div class="l-rest">
            <p class="l-fs-xs l-text-gray">日期</p>
            <p>{{info.dateStr}}</p>
          </div>
          <div class="l-rest">
            <p class="l-fs-xs l-text-gray">场次</p>
            <p>{{info.timeStr}}</p>
          </div>
          <div class="l-rest">
            <p class="l-fs-xs l-text-gray">券码</p>
            <p>{{info.number}}</p>
          </div>
        </div>
        <div class="l-margin">
          <p class="l-fs-xs l-text-gray">影院地址</p>
          <p>{{info.address}}</p>
        </div>

        <div class="l-margin l-text-center">
          <div class="l-qrcode-img">
            <div class="canvas" ref="qrcode">
              <qrcanvas :options="qrcodeObj"></qrcanvas>
            </div>
            <img :src="qrcodeImg" alt="">
          </div>
          <p class="l-text-gray l-fs-s">(建议截图保存)</p>
        </div>

        <ul class="l-movie-remark">
          <li>电影票资源珍贵，请持票的您务必到场以免造成浪费，如果无法到场，可以将电子票截图赠送好友；</li>
          <li>向工作人员出示二维码即可领票入场；</li>
          <li>本活动最终解释权归贵州优视一号生物科技有限公司；</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Qrcanvas from 'qrcanvas-vue'

export default {
  components: {
    Qrcanvas
  },
  data () {
    return {
      qrcodeObj: {},
      qrcodeImg: '',
      info: {}
    }
  },
  methods: {
    getTicketInfo(ticketsId = '') {
      this.$mui.showWaiting()
      this.$server.movie.getTicketInfo({ticketsId}).then(({data})=>{
        if(data.usefulTime){
          let datetimeStr = data.usefulTime.split(' ')
          data.dateStr = datetimeStr[0]
          data.timeStr = datetimeStr[1].substring(0, datetimeStr[1].length - 3)
        }
        this.info = data


        this.qrcodeObj = Object.assign({}, {
          data: data.number,
          cellSize: 5,
          correctLevel: 'H',
          typeNumber: 5,
          logo: {
            fontFamily: 'Arial',
            size: 0.15,
            color: '#000',
            text: 'U视一号',
            clearEdges: 2,
            margin: 10
          },
          effect: {
            key: 'round', // image liquid round
            value: 0.2  
          }
        })

        this.$nextTick(()=>{
          this.qrcodeImg = this.convertToImage()
        })

      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    convertToImage(){
      const qrcodeCanvas = this.$refs.qrcode.children[0]
      if(!qrcodeCanvas) return ''

      const type = 'image/png'
      // let imageData = qrcodeCanvas.toDataURL(type).replace(type, 'image/octet-stream') || ''
      let imageData = qrcodeCanvas.toDataURL(type) || ''
      return imageData
    }
  },
  mounted() {
    this.getTicketInfo(this.$route.params.id)
  }
}
</script>
<style scoped lang="less">
.l-movie-quan{
  background: #fff; margin: 0.75rem; overflow: hidden;
  ._name{
    margin: 0.5rem 0.75rem;
  }
}

.l-movie-remark{
  font-size: 0.75rem; list-style: decimal; border-top: 1px dashed #ddd; padding-top: 0.75rem;
  padding-right: 0.75rem;
}
.l-qrcode-img{
  width: 8rem; height: 8rem; margin:0 auto; text-align: center; position: relative; z-index: 1; background: #fff; padding: 0.75rem;
  .canvas{display: none;}
  img{width: 100%; height: 100%;}
  &:after{
    content: '二维码生成中...'; position: absolute; left:0; right: 0; text-align: center; top: 50%; margin-top: -0.3rem;
    font-size: 0.6rem; color: #999; z-index: -1;
  }
}
</style>