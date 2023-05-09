import { ref } from 'vue'
import { defineStore } from 'pinia'
import Draw, { pluginList, Lexer } from '$/index'
import useTraverse, { QueueListInterface } from '@/helper/useTraverse'

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

    // 监听是否运行
    // watch(is_run, () => {})

    const run = () => {
      try {

        error.value = ''

        const draw = new Draw({ id: 'canvas' }, pluginList)

        const lexer = new Lexer(code.value)
        tokens.value = lexer.tokenizer()
        ast.value = lexer.parser()
        const traverse_list = lexer.traverse()

        queue.value = useTraverse(traverse_list)
        let end = 0
        queue.value.map((v) => {
          const line = v?.loc?.start?.line ?? 0

          if (end !== 0 && line > end) {
            draw.blockEnd()
            end = 0
          }

          draw.insert(v.name, v.params)

          // 块元素
          if (v.name === 'IfStatement') {
            draw.blockStart()
            draw.blockAddText(`if(${v.params.left} ${v.params.operator} ${v.params.right})`)
            draw.insert('Expression', {
              left: v.params.left,
              right: v.params.right,
              operator: v.params.operator,
              result: v.params.result
            })
            end = v?.loc?.end?.line ?? 0
          }
        })

        draw.render(100)
      } catch (err: any) {
        error.value = err.message
        console.error(err)
      }
    }

    return { is_run, code, tokens, ast, error, run, queue }
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
