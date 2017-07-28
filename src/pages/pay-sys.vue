<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-panel-pay">
          <p class="l-text-gray l-fs-m">收款金额</p>
          <div class="_ipt _ipt2 l-flex-hc l-border-b">
            <b class="l-icon l-fs-xl" style="margin-right:0.75rem;">&#xe6cb;</b>
            <div class="l-rest">
              <span v-show="!payMoney">点击这里输入收款金额</span>
              <input ref="payMoney" v-model="payMoney" readonly @click="showKeyboard($event.target)" placeholder="">  
            </div>
          </div>
          <p class="l-text-gray l-fs-m" style="margin-top:2rem;">收款备注</p>
          <ul class="_mark">
            <li v-for="item in data.remark" :class="{'_active': item.slted}" @click="sltRemark(item)">{{item.label}}</li>
          </ul>
          <div class="_ipt l-border-b" style="padding: 0.5rem 0;">
            <input type="text" v-model="form.remarks" maxlength="500" style="margin:0;font-size:0.75rem;" placeholder="如还需其它备注，请点击这里输入">
          </div>

          <p class="l-text-gray l-fs-m" style="margin-top:2rem;">支付方式</p>
          <div class="_slt">
            <select v-model="form.channel">
              <option :value="item.value" v-for="item in data.payWay">{{item.label}}</option>
            </select>
            <span>{{payText}}</span>
          </div>
        </div>
        <div class="l-margin">
          <button type="button" class="mui-btn l-btn-main2" @click="pay">收款</button>
        </div>
        <p class="l-text-gray l-fs-m l-text-center" @click="$link('/pay/sys/record', 'page-in')">历史收款记录</p>
        <br>
      </div>
    </div>
    <div class="l-page" id="page-qr">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">收款二维码</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" style="padding:1rem;text-align:center;" :class="payWayClass.cls">
        <br> <br>
        <h3 class="l-margin l-fs-l">本次支付金额：{{form.amount | currency}}元</h3>
        <div class="l-qrcode-img">
          <div class="canvas" ref="qrcode">
            <qrcanvas :options="qrcodeObj"></qrcanvas>
          </div>
          <img :src="qrcodeImg" alt="">
        </div>
        <p class="l-margin">打开{{payWayClass.text}}[扫一扫]</p>
        <p class="l-fs-s">客户扫码支付结果将通过公众号消息推送通知</p>
      </div>
    </div>
    <number-keyboard ref="numberKeyboard"></number-keyboard>
  </div>
</template>
<script>
import NumberKeyboard from 'components/number-keyboard'
import Qrcanvas from 'qrcanvas-vue'

