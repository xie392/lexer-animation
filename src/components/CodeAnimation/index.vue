<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Draw from '$/index'
// import { useStatement } from '@/canvas/hooks/useStatement'
// import { useExpression } from '@/canvas/hooks/useExpression'

const animation = ref<HTMLElement | null>(null)

const createCanvas = () => {
  if (!animation.value) return
  const draw = new Draw({ id: 'canvas' })

  draw.addStatement({
    kind: 'int',
    body: [
      {
        name: 'a',
        value: 11
      },
      {
        name: 'b',
        value: 1001
      }
    ]
  })

  draw.addExpression({
    left: 'a',
    right: 'b',
    operator: '>',
    result: 'false'
  })

  draw.render()

  // useStatement(draw, {
  //   kind: 'int',
  //   body: [
  //     {
  //       name: 'a',
  //       value: 11
  //     },
  //     {
  //       name: 'b',
  //       value: 1001
  //     }
  //   ]
  // })

  // useExpression(draw, {
  //   left: 'a',
  //   right: 'b',
  //   operator: '>',
  //   result: 'false'
  // })

  // useExpression(draw, {
  //   left: '1',
  //   right: '2',
  //   operator: '+',
  //   result: '3'
  // })
}



onMounted(createCanvas)
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
