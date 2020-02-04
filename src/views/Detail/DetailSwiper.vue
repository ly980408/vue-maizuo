<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  mounted () {
    // eslint-disable-next-line no-unused-vars
    var actorsSwiper = new Swiper('.actors-swiper', {
      slidesPerView: 4,
      spaceBetween: 30,
      freeMode: true,
      slidesOffsetBefore: 15
    })
    // eslint-disable-next-line no-unused-vars
    var photosSwiper = new Swiper('.photos-swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      slidesOffsetBefore: 15
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
</style>
