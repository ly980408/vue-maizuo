<template>
    <div v-if="filmInfo" id="detail">
      <div class="header">
        <div class="back" @click="goBack">
          <img src="../assets/back.png" alt="">
        </div>
        <div class="title">{{this.filmInfo.name}}</div>
      </div>
      <div class="poster-wrap">
        <img class="poster" :src="filmInfo.poster" alt="">
      </div>
      <div class="film-detail">
        <div class="detail-header">
          <div class="left">
            <span class="name">{{filmInfo.name}}</span>
            <span class="item">{{filmInfo.item.name}}</span>
          </div>
          <div class="right">
            <span class="grade">{{filmInfo.grade}}</span>
            <span class="grade-text"> 分</span>
          </div>
        </div>
        <div class="detail-middle">
          <p>{{filmInfo.category}}</p>
          <p>{{formatDate(filmInfo.premiereAt)}} 上映</p>
          <p>{{filmInfo.nation}} | {{filmInfo.runtime}} 分钟</p>
        </div>
        <div class="detail-synopsis" :class="isHide?'hide':''">
          {{filmInfo.synopsis}}
        </div>
        <div class="toggle" @click="toggle">
          <img src="../assets/toggle.png" :class="isHide?'':'up'">
        </div>
      </div>
      <div class="actors">
        <div class="actors-title">演职人员</div>
        <swiper class="actors-swiper">
          <div class="swiper-slide" v-for="data in filmInfo.actors" :key="data.name">
            <img :src="data.avatarAddress" alt="">
            <p>{{data.name}}</p>
          </div>
        </swiper>
      </div>
      <div class="photos">
        <div class="photos-title">剧照</div>
        <swiper class="photos-swiper">
          <div class="swiper-slide" v-for="(data,index) in filmInfo.photos" :key="index">
            <img :src="data" alt="">
          </div>
        </swiper>
      </div>
    </div>
</template>
<script>
import Axios from 'axios'
import swiper from './Detail/DetailSwiper'

export default {
  data () {
    return {
      filmInfo: null,
      isHide: true
    }
  },
  beforeMount () {
    this.$store.commit('myHideTabbar', false)
  },
  mounted () {
    Axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.filmId}&k=7094279`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"370700"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filmInfo = res.data.data.film
    })
  },
  components: {
    swiper
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    formatDate (time) {
      var date = new Date(time * 1000)
      var year = date.getFullYear()
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      // var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return year + '-' + month + '-' + day
    },
    toggle () {
      this.isHide = !this.isHide
    }
  },
  beforeDestroy () {
    this.$store.commit('myShowTabbar', true)
  }
}
</script>
<style lang="scss" scoped>
.header{
  position: fixed;
  background-color: hsla(0,0%,100%,0);
  color: transparent;
  width: 100vw;
  height: 44px;
  z-index: 1;
  .back{
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    img{
      width: 30px;
    }
  }
}
.poster-wrap{
  height: 56vw;
  overflow: hidden;
  position: relative;
  img{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
.film-detail,.actors-title,.photos-title{
  padding: 15px;
}
.film-detail{
  border-bottom: 10px solid #ededed;
  .detail-header{
    display: flex;
    .left{
      float: left;
      width: 256px;
      .name{
        color: #191a1b;
        font-size: 18px;
        height: 24px;
        line-height: 24px;
        margin-right: 7px;
      }
      .item{
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
        display: inline-block;
      }
    }
    .right{
      width: calc(100% - 250px);
      text-align: right;
      color: #ffb232;
      .grade{
        font-style: italic;
        font-size: 18px;
      }
      .grade-text{
        font-size: 10px;
      }
    }
  }
  .detail-middle{
    p{
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
  }
  .detail-synopsis{
    margin-top: 12px;
    font-size: 13px;
    color: #797d82;
  }
  .hide{
    height: 38px !important;
    overflow: hidden;
  }
  .detail-synopsis, .hide{
    transition: height .5s ease;
    -webkit-transition: height .5s ease;
  }
  .toggle{
    text-align: center;
    display: block;
    height: auto;
    width: 20px;
    margin: auto;
    line-height: normal;
    img{
      width: 8px;
    }
    img.up{
      transform: rotate(180deg);
    }
  }
}
</style>
