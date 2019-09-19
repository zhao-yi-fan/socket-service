import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Home from '@/pages/home/home'
import Chat from '@/pages/home/chat/chat'
import ChatContainer from '@/pages/home/chat/components/chatContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/chat',
          name: 'Chat',
          component: Chat,
          children: [
            {
              path: '/chatContainer/:id',
              name: 'ChatContainer',
              // 设置keepAlive属性
              meta: {
                keepAlive: true
              },
              component: ChatContainer,
            }
          ]
        }
      ]
    }
  ]
})
