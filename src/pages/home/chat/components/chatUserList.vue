<template>
  <div class="chatList">
    <div class="title bgColor">会话列表</div>
    <div class="search">
      search
    </div>
    <Scroll class="wrapper">
      <ul class="content">
        <li class="user" @click="tiaozhuan('1')">
          <div class="user-container">
            <div class="container-avatar">
              <img src="../../../../assets/image/timg.jpg"
                   alt="">
            </div>
            <div class="container-message">
              <div class="message-one">
                <div>
                  icecream
                </div>
                <div>
                  ···
                </div>
              </div>
              <div class="message-two">
                <div>
                  这是一条通知
                </div>
                <div>
                  09-06
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="user" @click="tiaozhuan('2')">
          <div class="user-container">
            <div class="container-avatar">
              <img src="../../../../assets/image/timg.jpg"
                   alt="">
            </div>
            <div class="container-message">
              <div class="message-one">
                <div>
                  icecream
                </div>
                <div>
                  ···
                </div>
              </div>
              <div class="message-two">
                <div>
                  这是一条通知
                </div>
                <div>
                  09-06
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="loading-wrapper"></div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/common/scroll'
export default {
  name: "chatUserList",
  components: {
    Scroll
  },
  props: {},
  data () {
    return {
    }
  },
  methods: {
    tiaozhuan(id){
      this.$router.push({ path: `/chatContainer/${id}` })
      console.log('点击了')
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
.chatList {
  position: relative;
}
.title {
  line-height: 30px;
  padding-left: 30px;
}
.search {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #e4e7ec;
}
.wrapper {
  width: 100%;
  position: absolute;
  top: 70px;
  bottom: 0px;
  overflow: hidden;
}
.user {
  box-sizing: border-box;
  height: 100px;
  background: #e4e7ec;
  /* border-bottom: 1px solid #1f5be2; */
}
.user-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.container-avatar {
  width: 100px;
  height: 100px;
  position: relative;
}
.container-avatar img {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  object-fit: cover;
}
.container-message {
  margin-right: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
}
.message-one {
  display: flex;
  justify-content: space-between;
  color: #8c9184;
}
.message-two {
  display: flex;
  justify-content: space-between;
  color: #c5c5c5;
}
</style>
