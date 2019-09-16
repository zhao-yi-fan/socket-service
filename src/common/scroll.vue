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
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
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
     * 这个配置用于做下拉刷新功能,当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
     */
    pullDownRefresh: {
      type: Boolean | Object,
      default: true
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
        pullDownRefresh: this.pullDownRefresh
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 50) {
            this.show = true
            this.showMsg = '加载中...'
          }
          this.$emit('scroll', pos)
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', (pos) => {
          console.log(pos)
          console.log('鼠标/手指离开')
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          console.log('beforeScrollStart 滚动之前')
          this.$emit('beforeScroll')
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
.wrapper {
  width: 100%;
  /* position: absolute;
  top: 45px;
  bottom: 50px;  */
  overflow: hidden;
  z-index: 1;
}
</style>