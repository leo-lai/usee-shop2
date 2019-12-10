<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-bg-white l-margin-b l-text-center">
          <img src="~assets/images/sys-018.png" alt="">
          <img src="~assets/images/layout-005.jpg" alt="">
        </div>

        <div class="l-bg-white" style="padding: 1rem 0;">
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>01 拍摄眼睛照片</h3></div>
            <div class="_bd l-margin">
              五脏六腑之精气皆注于目,眼睛可以反映人体脏腑器官存在的异常或病变，通过拍摄眼睛照片观察眼睛存在的症状及对应的分布情况。
            </div>
          </div>
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>02 选择症状分布区域</h3></div>
            <div class="_bd l-margin">
              通过查看拍摄的眼睛照片选择对应点分布区域及对应症状。
            </div>
          </div>
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>03 回答体质检测题目</h3></div>
            <div class="_bd l-margin">
              根据当前的真实感受，回答30道权威中医体质题目，耗时约1分钟。
            </div>
          </div>
          <div class="l-Q-item" @click="toggleShow($event)">
            <div class="_hd"><h3>04 得到检测结果</h3></div>
            <div class="_bd l-margin">
              系统将得出您对应体质及需要调理的脏腑，并提供针对您的身体情况提供对应的建议，定制对应的日常调护方案，食疗方案等。
            </div>
          </div>
          <br>
          <div class="l-text-center">
            <button class="_start-btn" @click="startCheck">开始<br>检测</button>
          </div>
          <br>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-pz">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">拍摄眼睛照片</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-footer-btn">
        <button type="button" style="width:50%;background:#fff; color:#999;" @click="$link('/check/eye', 'page-out', 'replace')">返回</button>
        <button type="button" style="width:50%; background:#64c4a8;color:#fff;" @click="submitPhoto">下一步</button>
      </footer>
      <div class="mui-content" style="background:#fff;">
        <img src="~assets/images/sys-004.jpg" alt="">
        <div class="l-eye-picture">
          <div class="_hd l-flex-h">
            <img src="~assets/images/sys-005.jpg" alt="">
            <div class="l-rest">
              <h3>拍摄左眼照片</h3>
              <p>睁大眼睛并拍摄左眼照片</p>
            </div>
          </div>
          <div class="_bd">
            <ul>
              <li v-for="(item, index) in leftEyeImages">
                <div class="_img" :class="item.src ? '_upload' : ''" @click="takePhoto(item, index)">
                  <img :src="$utils.image.thumb(item.src, 100, 100)" @click.stop="previewPhoto(item, index)">
                  <i class="_close" @click.stop="delPhoto(item, index)"></i>
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="l-eye-picture">
          <div class="_hd l-flex-h">
            <img src="~assets/images/sys-005.jpg" alt="">
            <div class="l-rest">
              <h3>拍摄右眼照片</h3>
              <p>睁大眼睛并拍摄右眼照片</p>
            </div>
          </div>
          <div class="_bd">
            <ul>
              <li v-for="(item, index) in rightEyeImages">
                <div class="_img" :class="item.src ? '_upload' : ''" @click="takePhoto(item, index)">
                  <img :src="$utils.image.thumb(item.src, 100, 100)" @click.stop="previewPhoto(item, index)">
                  <i class="_close" @click.stop="delPhoto(item, index)"></i>
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-left">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">选择左眼症状</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-footer-btn">
        <button type="button" style="width:50%;background:#fff; color:#999;" @click="$link('/check/eye#page-pz', 'page-out', 'replace')">上一步</button>
        <button type="button" style="width:50%; background:#64c4a8;color:#fff;" @click="$pageTo('#page-right', '选择有右眼症状', 'replace')">下一步</button>
      </footer>
      <div class="mui-content" style="background:#fff;">
        <div class="l-eye-check">
          <div class="_hd">
            <h3 class="l-text-center">选择左眼症状分布</h3>
            <ul class="l-text-gray l-fs-s">
              <li>仔细观察拍摄照片，查看眼睛是否有血丝、斑点</li>
              <li style="color:red;">根据症状区域点击下图爱眼君对应的区域</li>
              <li>如果没有任何症状则直接下一步</li>
            </ul>
          </div>
          <div class="l-eyer">
            <div class="_eye">
              <div class="_ball"></div>
              <ul class="_left">
                <li :class="{'_slted': leftZz.data[0][0] || leftZz.data[0][1]}" 
                  @click="sltZzArea(0, 'left')" style="transform: rotate(46deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">1</a></li>
                <li :class="{'_slted': leftZz.data[1][0] || leftZz.data[1][1]}" 
                  @click="sltZzArea(1, 'left')" style="transform: rotate(68.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">2</a></li>
                <li :class="{'_slted': leftZz.data[2][0] || leftZz.data[2][1]}" 
                  @click="sltZzArea(2, 'left')" style="transform: rotate(91deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">3</a></li>
                <li :class="{'_slted': leftZz.data[3][0] || leftZz.data[3][1]}" 
                  @click="sltZzArea(3, 'left')" style="transform: rotate(113.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">4</a></li>
                <li :class="{'_slted': leftZz.data[4][0] || leftZz.data[4][1]}" 
                  @click="sltZzArea(4, 'left')" style="transform: rotate(136deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">5</a></li>
                <li :class="{'_slted': leftZz.data[5][0] || leftZz.data[5][1]}" 
                  @click="sltZzArea(5, 'left')" style="transform: rotate(181deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">6</a></li>
                <li :class="{'_slted': leftZz.data[6][0] || leftZz.data[6][1]}" 
                  @click="sltZzArea(6, 'left')" style="transform: rotate(203.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">7</a></li>
                <li :class="{'_slted': leftZz.data[7][0] || leftZz.data[7][1]}" 
                  @click="sltZzArea(7, 'left')" style="transform: rotate(226deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">8</a></li>
                <li :class="{'_slted': leftZz.data[8][0] || leftZz.data[8][1]}" 
                  @click="sltZzArea(8, 'left')" style="transform: rotate(271deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">9</a></li>
                <li :class="{'_slted': leftZz.data[9][0] || leftZz.data[9][1]}" 
                  @click="sltZzArea(9, 'left')" style="transform: rotate(293.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">10</a></li>
                <li :class="{'_slted': leftZz.data[10][0] || leftZz.data[10][1]}" 
                  @click="sltZzArea(10, 'left')" style="transform: rotate(316deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">11</a></li>
                <li :class="{'_slted': leftZz.data[11][0] || leftZz.data[11][1]}" 
                  @click="sltZzArea(11, 'left')" style="transform: rotate(338.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">12</a></li>
                <li :class="{'_slted': leftZz.data[12][0] || leftZz.data[12][1]}" 
                  @click="sltZzArea(12, 'left')" style="transform: rotate(361deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">13</a></li>
              </ul>
            </div>
            <transition name="fade">
              <div class="_slt-zz" v-show="leftZz.visible" @click="leftZz.visible = false">
                <br><br>
                <h4 class="l-margin">请选择该眼睛区域出现的症状</h4>
                <br>
                <div class="l-flex-hc">
                  <div @click.stop="sltZz(1, 'left')" class="_item l-rest" :class="{'_slted': !!leftZz.slted[0]}">
                    <img width="80" src="~assets/images/sys-011.png" alt="眼睛有血丝">
                    <p>眼睛有血丝</p>
                  </div>
                  <div @click.stop="sltZz(2, 'left')" class="_item l-rest" :class="{'_slted': !!leftZz.slted[1]}">
                    <img width="80" src="~assets/images/sys-012.png" alt="眼睛有斑点">
                    <p>眼睛有斑点</p>
                  </div>  
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="l-eye-picture">
          <div class="_bd">
            <ul class="_inline">
              <li style="width:25%;" v-for="(item, index) in leftEyeImages">
                <div class="_img" :class="item.src ? '_upload' : ''">
                  <img :src="$utils.image.thumb(item.src, 100, 100)" @click.stop="previewPhoto(item, index)">
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-right">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">选择右眼症状</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-footer-btn">
        <button type="button" style="width:50%;background:#fff; color:#999;" @click="$link('/check/eye#page-left', 'page-out', 'replace')">上一步</button>
        <button type="button" style="width:50%; background:#64c4a8;color:#fff;" @click="getEyeResult">下一步</button>
      </footer>
      <div class="mui-content" style="background:#fff;">
        <div class="l-eye-check">
          <div class="_hd">
            <h3 class="l-text-center">选择右眼症状分布</h3>
            <ul class="l-text-gray l-fs-s">
              <li>仔细观察拍摄照片，查看眼睛是否有血丝、斑点</li>
              <li style="color:red;">根据症状区域点击下图爱眼君对应的区域</li>
              <li>如果没有任何症状则直接下一步</li>
            </ul>
          </div>
          <div class="l-eyer">
            <div class="_eye">
              <div class="_ball"></div>
              <ul>
                <li :class="{'_slted': rightZz.data[0][0] || rightZz.data[0][1]}" 
                  @click="sltZzArea(0, 'right')" style="transform: rotate(46deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">1</a></li>
                <li :class="{'_slted': rightZz.data[1][0] || rightZz.data[1][1]}" 
                  @click="sltZzArea(1, 'right')" style="transform: rotate(68.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">2</a></li>
                <li :class="{'_slted': rightZz.data[2][0] || rightZz.data[2][1]}" 
                  @click="sltZzArea(2, 'right')" style="transform: rotate(91deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">3</a></li>
                <li :class="{'_slted': rightZz.data[3][0] || rightZz.data[3][1]}" 
                  @click="sltZzArea(3, 'right')" style="transform: rotate(113.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">4</a></li>
                <li :class="{'_slted': rightZz.data[4][0] || rightZz.data[4][1]}" 
                  @click="sltZzArea(4, 'right')" style="transform: rotate(136deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">5</a></li>
                <li :class="{'_slted': rightZz.data[5][0] || rightZz.data[5][1]}" 
                  @click="sltZzArea(5, 'right')" style="transform: rotate(181deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">6</a></li>
                <li :class="{'_slted': rightZz.data[6][0] || rightZz.data[6][1]}" 
                  @click="sltZzArea(6, 'right')" style="transform: rotate(203.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">7</a></li>
                <li :class="{'_slted': rightZz.data[7][0] || rightZz.data[7][1]}" 
                  @click="sltZzArea(7, 'right')" style="transform: rotate(226deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">8</a></li>
                <li :class="{'_slted': rightZz.data[8][0] || rightZz.data[8][1]}" 
                  @click="sltZzArea(8, 'right')" style="transform: rotate(271deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">9</a></li>
                <li :class="{'_slted': rightZz.data[9][0] || rightZz.data[9][1]}" 
                  @click="sltZzArea(9, 'right')" style="transform: rotate(293.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">10</a></li>
                <li :class="{'_slted': rightZz.data[10][0] || rightZz.data[10][1]}" 
                  @click="sltZzArea(10, 'right')" style="transform: rotate(316deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">11</a></li>
                <li :class="{'_slted': rightZz.data[11][0] || rightZz.data[11][1]}" 
                  @click="sltZzArea(11, 'right')" style="transform: rotate(338.5deg) skew(67.5deg);">
                  <a style="transform: skew(-67.5deg) rotate(281deg);">12</a></li>
                <li :class="{'_slted': rightZz.data[12][0] || rightZz.data[12][1]}" 
                  @click="sltZzArea(12, 'right')" style="transform: rotate(361deg) skew(45deg);">
                  <a style="transform: skew(-45deg) rotate(292deg);;">13</a></li>
              </ul>
            </div>
            <transition name="fade">
              <div class="_slt-zz" v-show="rightZz.visible" @click="rightZz.visible = false">
                <br><br>
                <h4 class="l-margin">请选择该眼睛区域出现的症状</h4>
                <br>
                <div class="l-flex-hc">
                  <div @click.stop="sltZz(1, 'right')" class="_item l-rest" :class="{'_slted': !!rightZz.slted[0]}">
                    <img width="80" src="~assets/images/sys-011.png" alt="眼睛有血丝">
                    <p>眼睛有血丝</p>
                  </div>
                  <div @click.stop="sltZz(2, 'right')" class="_item l-rest" :class="{'_slted': !!rightZz.slted[1]}">
                    <img width="80" src="~assets/images/sys-012.png" alt="眼睛有斑点">
                    <p>眼睛有斑点</p>
                  </div>  
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="l-eye-picture">
          <div class="_bd">
            <ul class="_inline">
              <li style="width:25%;" v-for="(item, index) in rightEyeImages">
                <div class="_img" :class="item.src ? '_upload' : ''">
                  <img :src="$utils.image.thumb(item.src, 100, 100)" @click.stop="previewPhoto(item, index)">
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-result">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">瞳诊结果</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content" style="background:#fff;">
        <div class="l-reuslt-item l-border-b">
          <div class="_hd">
            <img width="60" src="~assets/images/sys-013.png" alt="">
            <p>瞳诊结果</p>
          </div>
          <div class="_bd">
            <p>根据您眼睛血丝或斑点的分布，系统定性评测为：</p>
            <template v-if="resultList.length > 0">
              <div class="_result">
                <p v-for="item in resultList">您的<b class="l-text-main2">{{item.pupilsAreaName}}</b>存在异常信号反映于眼睛上，考虑多为<span class="l-text-hot">{{item.descriptionName}}</span>所致；</p>
              </div>
              <p class="l-fs-s l-text-gray">注：如果血丝或斑点呈鲜红状，则一般多为新病或急病，如果为淡黄色，则一般多为病情将愈，暗灰色则表示该脏腑气血不足；</p>
            </template>
            <div class="_result" v-else>
              <p>您体内的五脏六腑不存在异常信号，请保持良好的作息习惯及饮食习惯！</p>
            </div>
          </div>          
        </div>
        <template v-if="resultList.length > 0">
          <div class="l-reuslt-item l-border-b">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-014.png" alt="">
              <p>易感疾病</p>
            </div>
            <div class="_bd">
              <p>以下疾病是您相对比较容易感染的，请警惕：</p>
              <div class="_result">
                <p v-for="item in resultList">{{item.underlyingDisease}}</p>
              </div>
            </div>          
          </div>
          <div class="l-reuslt-item l-border-b">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-015.png" alt="">
              <p>食疗方案</p>
            </div>
            <div class="_bd">
              <p>为您推荐以下食疗方案，可以在平时饮食中进行搭配：</p>
              <div class="_result">
                <div class="_result-item" v-for="item in resultList" @click="toggleShow($event)">
                  <div class="_hd">有益于{{item.pupilsAreaName}}的食疗方案</div>
                  <div class="_bd">
                    <p v-for="item2 in item.dietTyerapy.split('|')">{{item2}}</p>
                  </div>  
                </div>
              </div>
            </div>          
          </div>
          <div class="l-reuslt-item">
            <div class="_hd">
              <img width="60" src="~assets/images/sys-016.png" alt="">
              <p>日常护理</p>
            </div>
            <div class="_bd">
              <p>根据检测结果，我们建议您平时应该多注意以下事项：</p>
              <div class="_result">
                <div class="_result-item" v-for="item in resultList" @click="toggleShow($event)">
                  <div class="_hd">有益于{{item.pupilsAreaName}}的建议</div>
                  <div class="_bd">
                    <p v-for="item2 in item.dailyNursing.split('|')">{{item2}}</p>
                  </div>  
                </div>
              </div>
            </div>          
          </div>
          <div class="l-result-goods" style="margin-top: -1rem;">
            <p class="l-text-gray">推荐商品</p>
            <div class="l-zoom">
              <img class="l-fl" style="width:5rem; margin:0.75rem 0.75rem 0 0;" :src="goods[resultList[0].pupilsSymptomuId-1].image" alt="">
              <h3 class="l-margin-tb">{{goods[resultList[0].pupilsSymptomuId-1].name}}</h3>
              <p class="l-text-gray">预购热线：<br>400-180-6900</p>
            </div>
          </div>
          <p class="l-fs-xs l-text-center l-text-gray">瞳诊结果仅供参考，请以医院检查结果为准</p>
        </template>
        <div style="margin:1rem;">
          <button type="button" class="mui-btn l-btn-main2" @click="checkAgain">重新检测</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      eyeImages: [
        {
          type: 'left',
          key: 'leftTop',
          name: '眼球向上照片',
          src: '',
        },{
          type: 'left',
          key: 'leftBottom',
          name: '眼球向下照片',
          src: '',
        },{
          type: 'left',
          key: 'leftLeft',
          name: '眼球向左照片',
          src: '',
        },{
          type: 'left',
          key: 'leftRight',
          name: '眼球向右照片',
          src: '',
        },{
          type: 'right',
          key: 'rightTop',
          name: '眼球向上照片',
          src: '',
        },{
          type: 'right',
          key: 'rightBottom',
          name: '眼球向下照片',
          src: '',
        },{
          type: 'right',
          key: 'rightLeft',
          name: '眼球向左照片',
          src: '',
        },{
          type: 'right',
          key: 'rightRight',
          name: '眼球向右照片',
          src: '',
        }
      ],
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
      leftZz: {
        data: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
        visible: false,
        slted: []
      },
      rightZz: {
        data: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
        visible: false,
        slted: []
      },
      resultList: []
    }
  },
  computed: {
    leftEyeImages() {
      return this.eyeImages.filter((item)=>{
        return item.type === 'left'
      })
    },
    rightEyeImages() {
      return this.eyeImages.filter((item)=>{
        return item.type === 'right'
      })
    }
  },
  methods: {
    startCheck() {
      // this.$storage.session.remove('eyeImages')
      // this.$storage.session.remove('leftZzData')
      // this.$storage.session.remove('rightZzData')
      // this.$storage.session.remove('bodyQuestion')
      this.$pageTo('#page-pz', '拍摄眼睛照片', 'replace')
    },
    toggleShow(e) {
      if(e.currentTarget.classList.contains('_show')){
        e.currentTarget.classList.remove('_show')
      }else{
        e.currentTarget.classList.add('_show')
      }
    },
    checkAgain() {
      window.location.replace('/check/eye')
    },
    sltZzArea(index = 0, type = 'left') {
      this[type + 'Zz'].visible = true
      this[type + 'Zz'].slted = this[type + 'Zz'].data[index]
    },
    sltZz(index = 1, type = 'left') {
      if(this[type + 'Zz'].slted[index-1]){
        this[type + 'Zz'].slted[index-1] = ''
      }else{
        this[type + 'Zz'].slted[index-1] = index
      }
      this[type + 'Zz'].visible = false
      this.$storage.session.set(type + 'ZzData', this[type + 'Zz'].data)
    },
    takePhoto(item, index = 0) {
      this.$server.chooseImage(1).then((localIds)=>{
        this.$server.uploadImage(localIds).then(({ serverIds, images, localIds })=>{
          item.src = images[0]
        })
      }).catch((errMsg)=>{
        this.$mui.alert('添加图片失败，请刷新重试！', ()=>{
          this.$url.reload()
        })
      })
    },
    delPhoto(item, index = 0) {
      item.src = ''
    },
    previewPhoto(item, index = 0) {
      let images = []
      this[item.type + 'EyeImages'].map((item)=>{
        images.push(item.src)
        return item
      })

      this.$server.previewImage(images, index)
    },
    submitPhoto() {
      this.$mui.showWaiting()
      let formData = {}
      let hasAllImages = this.eyeImages.every((item)=>{
        formData[item.key + 'Image'] = item.src
        return !!item.src
      })

      this.$server.check.uploadEyePhoto(formData).then(({data})=>{
        this.$pageTo('#page-left', '选择左眼症状', 'replace')
      }).finally(()=>{
        this.$storage.session.set('eyeImages', this.eyeImages)
        this.$mui.hideWaiting()
      })
    },
    getEyeResult() {
      this.$link('/check/body#page-question', 'page-in', 'replace')
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   switch(to.hash){
  //     case '#page-pz':
  //       let eyeImages = this.$storage.session.get('eyeImages')
  //       eyeImages && (this.eyeImages = eyeImages)
  //       break
  //     case '#page-left':
  //       let leftZzData = this.$storage.session.get('leftZzData')
  //       leftZzData && (this.leftZz.data = leftZzData)
  //       break
  //     case '#page-right':
  //       let rightZzData = this.$storage.session.get('rightZzData')    
  //       rightZzData && (this.rightZz.data = rightZzData)
  //       break
  //   }
  //   next()
  // },
  created() {
    let eyeImages = this.$storage.session.get('eyeImages')
    let leftZzData = this.$storage.session.get('leftZzData')
    let rightZzData = this.$storage.session.get('rightZzData')
    eyeImages && (this.eyeImages = eyeImages)
    leftZzData && (this.leftZz.data = leftZzData)
    rightZzData && (this.rightZz.data = rightZzData)
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
.l-result-goods{
  background:#fff; padding:0.5rem 1rem; margin: 1rem; border-radius: 0.5rem; border: 1px solid #efefef;
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
    ._bd{display: none; padding: 0.25rem 0;}
  }
  ._result-item._show{
    ._hd:after{
      transform: rotate(90deg); 
    }
    ._bd{display: block; border-top: 1px dashed #efefef;}
  }
}
.l-eyer{
  width: 16rem; height: 16rem; margin: 0 auto; position: relative; padding: 0.3rem 0;
  background: url(~assets/images/sys-009.jpg) 50% 50%; background-size: 100% 100%; 
  ._ball {
    position: absolute; top: 50%; left: 50%; z-index: 2; transform: translate3d(-50%, -50%, 0); 
    width: 4rem; height: 4rem; background: url(~assets/images/sys-010.png) 50% 50%; background-size: 100% 100%; 
  }
  ._eye{
    width: 11rem; height: 11rem; margin:0.5rem auto; position: relative; 
    background: url(~assets/images/sys-008.png) 50% 50%; background-size: 100% 100%;
    border-radius: 50%; overflow: hidden;  transform: translate3d(0,0,0); 
    ul{list-style: none; padding: 0;margin:0; /* Safari 和 Chrome */ }
    li{
      position: absolute; z-index: 1; width: 100%; height: 100%;  top: -50%; left: -50%; 
      transform-origin: 100% 100%; overflow: hidden; border-bottom: 1px solid #efefef; 
    }
    li>a{
      width: 100%; height: 100%;  border-radius: 50%; padding-top: 0.4rem; pointer-events: none; transition: all 0.1s;
      position: absolute; right: -50%; bottom: -50%; color: #ddd; text-align: center; font-size: 0.6rem; 
    }
    li._slted{
      a{
        background: red; color: #fff;  
      }
    }
  }
  ._slt-zz{
    text-align: center; color: #fff; 
    position: absolute;top:0; width: 100%; height: 100%; z-index: 1;
    img{margin-bottom: 0.5rem;}
    p{font-size: 0.6rem;}
    ._slted > img{ border-radius: 50%; box-shadow: 0px 0px 20px 1px red; border: 1px solid red;}
  }
  ._slt-zz:before{
    content: '×'; position: absolute; top:0.5rem; right: 0.5rem; color: #fff; font-size: 1rem; line-height: 1;
  }
  ._slt-zz:after{
    content: ''; position: absolute; top: 0; left:  0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: -1;
  }
}
.l-eye-check{
  margin: 1rem;
  ._hd{
    ul{padding: 0 0 0 1.2rem;}
  }
}
.l-footer-btn{
  padding: 0;
  &:after{
    content: ''; clear: both; height: 0; visibility: hidden; font-size: 0;
  }
  button {
    height: 100%; border:none; border-radius: 0; float: left;
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
    ul{list-style:none; overflow: hidden; margin:-1rem 0;padding: 1rem 2rem;}
    li{float: left; width: 50%; text-align: center; margin-bottom: 1rem;}
    li>p{color: #999; font-size: 0.6rem;}
    ._img{ 
      width: 4rem; height: 4rem; margin:0 auto 0.5rem; position: relative;
      background: url(~assets/images/sys-006.jpg); background-size: contain;
    }
    ._img>img{width: 100%; height: 100%;display: none;}
    ._close{
      width: 1rem; height: 1rem; background: #f96281; border-radius: 50%; display: none;
      position: absolute; top:-0.5rem; right: -0.5rem; transform: rotate(45deg);  
    }
    ._close:before{
      content: ''; background: #fff; position: absolute; left: 20%; right: 20%; top: 50%; height: 0.05rem; transform: translateY(-50%)
    }
    ._close:after{
      content: ''; background: #fff; position: absolute; top: 20%; bottom: 20%; left: 50%;  width: 0.05rem; transform: translateX(-50%)
    }
    ._upload{
      img, ._close{display: block;}
    }
    ul._inline{
      padding: 1rem 0.5rem;
      ._img {width: 3rem; height: 3rem;}
    }
  }
}
</style>