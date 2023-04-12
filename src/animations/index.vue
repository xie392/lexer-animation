<script setup>
import Reveal from 'reveal.js'
import highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
import markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
import 'reveal.js/plugin/highlight/monokai.css'

// ppt
import statement from './components/statement.vue'
import expression from './components/expression.vue'

const reveal = ref(null)

const init = () => {
  // keyboard：启用键盘控制。默认为 true。
  // slideNumber：显示幻灯片编号。默认为 false。
  // showNotes：在演讲者视图中显示备注。默认为 false。
  // controls：显示幻灯片控制按钮。默认为 true。
  // progress：显示幻灯片进度条。默认为 true。
  // center：每个幻灯片是否垂直和水平居中。默认为 true。
  reveal.value = Reveal.initialize({
    center: false,
    hash: false,
    autoSlide: 1000,
    transition: 'down',
    loop: false,
    progress: false,
    history: false,
    embedded: false,
    controls: false,
    // 布局方式，可选值为：'linear'、'grid'、'default'，默认为 'default'
    layout: 'linear',
    // 每次演示加载时随机化幻灯片的顺序
    shuffle: false,
    // width: 960,
    // height: 700,
    // margin: 0.1,
    // minScale: 0.2,
    // maxScale: 1.5,
    plugins: [highlight, markdown]
  })

  Reveal.addEventListener('slidechanged', function (event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    console.log(event.previousSlide, event.currentSlide, event.indexh, event.indexv)
  })
}

onMounted(() => {
  init()
})

const props = defineProps({})
</script>

<template>
  <div class="reveal layout-center ppt">
    <div class="slides">
      <section data-transition="fade">
        <!-- 声明变量 -->
        <statement />
        <!-- 表达式 -->
        <expression />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rectangular {
  display: flex;
  width: 100px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 32px;
  justify-content: center;
  align-items: center;
}
</style>
