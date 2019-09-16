<template>
  <div id="home">
    <SideBar></SideBar>
    <div id="main">
      <Header></Header>
      <div id="main-container">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './components/footer'
import Header from './components/header'
import SideBar from './components/sideBar'
export default {
  name: "",
  components: {
    Header,
    Footer,
    SideBar,
  },
  props: {},
  data () {
    return {
      
    }
  },
  watch: {},
  computed: {},
  methods: {
    
  },
  created () {
    /* console.log(window)
    console.log(window.innerHeight)
    console.log(window.innerWidth) */
  },
  mounted () {
  }
}
</script>
<style lang="css" scoped>
#home {
  height: 100%;
  display: flex;
}

#main {
  height: 100%; /* 全屏 */
  flex: 1;
  display: flex;
  flex-direction: column; /*垂直方向排列*/
}
#main-container {
  flex: 1;
}
</style>
