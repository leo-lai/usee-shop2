import index          from './pages/index'
// import indexGuid      from './pages/index-guid'
import shop           from './pages/shop'
import shopCar        from './pages/shop-car'
import goodsInfo      from './pages/goods-info'
import me             from './pages/me'

const routes = [
  {
    path: '/',
    name: 'index',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true },
    component: index
  },
  {
    path: '/index',
    name: 'index',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true },
    component: index
  },
  {
    path: '/shop',
    name: 'shop',
    meta: { title: '商城', mainPage: true },
    component: shop
  },
  {
    path: '/shop/goods/info/:id',
    name: 'goods-info',
    meta: { title: '商品详情' },
    component: goodsInfo
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    meta: { title: '购物车', mainPage: true },
    component: shopCar
  },
  {
    path: '/shop/car',
    name: 'shopcar',
    meta: { title: '购物车' },
    component: shopCar
  },
  {
    path: '/me',
    name: 'me',
    meta: { title: '个人中心', mainPage: true },
    component: me
  },
  {
    path: '/news',
    name: 'news',
    meta: { title: '文章资讯', auth: false},
    component: (resolve) => require(['./pages/news'], resolve)
  },
  {
    path: '/news/info/:id',
    name: 'news-info',
    meta: { title: '文章资讯详情', auth: false},
    component: (resolve) => require(['./pages/news-info'], resolve)
  },
  {
    path: '/check/body',
    name: 'check-body',
    meta: { title: 'U视门诊'},
    component: (resolve) => require(['./pages/check-body'], resolve)
  },
  {
    path: '/check/eye',
    name: 'check-eye',
    meta: { title: 'U视门诊'},
    component: (resolve) => require(['./pages/check-eye'], resolve)
  },
  {
    path: '/check/report',
    name: 'check-report',
    meta: { title: 'U视门诊检测报告'},
    component: (resolve) => require(['./pages/check-report'], resolve)
  },
  {
    path: '/check/report/info/:id',
    name: 'check-report-info',
    meta: { title: 'U视门诊检测报告'},
    component: (resolve) => require(['./pages/check-report-info'], resolve)
  },
  {
    path: '/agent/apply',
    name: 'agent-appy',
    meta: { title: '代理商申请'},
    component: (resolve) => require(['./pages/agent-apply'], resolve)
  },
  {
    path: '/me/xiaou',
    name: 'xiaou',
    meta: { title: '小U店长'},
    component: (resolve) => require(['./pages/xiao-u'], resolve)
  },
  {
    path: '/me/xiaou/express/:code',
    name: 'xiaou-express',
    meta: { title: '物流查询'},
    component: (resolve) => require(['./pages/xiaou-express'], resolve)
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   meta: { title: '登录' },
  //   component: (resolve) => require(['./pages/login'], resolve)
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   meta: { title: '注册' },
  //   component: (resolve) => require(['./pages/register'], resolve)
  // },
  // {
  //   path: '/forgot',
  //   name: 'forgot',
  //   meta: { title: '找回密码' },
  //   component: (resolve) => require(['./pages/pwd'], resolve)
  // },
  // {
  //   path: '/antifake',
  //   name: 'antifake',
  //   meta: { title: '防伪查询' },
  //   component: (resolve) => require(['./pages/antifake'], resolve)
  // },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于U视一号' },
    component: (resolve) => require(['./pages/about'], resolve)
  },
  {
    path: '/me/setting',
    meta: { title: '系统设置'},
    component: (resolve) => require(['./pages/me-setting'], resolve)
  },
  {
    path: '/order/goods/service/:orderId/:orderInfoId/:goodsId',
    meta: { title: '售后服务'},
    component: (resolve) => require(['./pages/goods-service'], resolve)
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单'},
    component: (resolve) => require(['./pages/order-create'], resolve)
  },
  {
    path: '/order/list',
    meta: { title: '我的订单'},
    component: (resolve) => require(['./pages/order-list'], resolve)
  },
  {
    path: '/order/info/:id',
    meta: { title: '订单详情'},
    component: (resolve) => require(['./pages/order-info'], resolve)
  },
  {
    path: '/order/express/:id',
    meta: { title: '物流详情' },
    component: (resolve) => require(['./pages/order-express'], resolve)
  },
  {
    path: '/order/evaluate/:id',
    meta: { title: '商品评价'},
    component: (resolve) => require(['./pages/order-evaluate'], resolve)
  },
  {
    path: '/address/add',
    meta: { title: '新增收货地址'},
    component: (resolve) => require(['./pages/address-info'], resolve)
  },
  {
    path: '/address/edit/:id',
    meta: { title: '编辑收货地址'},
    component: (resolve) => require(['./pages/address-info'], resolve)
  },
  {
    path: '/pay',
    meta: { title: '支付信息'},
    component: (resolve) => require(['./pages/pay'], resolve)
  },
  {
    path: '/pay/result',
    meta: { title: '支付结果'},
    component: (resolve) => require(['./pages/pay-result'], resolve)
  },
  {
    path: '/me/account',
    meta: { title: '我的账户'},
    component: (resolve) => require(['./pages/withdrawals'], resolve)
  },
  {
    path: '/me/account/withdrawals',
    meta: { title: '提现'},
    component: (resolve) => require(['./pages/withdrawals'], resolve)
  },
  {
    path: '/me/rebate',
    meta: { title: '我的返利'},
    component: (resolve) => require(['./pages/rebate'], resolve)
  },
  {
    path: '/me/customer',
    meta: { title: '我的客户'},
    component: (resolve) => require(['./pages/customer'], resolve)
  },
  {
    path: '/me/qrcode',
    meta: { title: '我的二维码'},
    component: (resolve) => require(['./pages/qrcode'], resolve)
  },
  {
    path: '/me/xiaou/rule',
    meta: { title: '规则说明'},
    component: (resolve) => require(['./pages/xiaou-rule'], resolve)
  },
  {
    path: '/pay/sys',
    meta: { title: '员工收款'},
    component: (resolve) => require(['./pages/pay-sys'], resolve)
  },
  {
    path: '/pay/sys/record',
    meta: { title: '收款记录'},
    component: (resolve) => require(['./pages/pay-sys-record'], resolve)
  },
  {
    path: '/questionnaire/:id',
    meta: { title: 'U视一号问卷调查'},
    component: (resolve) => require(['./pages/questionnaire'], resolve)
  },
  {
    path: '/movie/time',
    meta: { title: 'U视一号爱眼护眼电影节'},
    component: (resolve) => require(['./pages/movie-time'], resolve)
  },
  {
    path: '/movie/quan/:id',
    meta: { title: 'U视一号爱眼护眼电影节'},
    component: (resolve) => require(['./pages/movie-quan'], resolve)
  },
  {
    path: '/movie/:id',
    meta: { title: 'U视一号爱眼护眼电影节'},
    component: (resolve) => require(['./pages/movie-ssss'], resolve)
  },
  {
    path: '/hexiao',
    meta: { title: 'U视一号爱眼护眼电影节'},
    component: (resolve) => require(['./pages/hexiao'], resolve)
  },
  {
    path: '/meibohui',
    meta: { title: '第47届了，这次你会来参加吗？'},
    component: (resolve) => require(['./pages/meibohui'], resolve)
  },
  {
    path: '*',
    meta: { title: '找不到页面' },
    component: (resolve) => require(['./pages/404'], resolve)
  }
]

export default routes