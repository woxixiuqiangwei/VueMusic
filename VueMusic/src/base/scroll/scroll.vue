<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {     // 滚动的类型，1表示会派发事件
        type: Number,
        default: 1
      },
      click: {      // 是否允许在滚动上点击，可能和fastclick有冲突，可以用class="needsclick"解决
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {    // 20是保证dom已经ready
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {    // 确保dom已经就绪
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {   // 在mounted时初始化一个better-scroll对象
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      enable() {      // 允许滚动
        this.scroll && this.scroll.enable()
      },
      disable() {     // 禁用滚动
        this.scroll && this.scroll.disable()
      },
      refresh() {     // 刷新
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {    // 滚动到固定位置
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {   // 滚动到固定 dom
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {  // 监控容器内部高度变化
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }


</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
