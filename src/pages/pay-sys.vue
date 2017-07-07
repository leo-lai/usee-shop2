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
            <select v-model="form.payWay">
              <option :value="item.value" v-for="item in data.payWay">{{item.label}}</option>
            </select>
            <span>{{payText}}</span>
          </div>
        </div>
        <div class="l-margin">
          <button type="button" class="mui-btn l-btn-main2" @click="pay">收款</button>
        </div>
        <p class="l-text-gray l-fs-m l-text-center">历史收款记录</p>
        <br>
      </div>
    </div>
    <div class="l-page" id="page-qr">
      
    </div>
    <number-keyboard ref="numberKeyboard"></number-keyboard>
  </div>
</template>
<script>
import NumberKeyboard from 'components/number-keyboard'

export default {
  components: {
    NumberKeyboard
  },
  data () {
    return {
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
            label: '小U资格费'
          },{
            slted: false,
            label: '合伙人资格费'
          },{
            slted: false,
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
    }
  },
  methods: {
    showKeyboard(input) {
      this.$refs.numberKeyboard.$emit('$keyboard:show', input)
    },
    sltRemark(item) {
      item.slted = !item.slted
    },
    pay() {
      if(this.form.channel === 'unline'){
        this.$mui.confirm('本次收款选择POS机刷卡，请确认是否已收到款项，再点击"转账成功"操作。', '', ['取消', '转账成功'], (e)=>{
          if(e.index == 1){

          }
        })  
      }else{
        this.form.amount = Number(this.payMoney)
        if(Number.isNaN(this.form.amount) || this.form.amount <= 0){
          this.$mui.toptip('请输入收款金额')
          this.showKeyboard(this.$refs.payMoney)
          return
        }
      }
    }
  },
  mounted() {
    this.$refs.numberKeyboard.$on('$keyboard:input', (val)=>{
      this.payMoney = val
    })
  }
}
</script>
<style scoped lang="less">

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