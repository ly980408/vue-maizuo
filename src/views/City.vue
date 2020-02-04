<template>
  <div>
    <div class="header">
      <div class="back" @click="goBack">
        <img src="../assets/back.png" alt="">
      </div>
      <div class="header-title">当前城市 - {{this.nowCityName}}</div>
    </div>
    <div class="search"></div>
    <mt-index-list :height="listHeight">
      <mt-index-section :index="data.index" v-for="data in dataList" :key="data.index">
        <div v-for="city in data.list" :key="city.cityId" @click="changeCity(city.cityId, city.name)">
          <mt-cell :title="city.name">
          </mt-cell>
        </div>
      </mt-index-section>
      </mt-index-list>
  </div>
</template>

<script>
import Axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      listHeight: 0,
      dataList: [],
      nowCityName: '',
      nowCityId: null
    }
  },
  created () {
    // console.log(document.documentElement.clientHeight)
    this.listHeight = document.documentElement.clientHeight - 70
  },
  beforeMount () {
    this.$store.commit('myHideTabbar', false)
  },
  mounted () {
    this.nowCityName = localStorage.getItem('cityName')
    this.nowCityId = localStorage.getItem('cityId')
    Axios({
      url: 'https://m.maizuo.com/gateway?k=8041903',
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15790718313118146258078","bc":"${this.nowCityId}"}`,
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.dataList = this.filterCity(res.data.data.cities)
    })
  },
  methods: {
    filterCity (oldList) {
      // 获取一个A-Z的数组
      var letterList = []
      for (var i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      // console.log(letterList)
      var newList = []
      for (var j = 0; j < letterList.length; j++) {
        var arr = oldList.filter(item => item.pinyin.substring(0, 1) === letterList[j].toLowerCase())
        if (arr.length > 0) {
          newList.push({
            index: letterList[j],
            list: arr
          })
        }
      }
      // console.log(newList)
      return newList
    },
    changeCity (id, name) {
      // console.log(id)
      // 将id存到localStorage中
      localStorage.setItem('cityId', id)
      localStorage.setItem('cityName', name)
      this.$router.go(-1)
    },
    goBack () {
      if (!this.nowCityId) {
        MessageBox.alert('请选择当前城市', '提示')
      } else {
        this.$router.go(-1)
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('myShowTabbar', true)
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 44px;
  width: 100%;
  position: relative;
  .header-title{
    font-size: 18px;
    width: 75%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 44px;
  }
  .back{
    height: 30px;
    width: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    img{
      width: 30px;
    }
  }
}
</style>
