<template>
  <div id="films">
    <div  v-show="bannerList">
      <swiper ref="myswiper">
        <div class="swiper-slide" v-for="data in bannerList" :key="data.bannerId">
          <img :src="data.imgUrl" alt="">
        </div>
      </swiper>
    </div>
    <filmsheader :class="isFixed?'fixed':''"></filmsheader>
    <router-view v-slot="isLoading">
      <div class="loading" v-if="isLoading.loading">
        <mt-spinner type="triple-bounce" :size='16' color="#bdc0c5"></mt-spinner>
      </div>
      <div class="no-more" v-else> - 无更多电影 - </div>
    </router-view>
  </div>
</template>
<script>
import swiper from './Films/Swiper'
import filmsheader from './Films/FilmsHeader'
import Axios from 'axios'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      bannerList: [],
      isFixed: false
    }
  },
  components: {
    swiper,
    filmsheader
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    var id = localStorage.getItem('cityId')
    Axios({
      url: `https://m.maizuo.com/gateway?type=2&cityId=${{ id }}&k=7607139`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"370700"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      this.bannerList = res.data.data
      Indicator.close()
    })

    window.onscroll = this.handleScroll
  },
  beforeDestroy () {
    window.onscroll = null
  },
  methods: {
    handleScroll () {
      if (document.documentElement.scrollTop >= this.$refs.myswiper.$el.offsetHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  }
}
</script>
<style lang="scss">
.no-more{
    width: 100%;
    height: 20px;
    background-color: #ededed;
    color: #bdc0c5;
    font-size: 13px;
    text-align: center;
    margin: auto;
    line-height: 20px;
    margin-bottom: 50px
  }
.loading{
  width: 100%;
  height: 20px;
  background-color: #ededed;
  color: #bdc0c5;
  font-size: 12px;
  text-align: center;
  margin: auto;
  line-height: 20px;
  margin-bottom: 50px
}
</style>
