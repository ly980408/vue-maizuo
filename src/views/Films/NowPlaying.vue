<template>
  <div>
    <ul class="film-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false">
      <li v-for="data in dataList" :key="data.filmId" @click="handlePageChange(data.filmId)">
        <img :src="data.poster" alt="">
        <div class="film-info">
          <div><span class="name">{{data.name}}</span><span class="item">{{data.item.name}}</span></div>
          <div v-if="data.grade"><span>评分 </span><span class="grade">{{data.grade}}</span></div>
          <div v-else><span>暂无评分</span></div>
          <div v-if="data.actors"><span>主演：{{data.actors | actorFilter}}</span></div>
          <div v-else><span>暂无主演</span></div>
          <div><span>{{data.nation}} | {{data.runtime}} 分钟</span></div>
        </div>
        <div class="buy">购票</div>
      </li>
    </ul>
    <slot :loading="loading"></slot>
  </div>
</template>
<script>
import Axios from 'axios'
import Vue from 'vue'
import { Spinner } from 'mint-ui'

Vue.component(Spinner.name, Spinner)

Vue.filter('actorFilter', (data) => {
  var actorList = data.map(item => item.name)
  return actorList.join(' ')
})

export default {
  data () {
    return {
      dataList: [],
      loading: false,
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    this.$store.state.nowCityId = localStorage.getItem('cityId')
    if (this.$store.state.nowCityId) {
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.nowCityId}&pageNum=1&pageSize=10&type=1&k=5942620`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"${this.$store.state.nowCityId}"}`,
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.dataList = res.data.data.films
        this.total = res.data.data.total
      })
    } else {
      this.$router.push('/city')
    }

    // if (this.$store.state.nowList.length === 0) {
    //   this.$store.dispatch('getNowList')
    // } else {
    //   console.log('使用缓存')
    // }
  },
  methods: {
    handlePageChange (id) {
      // 编程式导航-路径跳转
      // this.$router.push(`/detail/${id}`)
      // 名字跳转
      this.$router.push({ name: 'mydetail', params: { filmId: id } })
    },
    loadMore () {
      // console.log('load more')
      this.loading = true
      this.currentPage++

      if (this.dataList.length === this.total) {
        this.loading = false
        return
      }
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.nowCityId}&pageNum=${this.currentPage}&pageSize=10&type=1&k=5942620`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"${this.$store.state.nowCityId}"}`,
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.dataList = [...this.dataList, ...res.data.data.films]
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.film-list{
  li::after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
  }
  li{
    padding: 10px;
    overflow: hidden;
    position: relative;
    img{
      width: 66px;
      float: left;
      border-radius: 2px;
    }
    .film-info{
      float: left;
      height: 100%;
      width: calc(100% - 136px);
      padding: 0 10px;
      div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span{
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
      }
      .name{
        display: inline-block;
        vertical-align: middle;
        max-width: 85%;
        color: #191a1b;
        font-size: 16px;
        height: 22px;
        line-height: 22px;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item{
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
        vertical-align: middle;
      }
      .grade{
        color: #ffb232;
        font-size: 14px;
      }
    }
    .buy{
      float: right;
      line-height: 25px;
      height: 25px;
      width: 50px;
      color: #ff5f16;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      right: 20px;
      top: calc(50% - 13px);
    }
    .buy::after{
      content: " ";
      transform: scale(.5);
      position: absolute;
      border: 1px solid #ff5f16;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-radius: 4px;
    }
  }
}
</style>
