<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active:currentPageIndex=== index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data(){
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {     // 是否循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 是否自动播放
        type: Boolean,
        default: true
      },
      interval: { // 轮播间隔时间
        type: Number,
        default: 4000
      }
    },
    mounted(){
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay)
          this._play()/// 继续轮播
      }, 20)
      window.addEventListener('resize', () => {   // 视口改变自适应
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)    // 重新设置宽度
        this.slider.refresh()  // 刷新轮播图，重新计算
      })

    },
    methods: {
      // 设置轮播宽度
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children   // 轮播图的个数
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')      // 添加样式

          child.style.width = sliderWidth + 'px'  // 设置宽度
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots(){

        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,      // 横向滚动
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex   // 设置圆点激活状态
          if (this.autoPlay) {    // 继续轮播
            clearTimeout(this.timer)
            this._play()
          }
        })

      },
      _play() {       // 轮播
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {    // 循环轮播  多一个
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 500)  // 直接去到下一页
        }, this.interval)
      }

    },
    destroyed(){
        clearTimeout(this.timer)
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
