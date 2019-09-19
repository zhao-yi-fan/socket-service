<template>
  <div ref="wrapper">
    <div class="bScroll-container">
      <div class="bScroll-top"
           v-show="show"
           :style="msgCol">
        <span>{{showMsg}}</span>
      </div>
      <div class="bScroll-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      showMsg: '下拉刷新...',
      show: false,
    }
  },
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    isPullup: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    isPulldown: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    isBeforeScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    msg: {
      type: String,
      default: ''
    },
    /**
     * PC 端的鼠标滚轮，默认为 false
     */
    mouseWheel: {
      type: Boolean | Object,
      default: () => ({
        speed: 20, // 表示鼠标滚轮滚动的速度
        invert: false, // 为 true 表示滚轮滚动和时机滚动方向相反
        easeTime: 1000, // 表示滚动动画的缓动时长
      })
    },
    scrollbar: {
      type: Boolean | Object,
      default: () => ({
        fade: true,
        interactive: false // 1.8.0 新增
      })
    },
    pullUpLoad: {
      type: Boolean | Object,
      default: () => ({
        // 当上拉距离超过30px时触发 pullingUp 事件
        threshold: -30
      })
    },
    /**
     * 这个配置用于做下拉刷新功能,当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
     */
    pullDownRefresh: {
      type: Boolean | Object,
      default: () => ({
        threshold: 30,
        stop: 20
      })
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        mouseWheel: this.mouseWheel,
        // 开启滚动条，默认为 false
        scrollbar: this.scrollbar,
        // 开启上拉加载
        pullUpLoad: this.pullUpLoad,
        // 开启下拉刷新
        pullDownRefresh: this.pullDownRefresh
      })

      // 是否派发列表滚动开始的事件
      if (this.isBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          console.log('beforeScrollStart 滚动之前')
          this.$emit('beforeScroll')
        })
      }

      // 是否派发滚动事件
      /* if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          console.log(this.scroll.maxScrollY)
          if (pos.y > 50) {
            this.show = true
            this.showMsg = '加载中...'
          }
          this.$emit('scroll', pos)
        })
      } */

      // 是否派发滚动到底部事件，用于上拉加载
      /* if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      } */

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.isPullup) {
        this.scroll.on('pullingUp', () => {
          console.log('处理上拉加载操作')
          setTimeout(() => {
            // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
            this.scroll.finishPullUp()
          }, 2000)
        })
      }
      /* if (this.pulldown) {
        this.scroll.on('touchEnd', (pos) => {
          console.log('鼠标/手指离开')
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      } */

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.isPulldown) {
        // 下拉刷新的动作后，这个时机一般用来去后端请求数据。
        this.scroll.on('pullingDown', () => {
          console.log('下拉刷新请求数据')
          this.$emit('pulldown')
          setTimeout(() => {
            // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
            this.scroll.finishPullDown()
          }, 2000)
        })
      }

    },
    disable () {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable () {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  computed: {
    msgCol () {
      switch (this.msg) {
        case 'black':
          return `color: #2f2725`
        default:
          return `color: #fff`
      }
    }
  },
}
</script>
<style lang="css" scoped>
.bScroll-top {
  text-align: center;
}
</style>