webpackJsonp([21,34],{157:function(t,s,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(s,"__esModule",{value:!0});var e=i(17),n=a(e);s.default={components:{infiniteLoading:n.default},data:function(){return{receivablesState:["等待付款","支付成功","支付失败"],stateCls:["l-text-warn","l-text-ok","l-text-error"],page:1,list:[],info:null,payWay:{wx_pub_qr:{name:"微信支付"},alipay_qr:{name:"支付宝支付"},pos:{name:"POS机刷卡"}}}},methods:{onInfinite:function(){var t=this;this.$server.pay.getRecord(this.page).then(function(s){var i=s.data,a=i;t.list=t.list.concat(a),a.length>0?(t.$nextTick(function(){t.$refs.infinite.$emit("$InfiniteLoading:loaded")}),a.length>=i.rows?t.page++:t.$refs.infinite.$emit("$InfiniteLoading:complete")):t.$refs.infinite.$emit("$InfiniteLoading:complete")}).catch(function(){t.$refs.infinite.$emit("$InfiniteLoading:complete")})},reset:function(){this.page=1,this.list=[],this.$refs.infinite.$emit("$InfiniteLoading:reset",!0)},viewInfo:function(t){this.info=t,this.$pageTo("#page-txinfo","收款详情")}},created:function(){}}},252:function(t,s,i){s=t.exports=i(2)(),s.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",file:"pay-sys-record.vue",sourceRoot:"webpack://"}])},294:function(t,s,i){var a=i(252);"string"==typeof a&&(a=[[t.id,a,""]]);i(3)(a,{});a.locals&&(t.exports=a.locals)},376:function(t,s,i){i(294);var a=i(1)(i(157),i(420),"data-v-78e43fe0",null);t.exports=a.exports},420:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"l-page-group"},[i("div",{staticClass:"l-page"},[t.$device.isWechat?t._e():i("header",{staticClass:"mui-bar mui-bar-nav l-black"},[i("h1",{staticClass:"mui-title"},[t._v(t._s(t.$route.meta.title))]),t._v(" "),i("a",{staticClass:"mui-icon mui-icon-arrowleft mui-pull-left _nav-back"})]),t._v(" "),i("div",{staticClass:"mui-content"},[i("div",{staticClass:"l-bg-white l-margin-b"},t._l(t.list,function(s){return i("div",{staticClass:"l-border-t l-padding-btn l-flex-hc",on:{click:function(i){t.viewInfo(s)}}},[i("div",{staticClass:"l-rest"},[i("p",[t._v(t._s(s.receivablesDate))]),t._v(" "),i("p",{staticClass:"l-fs-m"},[t._v(t._s(s.purpose))])]),t._v(" "),i("div",{staticClass:"l-text-right",class:t.stateCls[s.receivablesState]},[i("p",[t._v(t._s(t._f("currency")(s.amount)))]),t._v(" "),i("p",{staticClass:"l-fs-m"},[t._v(t._s(t.receivablesState[s.receivablesState]))])])])})),t._v(" "),i("infinite-loading",{ref:"infinite",attrs:{"on-infinite":t.onInfinite}},[i("div",{staticClass:"l-loading-inline",attrs:{slot:"spinner"},slot:"spinner"},[i("i",{staticClass:"mui-spinner"}),i("span",{staticClass:"_txt"},[t._v("正在加载...")])]),t._v(" "),i("div",{staticClass:"l-text-gray l-fs-m",attrs:{slot:"no-results"},slot:"no-results"},[t._v("还没有收款历史记录")]),t._v(" "),i("div",{staticClass:"l-text-gray l-fs-m",attrs:{slot:"no-more"},slot:"no-more"},[t._v("全部数据加载完毕")])])],1)]),t._v(" "),i("div",{staticClass:"l-page",attrs:{id:"page-txinfo"}},[t.$device.isWechat?t._e():i("header",{staticClass:"mui-bar mui-bar-nav l-black"},[i("h1",{staticClass:"mui-title"},[t._v("收款详情")]),t._v(" "),i("a",{staticClass:"mui-icon mui-icon-arrowleft mui-pull-left _nav-back"})]),t._v(" "),i("div",{staticClass:"mui-content"},[t.info?[i("div",{staticClass:"l-bg-white l-padding"},[i("div",{staticClass:"l-border-b l-flex-hc",staticStyle:{padding:"1rem 0"}},[i("span",{staticClass:"l-rest"},[t._v("收款金额")]),t._v(" "),i("span",{staticClass:"mui-pull-right l-fs-xl"},[t._v(t._s(t._f("currency")(t.info.amount)))])])]),t._v(" "),i("div",{staticClass:"l-bg-white l-margin-b"},[i("div",{staticClass:"l-fs-s l-padding-btn"},[i("p",{staticClass:"l-margin-tb-m"},[i("span",{staticClass:"mui-pull-right"},[t._v(t._s(t.info.receivablesDate))]),t._v(" "),i("span",{staticClass:"l-text-gray"},[t._v("收款时间")])]),t._v(" "),i("p",{staticClass:"l-margin-tb-m"},[i("span",{staticClass:"mui-pull-right"},[t._v(t._s(t.payWay[t.info.channel].name))]),t._v(" "),i("span",{staticClass:"l-text-gray"},[t._v("支付方式")])]),t._v(" "),i("p",{staticClass:"l-margin-tb-m"},[i("span",{staticClass:"mui-pull-right",class:t.stateCls[t.info.receivablesState]},[t._v(t._s(t.receivablesState[t.info.receivablesState]))]),t._v(" "),i("span",{staticClass:"l-text-gray"},[t._v("支付状态")])]),t._v(" "),i("p",{staticClass:"l-margin-tb-m"},[i("span",{staticClass:"mui-pull-right"},[t._v(t._s(t.info.purpose))]),t._v(" "),i("span",{staticClass:"l-text-gray"},[t._v("收款事由")])]),t._v(" "),i("p",{staticClass:"l-margin-tb-m"},[i("span",{staticClass:"mui-pull-right"},[t._v(t._s(t.info.remarks))]),t._v(" "),i("span",{staticClass:"l-text-gray"},[t._v("收款备注")])])])])]:t._e()],2)])])},staticRenderFns:[]}}});
//# sourceMappingURL=21.dcbcf728ae4e19895026.js.map