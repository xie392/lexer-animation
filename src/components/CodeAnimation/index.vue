<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from 'vue'
import Draw, { pluginList } from '$/index'
import { useRunStore } from '@/stores/run'
import { storeToRefs } from 'pinia'

const runStore = useRunStore()

const { error, queue } = storeToRefs(runStore)

// watchEffect(() => {
//   console.log('error', error.value)
// })

// watch(
//   error,
//   (val) => {
//     console.log('error', val)
//   },
//   {
//     deep: true
//   }
// )

const animation = ref<HTMLElement | null>(null)

const createCanvas = () => {
  // if (!animation.value) return
  const draw = new Draw({ id: 'canvas' }, pluginList)
  // draw.insert('Statement', {
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
  // draw.blockStart()
  // draw.blockAddText(`if (a < b) {`)
  // draw.blockAddText(`   a = b`)
  // draw.blockAddText(`}`)
  // draw.insert('Expression', {
  //   left: 'a',
  //   right: 'b',
  //   operator: '<',
  //   result: 'true'
  // })
  // draw.insert('Expression', {
  //   left: 'a',
  //   right: 'b',
  //   operator: '=',
  //   result: 'a = 1012'
  // })
  // draw.blockEnd()
  // draw.insert('AssignmentExpression', {
  //   left: 'a',
  //   right: [
  //     { name: 'b', value: 1001, type: 'identifier' },
  //     { name: '+', type: 'operator' },
  //     { name: '1', value: 1, type: 'number' }
  //   ],
  //   result: '1002'
  // })

  // console.log('queue', queue.value)

  // queue.value.map((v) => {
  //   draw.insert(v.name, v.params)
  // })

  // draw.render(100)
}

onMounted(createCanvas)
</script>

<template>
  <div class="grid code-animation">
    <div class="animation" ref="animation">
      <div id="canvas" class="canvas"></div>
    </div>
    <div class="terminal">
      <p class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-animation {
  height: calc(100vh - 64px);
  grid-template-rows: 1fr 150px;

  .animation {
    flex: 1;
    // min-height: 400px;
    // max-height: calc(100vh - 300px);
    overflow-y: auto;
    border-bottom: 1px solid var(--border-color, #e8e8e8);

    &::-webkit-scrollbar {
      display: none !important;
    }

    #canvas {
      width: 100%;
      height: 100%;
      &::-webkit-scrollbar {
        display: none !important;
      }
    }
  }

  .terminal {
    flex: 1;
    background-color: #fff;
    padding: 10px 5px;
    box-sizing: border-box;
    height: 300px;
    overflow-y: auto;

    .error {
      color: red;
      white-space: pre-wrap;
    }
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
