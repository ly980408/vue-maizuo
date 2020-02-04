<template>
  <div id="cinemas">
    <div class="header">
      <div class="city" @click="toCity">
        <span class="city-name">{{this.$store.state.nowCityName}}</span>
        <span class="iconfont icon-gengduo"></span>
      </div>
      <div class="title">影院</div>
      <div class="search"><span class="iconfont icon-sousuo"></span></div>
    </div>
    <div class="cinema-list-wrap">
      <ul class="cinema-list">
        <li class="cinema-list-item" v-for="data in cinemaList" :key="data.cinemaId">
          <div class="cinema-info-left">
            <p class="name">{{data.name}}</p>
            <p class="address">{{data.address}}</p>
          </div>
          <div class="cinema-info-right">
            <i class="price">￥<span>{{data.lowPrice/100}}</span></i><span> 起</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'

export default {
  data () {
    return {
      cinemaList: []
    }
  },
  mounted () {
    this.$store.state.nowCityId = localStorage.getItem('cityId')
    this.$store.state.nowCityName = localStorage.getItem('cityName')
    if (this.$store.state.nowCityId) {
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.nowCityId}&ticketFlag=1&k=2905857`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"${this.$store.state.nowCityId}"}`,
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        this.cinemaList = res.data.data.cinemas
      })
    } else {
      this.$router.push('/city')
    }
  },
  methods: {
    toCity () {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema-list-wrap{
  position: relative;
  top: 51px;
  margin-bottom: 50px;
  overflow: hidden;
}
.cinema-list {
  position: relative;
  li{
    height: 40px;
    padding: 15px;
    border-bottom: 1px solid #ededed;
  }
  .cinema-info-left{
    max-width: 80%;
    height: 100%;
    padding-right: 15px;
    float: left;
    box-sizing: border-box;
    .name{
      color: #191a1b;
      font-size: 15px;
      max-width: 80%;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .address{
      color: #797d82;
      font-size: 12px;
      max-width: 80%;
      margin-top: 5px;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .cinema-info-right{
    float: right;
    box-sizing: border-box;
    text-align: center;
    color: #ff5f16;
    font-size: 12px;
    line-height: 50px;
    .price{
      font-style: normal;
      font-size: 15px;
      text-align: center;
    }
  }
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ededed;
  background: white;
  z-index: 9;
  line-height: 50px;
  .city{
    float: left;
    margin-left: 15px;
    font-size: 12px;
    width: 20%;
    .city-name{
      margin-right: 1px;
      max-width: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
    }
  }
  .title{
    width: 50%;
    float: left;
    text-align: center;
    margin: 0 auto;
    font-size: 20px;
  }
  .search{
    float: right;
    width: 5%;
    height: 100%;
    text-align: right;
    margin-right: 15px;
  }
}
</style>
