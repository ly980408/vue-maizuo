<template>
  <div>
    <ul class="film-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false">
      <li v-for="data in dataList" :key="data.filmId" @click="handlePageChange(data.isPresale, data.filmId)">
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
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      dataList: [],
      loading: false,
      currentPage: 1,
      totalPage: 0,
      cityId: null
    }
  },
  mounted () {
    // if (this.$store.state.comingList.length === 0) {
    //   this.$store.dispatch('getComingList')
    // } else {
    //   console.log('使用缓存')
    // }
    this.$store.state.nowCityId = localStorage.getItem('cityId')
    if (this.$store.state.nowCityId) {
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.nowCityId}&pageNum=1&pageSize=10&type=2&k=5942620`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"${this.$store.state.nowCityId}"}`,
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.dataList = res.data.data.films
        this.totalPage = res.data.data.total
      })
    } else {
      this.$router.push('/city')
    }
  },
  methods: {
    handlePageChange (data, id) {
      if (!data) {
        MessageBox({
          title: '提示',
          message: '该影片还没有排期，看看其他电影吧',
          showCancelButton: true
        }).then(res => {
          // console.log(res)
          if (res === 'confirm') {
            this.$router.push('/films/comingsoon')
          }
        })
      }
      this.$router.push({ name: 'mydetail', params: { filmId: id } })
    },
    loadMore () {
      // console.log('load more')
      this.loading = true
      this.currentPage++

      if (this.dataList.length === this.totalPage) {
        this.loading = false
        return
      }
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=370200&pageNum=${this.currentPage}&pageSize=10&type=2&k=5942620`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"370200"}',
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
<style>

</style>
