<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from 'vue'
// import { Animations } from '$/index'
// import statement from 'svg/components/statement.vue'
// import Test from '@/animations/index.vue'
import Draw from 'canvas/canvas'
import { useStatement } from '@/canvas/hooks/useStatement'
import { DrawInterface } from '#/canvas'

const animation = ref<HTMLElement | null>(null)

onMounted(() => {
  // const animation = new Animations({ el: '#ppt' })
  // animation.init()
  // animation.addSlide('www')
  const draw = new Draw({ id: 'canvas' })
  // draw.drawText(10, 50, 'hello world')
  // draw.drawCircle(50, 120, 40, '#f36')
  // draw.drawRect(40, 180, 100, 40, '#f36')
  // draw.drawText(55, 205, 'hello world')
  // draw.drawLine(200, 200, 100, 120, 1, '#f36')
  useStatement(draw, { name: 'a', value: '100001' })
})
</script>

<template>
  <div class="grid code-animation">
    <div class="animation" ref="animation">
      <div id="canvas" class="canvas"></div>
    </div>
    <div class="terminal">k控制台</div>
  </div>
</template>

<style lang="scss" scoped>
.code-animation {
  height: calc(100vh - 64px);
  grid-template-rows: 1fr 150px;

  .animation {
    flex: 1;
    min-height: 400px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    border-bottom: 1px solid var(--border-color, #e8e8e8);

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .terminal {
    flex: 1;
    background-color: #fff;
  }
}

::v-deep(.slides) {
  width: 100% !important;
  height: 100% !important;
  inset: none !important;
  transform: translate(0, 0) scale(1) !important;
}

.canvas {
  width: 100%;
  height: 100%;
}
</style>
