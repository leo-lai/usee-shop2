<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-bg-white l-margin-b">
          <div class="l-flex-hc l-padding-btn l-border-b">
            <h3 class="l-rest">中医体质检测</h3>
          </div>
          <div>
            <img src="~assets/images/layout-005.jpg" alt="">
          </div>
        </div>

        <div class="l-bg-white" style="padding: 1rem 0;">
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>什么是体质？</h3></div>
            <div class="_bd">
              <ul>
                <li>“体”，指身体，“质”为性质、本质。是机体因为脏腑、经络、气血、阴阳等的盛衰偏颇而形成的素质特征。</li>
                <li>中国人可分为9种基本体质类型，即平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质和特禀质。</li>
              </ul>
            </div>
          </div>
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>体质检测有什么用？</h3></div>
            <div class="_bd">
              <ul>
                <li>体质检测可以知晓身体状况，分析预防疾病的发生。</li>
                <li>获得个性化调理体质方案，针对性改善和增强自身的免疫能力。</li>
              </ul>
            </div>
          </div>
          <br>
          <div class="l-text-center">
            <button class="_start-btn" @click="$pageTo('#page-question', '体质检测问答')">开始<br>检测</button>
          </div>
          <br>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-question">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">体质检测问答</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div id="question-content" class="mui-content">
        <div class="l-padding-btn l-bg-white l-border-b" style="color:#64c4a8;">
          请根据您的感受和体验耐心填写<span class="l-text-gray l-fs-s">
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
        <h1 class="mui-title">体质检测结果</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-result-chart">
          <div class="_hd">
            <p class="l-text-gray l-fs-s">系统检测出您的主体质是：</p>
            <h3 class="l-fs-xl l-text-center" style="color:#ffbd2e; margin: 0.75rem 0;">{{mainBody.constitutionRemark}}</h3>
            <p class="l-fs-m" v-if="otherBody.length > 0">兼有{{otherBody.join('、')}}</p>
            <p class="l-text-center l-fs-m" v-else-if="mainBody.constitutionScore == 0">恭喜您处于身心和谐状态，请努力保持。</p>
          </div>
          <div class="_bd" v-if="mainBody.constitutionScore > 0">
            <div class="l-chart-div">
              <div class="_chart">
                <div class="_item" v-for="item in checkResult" :style="{ height: item.height + 'px'}">
                  <i>{{item.height}}</i>
                  <span>{{item.constitutionRemark.substring(0, mainBody.constitutionRemark.length-1)}}</span>
                </div>
              </div>
            </div>
            <p style="font-size:0.6rem; margin: 0.5rem 0; text-align:center; color:#ffbd2e;">分数越高 偏颇越重</p>
          </div>
        </div>
        
        <template v-if="mainBody.constitutionRemark && checkBodyData[mainBody.constitutionRemark]">
          <div class="l-result-suggest">
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">{{mainBody.constitutionRemark}}的症状</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].symptom">{{item}}</li>
              </ul>  
            </div>
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">{{mainBody.constitutionRemark}}究竟是什么意思？</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].meaning">{{item}}</li>
              </ul> 
            </div>
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">{{mainBody.constitutionRemark}}的困扰</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].worry">{{item}}</li>
              </ul> 
            </div>
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">我为什么会{{mainBody.constitutionRemark}}？</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].why">{{item}}</li>
              </ul> 
            </div>
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">哪些是{{mainBody.constitutionRemark}}最需要警惕？</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].careful">{{item}}</li>
              </ul> 
            </div>
            <div class="_item" @click="toggleShow($event)">
              <div class="_hd">怎么改善？</div>
              <ul>
                <li v-for="item in checkBodyData[mainBody.constitutionRemark].how">{{item}}</li>
              </ul> 
            </div>
          </div>

          <div class="l-result-goods">
            <p class="l-text-gray">推荐商品</p>
            <div class="l-zoom">
              <img class="l-fl" style="width:5rem; margin:0.75rem 0.75rem 0 0;" :src="checkBodyData[mainBody.constitutionRemark].goods.image" alt="">
              <h3 class="l-margin-tb">{{checkBodyData[mainBody.constitutionRemark].goods.name}}</h3>
              <p class="l-text-gray">预购热线：<br>400-180-6900</p>
            </div>
          </div>
        </template>

        <div style="margin:1rem;">
          <button type="button" class="mui-btn l-btn-main2" @click="checkAgain">再次检测</button>
        </div>
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
      checkResult: []
    }
  },
  computed: {
    canSubmit() {
      return this.bodyQuestion.every((item)=>{
        return item.slted.score > 0
      })
    },
    mainBody() {
      return this.checkResult.find((item)=>{
        return item.isTop
      }) || {}
    },
    otherBody() {
      let _other = []
      this.checkResult.every((item)=>{
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
        this.sltQuestion( Math.min(this.currentIndex + 1, 30) )
      }
    },
    checkAgain() {
      this.$mui.showWaiting()
      this.getBodyQuestion().then(()=>{
        this.$pageTo('#page-question', '体质检测问答', 'replace')
        setTimeout(()=>{
          this.scrollTo('#Q' + this.bodyQuestion[0].questionId)
        }, 500)
      })
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
        answers: []
      }

      this.bodyQuestion.forEach((item)=>{
        formData.answers.push({
          score: item.slted.score,
          type: item.questionType
        })
      })

      formData.answers  = window.JSON.stringify(formData.answers)

      this.$mui.showWaiting('提交中...')
      this.$server.check.bodyAnswer(formData).then(({data})=>{
        
        this.checkResult = this.resultFormat(data)
        this.$pageTo('#page-result', '体质检测结果', 'replace')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.$mui.showWaiting()
    this.$server.check.bodyCheckLast().then(({data})=>{
      if(data){
        setTimeout(()=>{
          this.checkResult = this.resultFormat(data)
          this.$pageTo('#page-result', '上次检测结果')
        }, 700)
      }
    }).finally(()=>{
      this.getBodyQuestion()
    })
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
._show {
  ._hd:after{transform: rotate(180deg);}
  ._bd{height: auto;}
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
    width: 100%; height: 100px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 0.25rem; margin:1rem 0 1.6rem;
    ._item{
      width: 10%; max-width: 1rem; height: 0; flex:1; background: #ffbc2e; margin: 0 2%;
      border-radius: 3px 3px 0 0; position: relative; 
      i{
        position: absolute; background: #5dd76f; color: #fff; font-size: 0.55rem; border-radius: 3px; min-width: 1rem; text-align: center;
        top: -1.2rem; padding:2px; line-height: 1; z-index: 1;left: 50%; transform: translateX(-50%);
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
  background:#fff; padding: 1rem; margin: 1rem; border-radius: 0.5rem;
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
</style>