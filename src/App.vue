<template>
  <div>
    <tabbar v-if="isTabbarShow"></tabbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    tabbar
  },
  computed: {
    ...mapState(['isTabbarShow'])
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  html{
    height: 100%;
  }
  ul{
    list-style: none;
  }
  body{
    font: 12px/1.5 Tahoma,Helvetica,Arial,sans-serif;
    font-family: Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;
  }
</style>
