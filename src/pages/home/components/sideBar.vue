<template>
  <div id="sidebar">
    <div class="sideBar-avatar">
      <img src="../../../assets/image/touxiang.jpeg"
           alt="">
    </div>
    <div class="sideBar-container">
      <div class="container-items">
        <svg aria-hidden="true">
          <use xlink:href="#iconliaotian"></use>
        </svg>
      </div>
    </div>

    <div class="sideBar-setting">
      <svg aria-hidden="true">
        <use xlink:href="#iconhuabanfuben"></use>
      </svg>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
#sidebar {
  height: 100%;
  width: 60px;
  background: #373536;
  display: flex;
  flex-direction: column;
}
.sideBar-avatar {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.sideBar-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sideBar-container {
  flex: 1;
}
.container-items {
  height: 60px;
  width: 60px;
}
.container-items svg {
  width: 100%;
  height: 100%;
}


.sideBar-setting {
  width: 60px;
  height: 60px;
}
.sideBar-setting svg{
  width: 100%;
  height: 100%;
}
</style>
