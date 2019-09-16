<template>
  <div class="chat">
    <div class="chat-users">
      <div class="chat-users-title">会话列表</div>
    </div>
    <div class="chat-container">
      <Scroll class="wrapper"
              :data="data"
              :pulldown="pulldown"
              @pulldown="loadData">
        <ul class="content">
          <li v-for="(item,index) in data"
              :key="index">{{item}}</li>
        </ul>
        <div class="loading-wrapper"></div>
      </Scroll>
    </div>
    <div class="chat-info">

    </div>
  </div>
</template>

<script>
import Scroll from '@/common/scroll'
export default {
  name: "",
  components: {
    Scroll
  },
  props: {},
  data () {
    return {
      data: [],
      pulldown: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    requestData () {
      let _this = this;
      this._ajax('http://localhost:3000/test', {}, function (res) {
        _this.data = res.data.concat(_this.data);
      })
    },
    loadData () {
      this.requestData().then((res) => {
        this.data = res.data.concat(this.data)
      })
    },
    /* loadData () {
      this.requireData();
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {})
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.loadData()
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    } */
  },
  created () {
    this.loadData()
  },
  mounted () {

  }
}
</script>
<style lang="css" scoped>
.chat {
  height: 100%;
  display: flex;
}
.chat-users {
  width: 300px;
  box-sizing: border-box;
  background: #ccc;
  border-radius: 5%;
  overflow: hidden;
}
.chat-users-title {
  height: 30px;
  background: #f1c856;
}
.chat-container {
  width: 400px;
  background: lightgreen;
  border-radius: 5%;
  overflow: hidden;
}
.chat-info {
  flex: 1;
}
</style>