let logo = require('assets/images/logo.jpg')
export default {
  components: {
    NumberKeyboard, Qrcanvas
  },
  data () {
    return {
      qrcodeObj: {},
      qrcodeImg: '',
      data: {
        payWay: [
          {
            value: 'wx_pub_qr',
            label: '微信支付'
          },{
            value: 'alipay_qr',
            label: '支付宝支付'
          },{
            value: 'pos',
            label: 'POS机刷卡'
          }
        ],
        remark: [
          {
            slted: false,
            value: 1,
            label: '小U资格费'
          },{
            slted: false,
            value: 2,
            label: '合伙人资格费'
          },{
            slted: false,
            value: 3,
            label: '购买商品'
          }
        ]
      },
      payMoney: '',
      form: {
        amount: 0,
        channel: 'wx_pub_qr',
        purpose: '',
        remarks: ''
      }
    }
  },
  computed: {
    payText() {
      let _temp = this.data.payWay.filter(item=>item.value === this.form.channel)
      return _temp.length > 0 ? _temp[0].label : '请选择'
    },
    payWayClass() {
      let _payWayClass = {
        cls: '',
        text: 'App'
      }
      _payWayClass.cls = 'l-' + this.form.channel
      if(this.form.channel === 'wx_pub_qr'){
        _payWayClass.text = '微信'
      }else if(this.form.channel === 'alipay_qr'){
        _payWayClass.text = '支付宝'
      }
      return _payWayClass
    }
  },
  methods: {
    showKeyboard(input) {
      this.$refs.numberKeyboard.$emit('$keyboard:show', input)
    },
    sltRemark(item) {
      item.slted = !item.slted
      let _purpose = []
      this.data.remark.map((item)=>{
        if(item.slted){
          _purpose.push(item.label)
        }
      })

      this.form.purpose = _purpose.join(',')
    },
    pay() {
      this.form.amount = Number(this.payMoney)
      if(Number.isNaN(this.form.amount) || this.form.amount <= 0){
        this.$mui.toptip('请输入收款金额')
        this.showKeyboard(this.$refs.payMoney)
        return
      }

      if(!this.form.purpose){
        this.$mui.toptip('请选择收款备注')
        return 
      }

      if(this.form.channel === 'pos'){
        this.$mui.confirm('本次收款选择POS机刷卡，请确认是否已收到款项，再点击"转账成功"操作。', '', ['取消', '转账成功'], (e)=>{
          if(e.index == 1){
            this.paySubmit()
          }
        })
      }else{
        this.paySubmit()
      }
    },
    paySubmit() {
      this.$mui.showWaiting()
      this.$server.pay.getPayCode(this.form).then(({data})=>{
        if(this.form.channel === 'pos'){
          this.$mui.toast('转账成功')
          this.$link('/pay/sys/record', 'page-in')
        }else{
          if(data && data.credential){
            this.$storage.session.set('payData', data)
            this.payData = data
            this.createQrcode()
            this.$pageTo('#page-qr', '收款二维码')  
          }else{
            this.$mui.toast('系统生成支付二维码失败，请稍后重试！')
          }
        }
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
    },
    createQrcode(imageData) {
      const self = this
      let promise = new Promise((resolve)=>{
        let logoImage = new Image()
        logoImage.onload = function(){
          resolve(logoImage)
        }
        logoImage.onerror = function(){
          resolve('') 
        }
        logoImage.src = imageData
      })

      promise.then((logoImage)=>{
        self.qrcodeObj = Object.assign({}, {data: self.payData.credential[self.form.channel]}, {
          // data: 'HTTPS://QR.ALIPAY.COM/FKX01574I6OXQSMR8CDM4F',
          cellSize: 5,
          correctLevel: 'H',
          typeNumber: 5,
          logo: {
            image: logoImage,
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

        self.$nextTick(()=>{
          self.qrcodeImg = self.convertToImage()
        })
      })
    }
  },
  mounted() {
    this.$refs.numberKeyboard.$on('$keyboard:input', (val)=>{
      this.payMoney = val
    })

    let payData = this.$storage.session.get('payData')
    if(payData){
      this.payData = payData
      this.createQrcode()
    }
  }
}
</script>
<style scoped lang="less">
.l-alipay_qr{color: #fff; background: #019fe8 url(~assets/images/alipay-logo.jpg) no-repeat 50% bottom; background-size: 100%; }
.l-wx_pub_qr{color: #fff; background: #22ab39 url(~assets/images/wxpay-logo.jpg) no-repeat 50% bottom; background-size: 100%; }

.l-qrcode-img{
  width: 10rem; height: 10rem; margin:0 auto; text-align: center; position: relative; z-index: 1; background: #fff; padding: 0.75rem;
  .canvas{display: none;}
  img{width: 100%; height: 100%;}
  &:after{
    content: '二维码生成中...'; position: absolute; left:0; right: 0; text-align: center; top: 50%; margin-top: -0.3rem;
    font-size: 0.6rem; color: #999; z-index: -1;
  }
}

.l-panel-pay{
  margin: 0.75rem; background-color: #fff; padding: 1rem;
  ._ipt2{
    input::-webkit-input-placeholder{
      /* font-size: 0.85rem; */ color: #333;
      transform: translate3d(0, 0, 0) scale(0.6); 
      transform-origin: 0 50%; 
    }  
  }
  ._ipt{
    padding: 0.75rem 0; position: relative; z-index: 0;
    input{
      width: 100%; margin:0; padding: 0; background-color: transparent;
      border:none;  font-size: 1.6rem; line-height: 1;  position: relative; z-index: 2;
    }
    
    span{
      position: absolute; top:1.2rem; left: 2.25rem; color: #333; pointer-events: none; z-index: -1;
    }
  }
  ._slt{
    padding: 1rem; text-align: center; position: relative;
    select{
      margin:0; padding: 0; position: absolute; left: 0; top:0; height: 100%; width: 100%; opacity: 0;
    }
    span:after{
      content: ''; display: inline-block; width: 0; height: 0; border: 0.4rem solid transparent; border-top-color: #999;
      vertical-align: middle; margin:0 0 -0.25rem 0.5rem; 
    }
  }
  ._mark{
    list-style: none; margin: 0.5rem -0.25rem 0; padding: 0; font-size: 0.7rem; 
    li{display: inline-block; border: 1px solid #333; margin: 0.25rem; padding:0.25rem 0.5rem; border-radius: 2px; overflow: hidden;}
    li._active{
      border-color: #64c4a8; position: relative; 
    }
    li._active:after{
      content: '\e667'; font-family: 'l-iconfont'; position: absolute; right: -1px; bottom: -3px; line-height: 1; color: #64c4a8;
    }
  }
}
</style>