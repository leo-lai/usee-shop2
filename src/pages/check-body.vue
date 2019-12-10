<template>
  <div class="l-page-group">
    <div class="l-page" id="page-question">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">体质检测问答</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div id="question-content" class="mui-content">
        <div class="l-padding-btn l-bg-white l-border-b" style="color:#64c4a8;">
          请根据您的感受和体验耐心作答<span class="l-text-gray l-fs-s">
          （共{{bodyQuestion.length}}题）</span>
        </div>
        <ul class="l-check-question l-margin-t">
          <li :id="'Q'+item.questionId" :class="{'_current':currentIndex == index, '_Q-slted': item.slted.score}" v-for="(item,index) in bodyQuestion" :key="item.questionId" @click="sltQuestion(index)">
            <div class="_hd">
              <span class="mui-pull-right l-fs-m _A-slted">{{item.slted.text}}</span>
              <b class="_dot"></b><span><i class="_index">{{item.questionSort}}</i>/{{bodyQuestion.length}}</span>
            </div>
            <div class="_Q">{{item.questionDescribe}}</div>
            <div class="_A" @click.stop="sltAnswer($event, index)">
              <span :class="{'_A-slted': item.slted.score == 2}" data-score="2">没有</span>
              <span :class="{'_A-slted': item.slted.score == 4}" data-score="4">很少</span>
              <span :class="{'_A-slted': item.slted.score == 6}" data-score="6">有时</span>
              <span :class="{'_A-slted': item.slted.score == 8}" data-score="8">经常</span>
              <span :class="{'_A-slted': item.slted.score == 10}" data-score="10">总是</span>
            </div>
          </li>
        </ul>
        <div class="l-margin l-text-center">
          <button type="button" :disabled="!canSubmit" class="mui-btn l-btn-main2" @click="submitAnswer">
            {{canSubmit ? '提交答案' : '请先完成答题'}}
          </button>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-result">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">检测结果</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" style="background-color:#fff; font-size:0.75rem;" v-if="mainBody">
        <div class="l-result-chart">
          <div class="l-text-center l-margin-b">
            <img width="60" src="~assets/images/sys-013.png" alt="">
            <p>检测结果</p>
          </div>
          <div class="_hd">
            <p class="l-text-gray l-fs-s">系统检测出您的主体质是：</p>
            <h3 class="l-fs-xl l-text-center" style="color:#ffbd2e; margin: 0.75rem 0;">{{mainBody.constitutionRemark}}</h3>
            <p class="l-fs-m" v-if="otherBody.length > 0">兼有{{otherBody.join('、')}}</p>
          </div>

          <!-- 体质分数柱形图 -->
          <div class="_bd" v-if="mainBody.constitutionScore > 0">
            <div class="l-chart-div">
              <div class="_chart">
                <div class="_item" v-for="item in bodyResult" :style="{ height: item.height + 'px'}">
                  <i>{{item.height}}</i>
                  <span>{{item.constitutionRemark.substring(0, mainBody.constitutionRemark.length-1)}}</span>
                </div>
              </div>
            </div>
            <p style="font-size:0.6rem; margin: 0.5rem 0; text-align:center; color:#ffbd2e;">分数越高 偏颇越重</p>
          </div>

          <!-- 脏腑图 -->
          <div class="_bd l-margin-t" v-if="visceraResult.length > 0">
            <p>根据体质辨识及瞳诊检测系统的综合判定，您的以下脏腑需要注意调理：</p>
            <div class="l-text-center" v-for="item in visceraResult">
              <img :src="item.image" alt="">
              <p style="color:#ffbd2e;">{{item.name}}</p>
            </div>
            <p class="l-text-gray l-fs-xs l-margin-t">
              注：如果眼球中出现的血丝或斑点呈鲜红状，则上述脏腑一般存在新病或急病；如果为淡黄色，则一般多为病情将愈；暗灰色则表示该脏腑气血不足；如果没有血丝，则根据体质情况上述脏腑需要注意调理；
            </p>
          </div>
        </div>
        
        <!-- 体质结果分析 -->
        <template v-if="mainBody.constitutionRemark && checkBodyData[mainBody.constitutionRemark]">
          <div class="l-reuslt-item">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-016.png" alt="">
              <p>结果分析</p>
            </div>
            <div class="_bd">
              <div class="_result">
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">{{mainBody.constitutionRemark}}的症状？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].symptom">{{item}}</li>
                    </ul>
                  </div>  
                </div>
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">{{mainBody.constitutionRemark}}究竟是什么意思？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].meaning">{{item}}</li>
                    </ul> 
                  </div>  
                </div>
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">{{mainBody.constitutionRemark}}的困扰？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].worry">{{item}}</li>
                    </ul> 
                  </div>  
                </div>
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">我为什么会是{{mainBody.constitutionRemark}}？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].why">{{item}}</li>
                    </ul>
                  </div>  
                </div>
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">哪些是{{mainBody.constitutionRemark}}最需要警惕？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].careful">{{item}}</li>
                    </ul> 
                  </div>  
                </div>
                <div class="_result-item"  @click="toggleShow($event)">
                  <div class="_hd">怎么改善？</div>
                  <div class="_bd">
                    <ul>
                      <li v-for="item in checkBodyData[mainBody.constitutionRemark].how">{{item}}</li>
                    </ul> 
                  </div>  
                </div>
              </div>
            </div>          
          </div>
        </template>
        
        <!-- 瞳诊结果分析 -->
        <template v-if="eyeResult.length > 0">
          <div class="l-reuslt-item">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-017.png" alt="">
              <p>日常护理</p>
            </div>
            <div class="_bd">
              <p>根据您的脏腑及体质情况，我们建议您应该多注意以下事项：</p>
              <div class="_result">
                <div class="_result-item" v-for="item in eyeResult" @click="toggleShow($event)">
                  <div class="_hd">有益于{{item.pupilsAreaName}}的建议</div>
                  <div class="_bd">
                    <p v-for="item2 in item.dailyNursing.split('|')">{{item2}}</p>
                  </div>  
                </div>
              </div>
            </div>          
          </div>
          <div class="l-reuslt-item">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-015.png" alt="">
              <p>食疗方案</p>
            </div>
            <div class="_bd">
              <p>为您推荐以下食疗方案，可以在平时饮食中进行搭配：</p>
              <div class="_result">
                <div class="_result-item" v-for="item in eyeResult" @click="toggleShow($event)">
                  <div class="_hd">有益于{{item.pupilsAreaName}}的食疗方案</div>
                  <div class="_bd">
                    <p v-for="item2 in item.dietTyerapy.split('|')">{{item2}}</p>
                  </div>  
                </div>
              </div>
            </div>          
          </div>
        </template>
        
        <!-- 推荐商品 -->
        <div class="l-result-goods" style="margin-top: -1rem;">
          <p class="l-text-gray">推荐商品</p>
          <div class="l-zoom" v-if="eyeResult.length > 0">
            <img class="l-fl" style="width:5rem; margin:0.75rem 0.75rem 0 0;" :src="goods[eyeResult[0].pupilsSymptomuId-1].image" alt="">
            <h3 class="l-margin-tb">{{goods[eyeResult[0].pupilsSymptomuId-1].name}}</h3>
            <p class="l-text-gray">预购热线：<br>400-180-6900</p>
          </div>
          <div class="l-zoom" v-else-if="mainBody.constitutionRemark && checkBodyData[mainBody.constitutionRemark]">
            <img class="l-fl" style="width:5rem; margin:0.75rem 0.75rem 0 0;" :src="checkBodyData[mainBody.constitutionRemark].goods.image" alt="">
            <h3 class="l-margin-tb">{{checkBodyData[mainBody.constitutionRemark].goods.name}}</h3>
            <p class="l-text-gray">预购热线：<br>400-180-6900</p>
          </div>
        </div>

        <div style="margin:1rem;">
          <button type="button" class="mui-btn l-btn-main2" @click="checkAgain">再次检测</button>
          <button type="button" class="mui-btn l-btn-white l-margin-t" @click="checkBack">返回</button>
          <p class="l-fs-xs l-text-center l-text-gray l-margin-t">检测结果仅供参考，请以医院检查结果为准</p>
        </div>
      </div>
      <div class="mui-content l-text-center" style="background-color:#fff;" v-else>
        <br> <br> <br>
        <div>当前没有检测结果</div>
        <br>
        <button type="button" class="mui-btn l-btn-main2" style="width: 50%; margin: auto;" @click="checkAgain">去检测</button>
        <br> <br> <br> 
      </div>
    </div>
  </div>
  
