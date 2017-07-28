<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" id="questionnaire">
        <div class="l-text-center">
          <img src="~assets/images/questionnaire-banner1.jpg" alt="">
        </div>
        <ul class="l-q-list" id="q-list">
          <li v-for="(item,index) in list" class="q-item">
            <div class="_hd"><h3>{{index+1}}、{{item.problemSubject}}</h3></div>
            <div class="_bd">
              <template v-if="item.isMultiselect">
                <div class="mui-table-view-cell mui-checkbox mui-left" v-for="item2 in item.answers">
                  <input :name="'checkbox' + item.problemId" :value="item2.answerId" type="checkbox">{{item2.answerSubject}}
                </div>
              </template>
              <template v-else>
                <div class="mui-table-view-cell mui-radio mui-left" v-for="item2 in item.answers">
                  <input :name="'radio'+ item.problemId"  :value="item2.answerId" type="radio">{{item2.answerSubject}}
                </div>
              </template>
            </div>
          </li>
        </ul>
        <div class="_address">
          <p>恭喜您完成调查问卷，留下您的联系方式和收货地址将会有工作人员寄出原价28元的眼贴一份作为赠礼。</p>
          <div>
            <input type="text" maxlength="20" placeholder="请输入您的姓名" v-model="form.userGiveName">
          </div>
          <div>
            <input type="tel" maxlength="11" placeholder="请输入您的手机号码" v-model="form.userGivePhone">
          </div>
          <div>
            <textarea cols="3" maxlength="100" placeholder="请输入您的收货地址" v-model="form.userGiveAddress"></textarea>
          </div>
          <div>
            <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交</button>
            <p class="l-text-gray l-fs-xs l-text-center l-margin-t">本活动最终解释权归贵州优视一号生物科技有限公司所有</p>
          </div>
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
          <br><br> 
          <img src="~assets/images/questionnaire-success.png" alt="">
          <br><br>
          <img style="width: 10rem;" src="~assets/images/ubaby-qr.jpg" alt="">
          <p>关注公众号了解更多惊喜</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueScrollTo from 'vue-scrollto'

const options = {
  container: '#questionnaire',
  easing: 'ease-in',
  offset: 0,
  onDone: function() {
    // scrolling is done
  },
  onCancel: function() {
    // scrolling has been interrupted
  }
}

export default {
  data () {
    return {
      list: [],
      submiting: false,
      form: {
        projectId: '',
        answerIds: '',
        userGiveAddress: '',
        userGiveName: '',
        userGivePhone: ''
      }
    }
  },
  methods: {
    submit() {
      let qList = Array.from(document.querySelectorAll('.q-item'))
      let answerIds = []
      let firstError = null
      qList.forEach((item)=>{
        let aList = Array.from(item.querySelectorAll('input'))
        let slted = false
        aList.forEach((item2)=>{
          if(item2.checked){
            slted = true
            answerIds.push(item2.value)
          }
        })

        if(!slted){
          item.classList.add('_error')
          if(!firstError) {
            firstError = item
          }
        }else{
          item.classList.remove('_error')
        }
      })

      if(firstError){
        VueScrollTo.scrollTo(firstError, 300, options)
        return
      }

      if(!this.form.userGiveName){
        this.$mui.toptip('请输入您的姓名')
        return
      }

      if(!this.form.userGivePhone){
        this.$mui.toptip('请输入您的手机号码')
        return
      }

      if(!this.form.userGiveAddress){
        this.$mui.toptip('请输入您的收货地址')
        return
      }

      this.form.answerIds = answerIds.join(',')

      this.submiting = true
      this.$mui.showWaiting('提交中')
      this.$server.submitQuestionnaire(this.form).then(()=>{
        this.share().finally(()=>{
          this.$pageTo('#page-result', '问卷调查')  
        })
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    },
    share() {
      let that = this
      let imgUrl = that.$utils.image.thumb('http://opii7iyzy.bkt.clouddn.com/mall/active/poster.jpg', 100, 100)
      return that.$server.wxShare({
        title: '送份眼贴给你',
        desc: '刚刚答题得了个28元的眼贴，超简单，你也快去领一份吧！',
        link: that.$server.getHost() + '/questionnaire/' + that.form.projectId,
        imgUrl: imgUrl,
        success(res) {
          that.$mui.toast('分享成功')
        }
      })
    }
  },
  mounted() {
    const that = this
    that.$mui.showWaiting()
    that.$server.getQuestionnaire(that.$route.params.id).then(({data})=>{
      that.list = data.problems
      that.form.projectId = data.projectId
    }).finally(()=>{
      that.$mui.hideWaiting()
      this.share()
    })
  }
}
</script>
<style scoped lang="less">
.l-q-list{
  margin:0; padding: 0; list-style: none;
  ._hd{
    padding: 0.5rem 0.75rem; 
  }
  ._bd{
    background: #fff;
  }

  ._error{
    ._bd{background: #ffe7e7;}
  }
}
.mui-table-view:before, .mui-table-view:after, .mui-table-view-cell:after{
  background-color: #f8f8f8;
}
._address{
  padding: 1rem; background: #eff4fa;
  input, textarea{
    border:none; border-radius: 0; margin: 0.5rem 0;
  }
}
</style>