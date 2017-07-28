// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import mui from 'libs/mui/js/mui'
import FastClick from 'fastclick'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import { storage, utils } from 'assets/js/utils'
import server from './server'
import routes from './routes'
import App from './App'

window.Vue = Vue

// 解决移动端点击延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
  lazyComponent: true
})

// 货币数字过滤器 123456789.99 -> 123,456,789.99
Vue.filter('currency', (value = '')=>{
  let number = +(value+'').replace(/[^-\d.]/g, '')
  number = isNaN(number) ? 0 : number
  return number.toMoney(2)
})

// mui扩展插件
mui.use = function(plugName){
  mui.isFunction(plugName) && plugName(mui, window, document, undefined)
}
mui.toptip = utils.toptip
mui.showWaiting = utils.showWaiting
mui.hideWaiting = utils.hideWaiting
mui.coding = function() {
  mui.toast('该功能开发中')
}

// 组件通信中心
const eventHub = new Vue()

// 路由
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // console.log(to, from, savedPosition)
  }
})

// 微信页面授权自动登录
router.beforeEach((to, from, next) => {
  let code = utils.url.getArgs()['code'] || ''
  let openId = storage.local.get('openId')
  let auth = to.meta.auth

  auth = auth === false ? false : true
  
  if(auth && !storage.session.get('sessionId')){
    if(openId || code){
      mui.showWaiting('正在加载')
      return server.user.login({code}).finally(()=>{
        next()
        mui.hideWaiting()
      })
    }else{
      utils.device.isWechat && window.location.replace(server.getGrantUrl(to.fullPath, undefined, 'snsapi_userinfo'))
      return next(false)
    }
  }

  // 微信网页授权保存Landing Page，用于IOS微信JSSDK授权路径
  code && storage.session.set('Landing_Page', window.location.href)
  next()
})

// 记录页面浏览顺序及滚动条位置，用来判断动画方向
const initHistory = [{
  path: '/',
  fromPath: '/',
  index: 0,
  scrollX: 0,
  scrollY: 0
}]

initHistory.index = 0
let _history = storage.session.get('_history') || initHistory

// 控制页面间转场动画
router.beforeEach((to, from, next) => {
  // 从内页返回 e.g. page/path#page-inner -> page/path
  if(from.hash && /^#page-/.test(from.hash) && to.path.indexOf(from.path) === 0 && router.currentRoute.meta.type !== 'to'){
    pageBack(to.hash, router.currentRoute.meta[from.hash + '_title'] || router.currentRoute.meta.title)
    return next()
  }

  // 服务端渲染进入页面
  if(from.name === null && !_history.direction){ 
    eventHub.$emit('APP-DIRECTION', 'page')
    return next()
  }

  // 倒序查找
  _history.reverse()
  let fromHistory = _history.find((item)=>item.path === from.path)
  let toHistory = _history.find((item)=>item.path === to.path)
  _history.reverse()

  let direction = 'page-in'

  if(toHistory && fromHistory && _history.direction !== 'page-in'){
    // 比较路径在历史记录的位置
    if(toHistory.index < fromHistory.index){
      direction = 'page-out'
      _history.splice(fromHistory.index, 1)
      _history.index = toHistory.index
    }
  }

  // /user/info -> /user  返回父页面
  if(from.path.indexOf(to.path) === 0){
    direction = 'page-out'

  // /user -> /user/info  进入子页面
  }else if(to.path.indexOf(from.path) === 0){
    direction = 'page-in'
  }

  // 首页进入内页
  if(from.path.indexOf('/home') !== -1){
    direction = 'page-in'
  }

  // 从其他页面返回主页面
  if(!from.meta.mainPage && to.meta.mainPage){
    direction = 'page-out'
  }

  // 主页面之前切换
  if(from.meta.mainPage && to.meta.mainPage){
    direction = 'page' 
  }

  // 明确指定页面方向
  if(_history.direction){
    direction = _history.direction
  }

  // 如果历史没有记录或指定的方向是进入
  if(!toHistory || _history.direction === 'page-in'){
    let index = _history.length
    _history.push({
      path: to.path,
      fromPath: from.path,
      index: index,
      scrollX: 0,
      scrollY: 0
    })
    _history.index = index
  }

  // 触发页面切换事件
  eventHub.$emit('APP-DIRECTION', direction)

  // 如果页面组件是懒加载或第一次加载就显示loading
  if(to.meta.lazy && !toHistory){
    // $.showIndicator()
  }

  setTimeout(next, 50)
})

