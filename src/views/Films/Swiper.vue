<template>
  <div class="swiper-container films-swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination films-swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.films-swiper', {
      loop: true,
      autoplay: {
        delay: 2000
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .swiper-wrapper{
    img{
      width: 100%;
    }
  }
  .films-swiper-pagination{
    text-align: right;
  }
</style>
