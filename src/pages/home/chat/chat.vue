<template>
  <div class="chat">
    <ChatUserList class="chat-userList"></ChatUserList>
    <div class="chat-container">
      <div class="chat-container-title bgColor">icecream</div>
      <Scroll class="wrapper"
              :data="data">
        <ul class="content">
          <li class="message"
              v-for="item in data"
              :key="item.id">
            <!-- 左侧其他人 -->
            <div class="left-message"
                 v-if="item.state==0">
              <div class="left-avatar">
                <img src="../../../assets/image/timg.jpg"
                     alt="">
              </div>
              <div class="left-info">
                <div class="left-content">
                  {{item.content}}
                </div>
              </div>
            </div>
            <!-- 右侧自己 -->
            <div class="right-message"
                 v-else>
              <div class="right-avatar">
                <img src="../../../assets/image/timg.jpg"
                     alt="">
              </div>
              <div class="right-info">
                <div class="right-content">
                  {{item.content}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="loading-wrapper"></div>
      </Scroll>
      <div class="chat-container-inp">
        <div class="inp-title">

        </div>
        <div class="inp-content">

        </div>
        <div class="inp-send">

        </div>
      </div>
    </div>
    <ChatInfo class="chat-info"></ChatInfo>
  </div>
</template>

<script>
import Scroll from '@/common/scroll'
import ChatUserList from './components/chatUserList'
import ChatInfo from './components/chatInfo'
export default {
  name: "scroll",
  components: {
    Scroll,
    ChatUserList,
    ChatInfo
  },
  props: {},
  data () {
    return {
      data: [],
      pulldown: true,
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
/* 左侧用户列表组件开始 */
.chat-userList {
  width: 300px;
  box-sizing: border-box;
  background: #f0f5f9;
  /* border-radius: 5%; */
  overflow: hidden;
}
/* 左侧用户列表组件结束 */

/* 中间聊天 */
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

.message {
  width: 100%;
}
/* 左侧聊天人 */
.left-message {
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  display: flex;
}
.left-avatar {
  flex-shrink: 0; /* 项目不缩小 */
  width: 80px;
  height: 80px;
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
  padding: 10px 20px;
  background: #fffcf0;
  border-radius: 0 10px 10px 10px;
}
/* .left-content:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 19px;
  height: 71px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  margin-right: -11px;
  border-bottom-width: 16px;
  border-bottom-color: currentColor;
  border-radius: 0 0 0 142px;
  color: #fffcf0;
} */
/* 右侧聊天人 */
.right-message {
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
}
.right-avatar {
  flex-shrink: 0; /* 项目不缩小 */
  width: 80px;
  height: 80px;
}
.right-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.right-info {
  padding: 0 10px;
}
.right-content {
  margin-top: 20px;
  padding: 10px 20px;
  background: #fffcf0;
  border-radius: 10px 0px 10px 10px;
}

/* 输入框 */
.chat-container-inp {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  border: 1px solid #ccc;
  /* background: #f0f5f9; */
}
.inp-title {
  height: 40px;
  background: #f0f5f9;
}
.inp-send{
  height: 40px;
  background: #f0f5f9;
}
/* 右侧聊天信息 */
.chat-info {
  flex: 1;
}
</style>
