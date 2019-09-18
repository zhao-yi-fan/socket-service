<template>
  <div class="chat">
    <ChatList class="chat-userList"></ChatList>
    <div class="chat-container">
      <div class="chat-container-title bgColor">Matt Thomspn</div>
      <Scroll class="wrapper"
              :data="data"
              :pulldown="pulldown"
              @pulldown="loadData">
        <ul class="content">
          <li class="left-message">
            <div class="left-avatar">
              <img src="../../../assets/image/timg.jpg"
                   alt="">
            </div>
            <div class="left-info">
              <div class="left-content">
                内容内容内容内容内容内容内容
              </div>
            </div>
          </li>
        </ul>
        <div class="loading-wrapper"></div>
      </Scroll>
      <div class="chat-container-inp"
           contenteditable="true">

      </div>
    </div>
    <div class="chat-info">

    </div>
  </div>
</template>

<script>
import Scroll from '@/common/scroll'
import ChatList from './components/chatList'
export default {
  name: "scroll",
  components: {
    Scroll,
    ChatList
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
    clickHandle () {
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
.wrapper {
  width: 100%;
  position: absolute;
  top: 45px;
  bottom: 200px;
  overflow: hidden;
  z-index: 1;
}
.chat {
  height: 100%;
  display: flex;
}
.chat-userList {
  width: 300px;
  box-sizing: border-box;
  background: #f0f5f9;
  /* border-radius: 5%; */
  overflow: hidden;
}

.chat-container {
  width: 700px;
  position: relative;
  background: #eaeaea;
  /* border-radius: 5%; */
  overflow: hidden;
}
.chat-container-title {
  line-height: 30px;
  text-align: center;
}
/* .content-li {
  height: 50px;
  border: 1px solid #ccc;
} */

/* 左侧聊天人 */
.left-message {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
}
.left-avatar {
  flex-shrink: 0; /* 项目不缩小 */
  width: 100px;
  height: 100px;
}
.left-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.left-info {
  padding: 0 10px;
}
.left-content {
  margin-top: 20px;
  background: #f9cdad;
  border-radius: 5px;
  position: relative;
}
.left-content:after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: -50px;
  width: 76px;
  height: 24px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  margin-bottom: -11px;
  border-right-width: 15px;
  border-right-color: currentColor;
  border-radius: 0 152px 0 0;
  color: #f9cdad;
}
/* 输入框 */
.chat-container-inp {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  border: 1px solid #ccc;
  background: #f0f5f9;
}

.chat-info {
  flex: 1;
}
</style>