router.afterEach((to) => {
  utils.setTitle(to.meta.title)
  _history.direction = ''
  storage.session.set('_history', _history)

  setTimeout(()=>{
    if(to.hash){
      if(/^#page-/.test(to.hash)){
        utils.removeClass(document.querySelector('.l-page._active'), '_active')
        utils.addClass(document.querySelector(to.hash), '_active') 
      }
    }else{
      // 默认第一个展示
      let pageGroup = Array.from(document.querySelectorAll('.l-page-group'))

      if(pageGroup[pageGroup.length - 1]){
        utils.addClass(pageGroup[pageGroup.length - 1].querySelector('.l-page'), '_active')  
      }
    }
  }, 60)
})

router.onReady(()=>{
  // 记录微信的Landing Page，用于当前目录地址授权验证
  setTimeout(()=>{
    storage.session.set('Landing_Page', window.location.href)
    mui.init()
    mui(document).on('click', '._nav-back', function(e){
      router.back()
    })
    mui(document).on('click', '._nav-reload', function(e){
      utils.url.reload()
    })
  }, 100)
})

Vue._link = link
Vue._router = router
Vue._eventHub = eventHub

Vue.mixin({
  created() {
    // 跳转第三方链接方法
    this.$link = link
    // 内页间转场方法
    this.$pageTo = pageTo
    // vue事件中心
    this.$eventHub = eventHub
    // mui框架
    this.$mui = mui
    // 小工具
    this.$utils = utils
    // url操作
    this.$url = utils.url
    // 设备判断 
    this.$device = utils.device
    // 本地缓存
    this.$storage = storage
  }
})

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/* eslint-disable no-new */

// 进入内页
function pageTo(toPageId, title, type = 'push'){
  let fromPage = document.querySelector('.l-page._active')
  let toPage = document.querySelector(toPageId)
  if(toPage){
    if(title){
      router.currentRoute.meta[toPageId + '_title'] = router.currentRoute.meta.title
      router.currentRoute.meta.title = title
    }
    router.currentRoute.meta.type = 'to'
    router[type](toPageId)

    utils.addClass(toPage, 'page-in-enter-active')
    utils.addClass(fromPage, 'page-in-leave-active')
    
    // clearTimeout(pageTo.timeid)
    pageTo.timeid = setTimeout(()=>{
      router.currentRoute.meta.type = ''
      utils.removeClass(fromPage, 'page-in-leave-active')
      utils.removeClass(toPage, 'page-in-enter-active')
    }, 650)
  }
}
// 内页返回
function pageBack(toPageId, title){
  let fromPage = document.querySelector('.l-page._active')
  let toPage = toPageId ? document.querySelector(toPageId) : document.querySelector('.l-page')
  if(toPage){
    utils.addClass(fromPage, 'page-out-leave-active').removeClass(fromPage, '_active')
    utils.addClass(toPage, 'page-out-enter-active').addClass(toPage, '_active')
    if(title){
      router.currentRoute.meta.title = title
    }
    // clearTimeout(pageBack.timeid)
    pageBack.timeid = setTimeout(()=>{
      utils.removeClass(fromPage, 'page-out-leave-active')
      utils.removeClass(toPage, 'page-out-enter-active')
    }, 650)
  }
}
// 跳转
function link(url, direction, type = 'push'){
  if(!url) return

  if(/^http(s?)/i.test(url)){
    window.location[type === 'push' ? 'assign' : type](url)
  }else{
    if(_history && direction){
      _history.direction = direction
      storage.session.set('_history', _history)
    }
    router[type] && router[type](url)
  }
}