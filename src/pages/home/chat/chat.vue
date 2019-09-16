<template>
  <div class="chat">
    <div class="chat-users">
      <div class="chat-users-title">会话列表</div>
    </div>
    <div class="chat-container">
      <Scroll class="wrapper"
              :data="data"
              :pulldown="pulldown"
              @pulldown="loadData"
              >
        <ul class="content">
          <li v-for="(item,index) in data"
              class="content-li"
              :key="index" >{{item}}</li>
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
  name: "scroll",
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
      this.requestData();
      /* .then((res) => {
        this.data = res.data.concat(this.data)
      }) */
      console.log('下拉刷新')
    },
    
    clickHandle(){
      console.log('点击了')
    },
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
.content-li {
  height: 50px;
  border: 1px solid #ccc;
}
.chat-info {
  flex: 1;
}
</style>
