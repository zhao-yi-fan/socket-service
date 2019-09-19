<template>
  <div class="chat">
    <ChatUserList class="chat-userList"></ChatUserList>
    <keep-alive>
      <router-view class="chat-container"></router-view>
    </keep-alive>
    <ChatInfo class="chat-info"></ChatInfo>
  </div>
</template>

<script>

import ChatUserList from './components/chatUserList'
import ChatInfo from './components/chatInfo'
export default {
  name: "scroll",
  components: {
    ChatUserList,
    ChatInfo
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

/* 右侧聊天信息 */
.chat-info {
  flex: 1;
}
</style>
