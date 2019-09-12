<template>
  <div id="home">
    <div id="sidebar">

    </div>
    <div id="main">
      <Header></Header>
      <div id="main-container">

      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './components/footer'
import Header from './components/header'
export default {
  name: "",
  components: {
    Header,
    Footer
  },
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {
    console.log(window)
    console.log(window.innerHeight)
    console.log(window.innerWidth)
  },
  mounted () { }
}
</script>
<style lang="css" scoped>
#home {
  height: 100%;
  display: flex;
}
#sidebar {
  height: 100%;
  width: 100px;
  background: pink;
}
#main {
  height: 100%; /* 全屏 */
  display: flex;
  flex-direction: column; /*垂直方向排列*/
}
#main-container {
  flex: 1;
}
</style>
