<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- banner -->
      <!-- <swiper :options="swiperOption" ref="lSwiper" class="l-swiper">
        <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
          <a @click="$link(slide.clickURL)"><img class="_item" :src="slide.imagePath" /></a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper> -->
      <div class="l-swiper">
        <img class="_item" src="/static/banner-01.jpg" />
      </div>
     <!-- banner end--> 

      <!-- menu -->
      <div class="mui-row l-text-center l-bg-white l-border-t">
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding-tb l-link" @click="$link('/check/eye', 'page-in')">
          <p><img style="height: 2rem;" src="~assets/images/ushimenzhen.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-s">U视门诊</p>
        </a>
        <!-- <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding-tb l-link" @click="$link('/check/body', 'page-in')">
          <p><img style="height: 2rem;" src="~assets/images/bodyCheck.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-s">体质检测</p>
        </a> -->
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding-tb l-link" @click="$link('/check/report', 'page-in')">
          <p><img style="height: 2rem;" src="~assets/images/jiancebaogao.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-s">检测报告</p>
        </a>
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding-tb l-link" @click="$link('order/list?tab=2', 'page-in')">
          <p><img style="height: 2rem;" src="~assets/images/express.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-s">物流查询</p>
        </a>
      </div>
      <!-- menu end-->
      
      <!-- recommend -->
      <div class="l-text-center l-padding-btn l-margin-t l-bg-white l-border-b">
        <span>推荐商品</span>
        <span class="l-text-gray"> / Recommend</span>
      </div>
      <div class="l-goods-list">
        <router-link class="l-goods-item l-margin-b" tag="div" v-for="item in goodsList" :to="'/shop/goods/info/' + item.goodsId">
          <div class="_thumb">
            <img :src="item.image">
          </div>
          <div class="_text l-border-t">
            <h3>{{item.goodsName}}</h3>
            <p class="l-fs-m">{{item.goodsBrief}}</p>
            <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>{{item.price | currency}}</p>
          </div>
        </router-link>
        <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      </div>
      <!-- recommend end-->
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab, swiper, swiperSlide
  },
  data () {
    return {
      loading: false,
      goodsList: null,
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        initialSlide: 1,
        loop: true,
        autoplay: 5000,
        direction : 'horizontal',
        autoHeight: true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : true,
        observeParents:true,
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper){
          // console.log(swiper)
        }
      },
      swiperSlides: []
    }
  },
  created() {
    this.loading = true
    this.$server.shop.getGoodsList(1).then(({data})=>{
      setTimeout(()=>{
        this.goodsList = data
        this.loading = false
      }, 700)
    }).catch(()=>{
      this.loading = false
    })

    this.$server.getBanner().then(({data})=>{
      this.swiperSlides = data
    })
  }
}
</script>
<style scoped>
.l-swiper{height: 10rem;}
.l-swiper ._item{width:100%; height: 10rem;}
</style>