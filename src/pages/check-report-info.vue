<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <div class="mui-content" style="background-color:#fff; font-size:0.75rem;">
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

        <!-- 眼睛照片 -->
        <div class="l-eye-picture">
          <div class="_hd l-flex-h">
            <div class="l-rest">
              <h3>左眼照片</h3>
            </div>
          </div>
          <div class="_bd">
            <ul class="_inline">
              <li style="width:25%;" v-for="(item, index) in leftEyeImages">
                <div class="_img">
                  <img :src="$utils.image.thumb(item, 100, 100)" @click="previewPhoto('left', index)">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="l-eye-picture">
          <div class="_hd l-flex-h">
            <div class="l-rest">
              <h3>右眼照片</h3>
            </div>
          </div>
          <div class="_bd">
            <ul class="_inline">
              <li style="width:25%;" v-for="(item, index) in rightEyeImages">
                <div class="_img">
                  <img :src="$utils.image.thumb(item, 100, 100)" @click="previewPhoto('right', index)">
                </div>
              </li>
            </ul>
          </div>
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
        <button type="button" class="mui-btn l-btn-white" @click="$router.back()">返回</button>
        <p class="l-fs-xs l-text-center l-text-gray l-margin-t">检测结果仅供参考，请以医院检查结果为准</p>
      </div>
    </div>
  </div>
</template>
<script>
import checkBodyData from 'assets/js/check-body-data'

export default {
  data () {
    return {
      checkBodyData,
      eyeResult: [],
      bodyResult: [],
      leftEyeImages: [],
      rightEyeImages: [],
      visceraResult: [],
      goods: [
        {
          areaIndex: 1,
          name: 'U-1',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 2,
          name: 'U-3',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion3.jpg'
        },{
          areaIndex: 3,
          name: 'U-2',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion2.jpg'
        },{
          areaIndex: 4,
          name: 'U-5',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion5.jpg'
        },{
          areaIndex: 5,
          name: 'U-1',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 6,
          name: 'U-6',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion6.jpg'
        },{
          areaIndex: 7,
          name: 'U-4',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 8,
          name: 'U-4',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 9,
          name: 'U-7',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion7.jpg'
        },{
          areaIndex: 10,
          name: 'U-5',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion5.jpg'
        },{
          areaIndex: 11,
          name: 'U-1',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion1.jpg'
        },{
          areaIndex: 12,
          name: 'U-4',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion4.jpg'
        },{
          areaIndex: 13,
          name: 'U-8',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/recommend/potion8.jpg'
        }
      ],
      viscera: [
        {
          index: 1,
          name: '心脏',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/xin.jpg'
        },
        {
          index: 2,
          name: '肝脏',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/gan.jpg'
        },
        {
          index: 3,
          name: '脾脏',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/pi.jpg'
        },
        {
          index: 4,
          name: '肺',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/fei.jpg'
        },
        {
          index: 5,
          name: '肾脏',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/shen.jpg'
        },
        {
          index: 6,
          name: '胆',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/dan.jpg'
        },
        {
          index: 7,
          name: '胃',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/wei.jpg'
        },
        {
          index: 8,
          name: '小肠',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/xiaochang.jpg'
        },
        {
          index: 9,
          name: '大肠',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/dachang.jpg'
        },
        {
          index: 10,
          name: '上焦(咽喉至胸膈部分)',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/shangjiao.jpg'
        },
        {
          index: 11,
          name: '中焦(上腹腔部分)',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/zhongjiao.jpg'
        },
        {
          index: 12,
          name: '下焦(下腹腔部分)',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/xiajiao.jpg'
        },
        {
          index: 13,
          name: '膀胱',
          image: 'http://opii7iyzy.bkt.clouddn.com/mall/eye/organ/pangguang.jpg'
        }
      ]
    }
  },
  computed: {
    mainBody() {
      return this.bodyResult.find((item)=>{
        return item.isTop
      }) || {}
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
    toggleShow(e) {
      if(e.currentTarget.classList.contains('_show')){
        e.currentTarget.classList.remove('_show')
      }else{
        e.currentTarget.classList.add('_show')
      }
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
    previewPhoto(type = 'left', index = 0) {
      this.$server.previewImage(this[type + 'EyeImages'], index)
    }
  },
  created() {
    this.$mui.showWaiting()
    this.$server.check.getReportInfo(this.$route.params.id).then(({data})=>{
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
        let mainBodyData = this.checkBodyData[mainBody.constitutionRemark]
        if(mainBodyData && mainBodyData.viscera.length > 0){
          this.visceraResult[0] = mainBodyData.viscera[0]-1
          this.visceraResult[1] = mainBodyData.viscera[1]-1
        }
      }
      this.eyeResult = data1
      this.bodyResult = data2
      this.leftEyeImages = [data.imageResult.leftTopImage, data.imageResult.leftBottomImage, data.imageResult.leftLeftImage, data.imageResult.leftRightImage]
      this.rightEyeImages = [data.imageResult.rightTopImage, data.imageResult.rightBottomImage, data.imageResult.rightLeftImage, data.imageResult.rightRightImage]
    }).finally(()=>{
      this.$mui.hideWaiting()
    })
  }
}
</script>
<style scoped lang="less">
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

.l-eye-picture{
  ._hd{
    padding: 1rem;
    img{ height: 1rem; margin:0.1rem 0.75rem 0 0.1rem;}
    h3{}
    p{color: #999; font-size: 0.75rem;}
  }
  ._bd{
    ul{list-style:none; overflow: hidden; margin:-1rem 0 -2rem;padding: 1rem 2rem;}
    li{float: left; width: 50%; text-align: center; margin-bottom: 1rem;}
    li>p{color: #999; font-size: 0.6rem;}
    ._img{ 
      width: 4rem; height: 4rem; margin:0 auto 0.5rem; position: relative;
      background: url(~assets/images/sys-006.jpg); background-size: contain;
    }
    ._img>img{width: 100%; height: 100%;}
    ul._inline{
      padding: 1rem 0.5rem;
      ._img {width: 3rem; height: 3rem;}
    }
  }
}
</style>