</template>
<script>
import VueScrollTo from 'vue-scrollto'
import checkBodyData from 'assets/js/check-body-data'

const options = {
  container: '#question-content',
  easing: 'ease-in',
  offset: -300,
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
      checkBodyData,
      currentIndex: 0,
      bodyQuestion: [],
      eyeResult: [],
      bodyResult: [],
      visceraResult: [],
      goods: [
        {
          areaIndex: 1,
          name: 'U-1',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 2,
          name: 'U-3',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion3.jpg'
        },{
          areaIndex: 3,
          name: 'U-2',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion2.jpg'
        },{
          areaIndex: 4,
          name: 'U-5',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion5.jpg'
        },{
          areaIndex: 5,
          name: 'U-1',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 6,
          name: 'U-6',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion6.jpg'
        },{
          areaIndex: 7,
          name: 'U-4',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 8,
          name: 'U-4',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 9,
          name: 'U-7',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion7.jpg'
        },{
          areaIndex: 10,
          name: 'U-5',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion5.jpg'
        },{
          areaIndex: 11,
          name: 'U-1',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 12,
          name: 'U-4',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 13,
          name: 'U-8',
          image: 'http://qiniu.ushiyihao.com/mall/recommend/potion8.jpg'
        }
      ],
      viscera: [
        {
          index: 1,
          name: '心脏',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/xin.jpg'
        },
        {
          index: 2,
          name: '肝脏',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/gan.jpg'
        },
        {
          index: 3,
          name: '脾脏',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/pi.jpg'
        },
        {
          index: 4,
          name: '肺',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/fei.jpg'
        },
        {
          index: 5,
          name: '肾脏',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/shen.jpg'
        },
        {
          index: 6,
          name: '胆',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/dan.jpg'
        },
        {
          index: 7,
          name: '胃',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/wei.jpg'
        },
        {
          index: 8,
          name: '小肠',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/xiaochang.jpg'
        },
        {
          index: 9,
          name: '大肠',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/dachang.jpg'
        },
        {
          index: 10,
          name: '上焦(咽喉至胸膈部分)',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/shangjiao.jpg'
        },
        {
          index: 11,
          name: '中焦(上腹腔部分)',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/zhongjiao.jpg'
        },
        {
          index: 12,
          name: '下焦(下腹腔部分)',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/xiajiao.jpg'
        },
        {
          index: 13,
          name: '膀胱',
          image: 'http://qiniu.ushiyihao.com/mall/eye/organ/pangguang.jpg'
        }
      ]
    }
  },
  computed: {
    canSubmit() {
      return this.bodyQuestion.every((item)=>{
        return item.slted.score > 0
      })
    },
    mainBody() {
      return this.bodyResult.find((item)=>{
        return item.isTop
      })
    },
    otherBody() {
      let _other = []
      this.bodyResult.every((item)=>{
        if(!item.isTop){
          _other.push(item.constitutionRemark)
        }
        return true
      })
      return _other
    }
  },
  methods: {
    scrollTo(idOrClass) {
      VueScrollTo.scrollTo(document.querySelector(idOrClass), 300, options)
    },
    toggleShow(e) {
      if(e.currentTarget.classList.contains('_show')){
        e.currentTarget.classList.remove('_show')
      }else{
        e.currentTarget.classList.add('_show')
      }
    },
    getBodyQuestion() {
      this.bodyQuestion = this.$storage.session.get('bodyQuestion') || []
      if(this.bodyQuestion.length === 0){
        this.$mui.showWaiting()
        return this.$server.check.bodyQuestion().then(({data})=>{
          data.agentInfos = data.agentInfos.map((item)=>{
            item.slted = {
              score: '',
              text: ''
            }
            return item
          })
          this.bodyQuestion = data.agentInfos
        }).finally(()=>{
          this.$mui.hideWaiting()
        })
      }
    },
    sltQuestion(index) {
      this.currentIndex = index
      if(this.bodyQuestion[index]){
        this.scrollTo('#Q' + this.bodyQuestion[index].questionId)
      }
    },
    sltAnswer(e, index) {
      if(e.target.tagName.toLocaleUpperCase() === 'SPAN'){
        let score = Number(e.target.dataset.score)
        let text = e.target.innerText

        this.bodyQuestion[index].slted = {
          score, text
        }

        this.$storage.session.set('bodyQuestion', this.bodyQuestion)
        this.sltQuestion( Math.min(this.currentIndex + 1, 30) )
      }
    },
    checkBack() {
      this.$router.back()
      // this.$link('/', 'page-out', 'replace')
      // this.$storage.session.remove('eyeImages')
      // this.$storage.session.remove('leftZzData')
      // this.$storage.session.remove('rightZzData')
      // this.$storage.session.remove('bodyQuestion')
    },
    checkAgain() {
      this.$link('/check/eye', 'page-out', 'replace')
      this.$storage.session.remove('eyeImages')
      this.$storage.session.remove('leftZzData')
      this.$storage.session.remove('rightZzData')
      this.$storage.session.remove('bodyQuestion')
    },
    resultFormat(data = []) {
      let _top = data.find((item)=>{
        return item.isTop
      })

      data = data.map((item)=>{
        item.height = Math.floor( Math.min(100 / _top.constitutionScore, 1) * item.constitutionScore)
        return item
      })

      return data
    },
    submitAnswer() {

      let formData = {
        answers: [],
        pupilsProblem: []
      }

      // 瞳诊参数
      let leftZzData = this.$storage.session.get('leftZzData') || []
      let rightZzData = this.$storage.session.get('rightZzData') || []

      let eachZzData = leftZzData.length > rightZzData.length ? leftZzData : rightZzData

      let mergeZzData = eachZzData.map((item, index)=>{
        return Object.assign([], leftZzData[index], rightZzData[index]).filter((_item)=>{
          return !!_item
        })
      })
      console.log(mergeZzData)
      mergeZzData.every((item, index)=>{
        if(item.length > 0){
          formData.pupilsProblem.push({
            pupilsAreaNum: index+1,
            description: item.join(',')
          })  
        }
        return true
      })
      formData.pupilsProblem = window.JSON.stringify(formData.pupilsProblem)
      
      // 体质参数
      let bodyQuestion = this.$storage.session.get('bodyQuestion') || []

      bodyQuestion.forEach((item)=>{
        formData.answers.push({
          score: item.slted.score,
          type: item.questionType
        })
      })
      formData.answers  = window.JSON.stringify(formData.answers)


      this.$mui.showWaiting('系统检测中...')
      this.$server.check.getResult(formData).then(({data})=>{
        let data1 = data.pupilsSymptomResult, data2 = this.resultFormat(data.constitutionResult)
        data1.length = Math.min(2, data1.length)
        this.visceraResult = []
        if(data1.length > 0){
          this.visceraResult[0] = this.viscera.find((item)=>item.name === data1[0].pupilsAreaName)
          data1[1] && (this.visceraResult[1] = this.viscera.find((item)=>item.name === data1[1].pupilsAreaName))
        }else if(data2.length > 0){
          let mainBody = data2.find((item)=>{
            return item.isTop
          })
          if(this.checkBodyData[mainBody.constitutionRemark].viscera.length > 0){
            this.visceraResult[0] = this.viscera[this.checkBodyData[mainBody.constitutionRemark].viscera[0]-1]
            this.visceraResult[1] = this.viscera[this.checkBodyData[mainBody.constitutionRemark].viscera[1]-1]  
          }
        }
        this.eyeResult = data1
        this.bodyResult = data2

        this.$pageTo('#page-result', '检测结果', 'replace')

        this.$storage.session.remove('eyeImages')
        this.$storage.session.remove('leftZzData')
        this.$storage.session.remove('rightZzData')
        this.$storage.session.remove('bodyQuestion')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.getBodyQuestion()
  }
}
</script>
<style scoped lang="less">
.l-Q-item{
  margin-bottom: 0.75rem; 
  ._hd{
    h3{display: inline-block; padding: 0.25rem 3rem 0.25rem 0.75rem; background: #64c4a8; border-radius: 0 1rem 1rem 0; color: #fff;}
  }
  ._hd:after{
    content: ''; display: inline-block; vertical-align: -0.1rem; border: 0.25rem solid transparent; border-top-color: #fff; margin-left: -1.4rem;
    transform: rotate(0); 
    transform-origin: 50% 25%;
  }
  ._bd{overflow: hidden; height: 0;}
  li{font-size: 0.75rem; margin-bottom: 0.5rem;padding-right: 0.75rem;}
}
.l-Q-item._show {
  ._hd:after{transform: rotate(180deg);}
  ._bd{height: auto !important;}
} 

._start-btn{
  border-radius: 50%; border: 1px solid #64c4a8; 
  box-shadow: inset 0 0 0 2px #fff, 0 0 5px 1px #64c4a8;
  width: 4rem; height: 4rem; background: #64c4a8; color: #fff; 
}
._start-btn:active{
  background: #64c4a8;
  box-shadow: inset 0 0 0 2px #fff, 0 0 5px 1px #64c4a8, 0 0 25px 1px #64c4a8;
}
.l-check-question{
  list-style: none; padding: 0;
  li{
    padding: 0.5rem 0.75rem 0.5rem 2rem; position: relative;
    ._hd{
      color: #999; 
      ._dot{
        display: inline-block; width:0.66rem; height: 0.66rem; border-radius: 50%; background-color: #ccc; 
        margin-left: -1.28rem; margin-right: 0.5rem; 
      }
      ._A-slted{
        display: none; margin-top: 0.1rem;
      }
    }
    ._Q{color: #999; font-size: 0.75rem;}
    ._A{
      overflow: hidden; margin-left: -1.4rem; padding-bottom: 0.5rem; display: none; position: relative; z-index: 1;
      margin-right: -0.75rem;
      span{
        float: left; text-align: center; font-size: 0.75rem; margin: 0.5rem 0.75rem 0 0 ;
        width: 2.6rem; height: 2.6rem; line-height: 2.6rem; border-radius: 50%; border: 0.025rem solid #ccc;
      }
      span._A-slted{
        color: #fff; border-color: #64c4a8;
        background: url(~assets/images/questionCheck.png) no-repeat 50% 50%; background-size: 100% 100%; 
      }
    }
  }
  li:before{
    content: ''; position: absolute; top: 1.65rem; bottom: -0.55rem; left: 1rem; border-left: 0.025rem solid #ccc;
  }
  li:last-child:before, li._Q-slted:before, li._current:before{
    display: none;
  }
  li._Q-slted{
    background: #fff; border-bottom: 0.025rem dashed #efeff4;
    ._hd{
      ._A-slted{
        display: block;
        color: #64c4a8;
      }  
    }
  }
  li._current{
    background: #fff;
    ._hd{
      ._dot{
        background-color: #64c4a8; width: 0.8rem; height: 0.8rem; vertical-align: 0.05rem;
      }
      ._index{
        color: #64c4a8; font-size: 1.2rem;
      }
      ._A-slted{
        display: none;
      }  
    }
    ._A{display: block;}
    ._Q{font-weight: 500; color: #333; font-size: 1rem; margin-left: -1.4rem;}
  }
}

.l-chart-div{
  margin: 0 1rem;
  ._chart{
    background: linear-gradient(180deg, transparent 19px, rgba(255, 188, 46, 0.3) 20px); background-size: 100% 20px;
    width: 100%; height: 100px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 0.25rem; margin:1.4rem 0;
    ._item{
      width: 10%; max-width: 1rem; height: 0; flex:1; background: #ffbc2e; margin: 0 2%;
      border-radius: 3px 3px 0 0; position: relative; 
      i{
        position: absolute; background: #5dd76f; color: #fff; font-size: 0.55rem; border-radius: 3px; min-width: 1.2rem; text-align: center;
        top: -1.2rem; padding:3px 2px; line-height: 1; z-index: 1;left: 50%; transform: translateX(-50%);
      }
      i:after{
        position: absolute; bottom: -1px; content: ''; width: 0.5rem; height: 0.5rem; background: #5dd76f; transform: rotate(45deg); z-index: -2; left: 50%; margin-left: -0.25rem; 
      }
      span{
        position: absolute; bottom: -1rem; font-size: 0.55rem; white-space: nowrap; left: 50%; transform: translateX(-50%);
      }
    }  
  }
}
.l-result-chart{
  background:#fff; padding: 1rem; border-radius: 0.5rem;
}
.l-result-suggest{
  background:#fff; padding:0.5rem 1rem; margin: 1rem; border-radius: 0.5rem;
  ._item{margin: 0.5rem 0;}
  ._hd{
    position: relative; padding-right: 1rem;
  }
  ._hd:after{
    font-family: Muiicons; transition: all 0.5s;
    content: '\E583';  position: absolute;  right: 0; 
  }
  ul{
    display: none; padding-left: 1rem; font-size: 0.75rem; color: #888; margin: 0.25rem 0;
  }
  ._show{
    ul{display: block;}
    ._hd:after{
      transform: rotate(90deg); 
    }
  }
}
.l-result-goods{
  background:#fff; padding:0.5rem 1rem; margin: 1rem; border-radius: 0.5rem;
}

.l-reuslt-item{
  margin: 1rem; font-size: 0.75rem; padding-bottom: 0.75rem;
  >._hd{
    text-align: center; margin-bottom: 1rem;
  }
  ._result{
    background: #efefef; padding: 0.25rem 0.75rem; border-radius: 0.25rem; margin: 0.5rem 0;
    p{margin:0.5rem 0; font-size: 0.75rem;}
  }
  ._result-item{
    background: #fff; border-radius: 5px; margin: 0.5rem 0; padding: 0 0.5rem;
    ._hd{position: relative; padding:0.5rem 1rem 0.5rem 0; }
    ._hd:after{
      font-family: Muiicons; transition: all 0.5s;
      content: '\E583';  position: absolute;  right: 0; 
    }
    p{margin:0.25rem 0;}
    ul{padding-left: 1rem; font-size: 0.75rem; color: #888; margin: 0.25rem 0;}
    ._bd{display: none; padding: 0.25rem 0;}
  }
  ._result-item._show{
    ._hd:after{
      transform: rotate(90deg); 
    }
    ._bd{display: block; border-top: 1px dashed #efefef;}
  }
}
</style>