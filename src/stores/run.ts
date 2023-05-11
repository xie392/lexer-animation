import { ref } from 'vue'
import { defineStore } from 'pinia'
import Draw, { pluginList, Lexer } from '$/index'
import useTraverse, { type QueueListInterface } from '@/helper/useTraverse'
import type { DrawInterface } from '$/types'

// interface AstNode {
//   type: string
//   value?: any
//   [key: string]: any
// }

export const useRunStore = defineStore(
  'run',
  () => {
    // 是否运行
    const is_run = ref<boolean>(false)
    const code = ref<string>('')
    const tokens = ref<any[]>([])
    const ast = ref<any>({})
    const error = ref<string>('')
    const queue = ref<QueueListInterface[]>([])
    const draw = ref<DrawInterface | null>(null)
    const time = ref<number>(400)
    const hight_line = ref<number>(0)

    // 监听是否运行
    // watch(is_run, () => {})

    const run = () => {
      try {
        const dr = new Draw({ id: 'canvas' }, pluginList)
        error.value = ''
        const lexer = new Lexer(code.value)
        tokens.value = lexer.tokenizer()
        ast.value = lexer.parser()
        const traverse_list = lexer.traverse()

        queue.value = useTraverse(traverse_list)
        let end = 0
        queue.value.map((v) => {
          const line = v?.loc?.start?.line ?? 0
          if (end !== 0 && line > end) {
            dr.blockEnd()
            end = 0
          }

          // ;(function (line) {
          //   setTimeout(() => {
          //     console.log('line', line)
          //     hight_line.value = line
          //   }, 1000)
          // })(line)

          dr.insert(v.name, v.params)

          // 块元素
          if (v.name === 'IfStatement') {
            dr.blockStart()
            dr.blockAddText(`if(${v.params.left} ${v.params.operator} ${v.params.right})`)
            dr.insert('Expression', {
              left: v.params.left,
              right: v.params.right,
              operator: v.params.operator,
              result: v.params.result
            })
            end = v?.loc?.end?.line ?? 0
          }
        })

        dr.render(time.value)

        draw.value = dr
      } catch (err: any) {
        error.value = err.message
        console.error(err)
      }
    }

    const clear = () => {
      error.value = ''
      draw.value && draw.value.clear()
    }

    return { is_run, code, tokens, ast, error, run, queue, clear, time, hight_line }
  },
  {
    // persist: {
    //   key: 'run',
    //   storage: localStorage,
    //   paths: ['is_run'],
    // },
    persist: false
  }
)
