import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import * as acorn from 'acorn'
// import * as walk from 'acorn-walk'
import Draw, { pluginList } from '$/index'
import * as parser from '@babel/parser'
// import * as types from '@babel/types'
import traverse from '@babel/traverse'
import * as t from '@babel/types'

type Node = t.Node

interface AstNode {
  type: string
  value?: any
  [key: string]: any
}

// const createCanvas = () => {
//   const draw = new Draw({ id: 'canvas' }, pluginList)
//   draw.insert('Statement', {
//     kind: 'int',
//     body: [
//       {
//         name: 'a',
//         value: 11
//       },
//       {
//         name: 'b',
//         value: 1001
//       }
//     ]
//   })

//   draw.blockStart()

//   draw.blockAddText(`if (a < b) {`)
//   draw.blockAddText(`   a = b`)
//   draw.blockAddText(`}`)

//   draw.insert('Expression', {
//     left: 'a',
//     right: 'b',
//     operator: '<',
//     result: 'true'
//   })

//   draw.insert('Expression', {
//     left: 'a',
//     right: 'b',
//     operator: '=',
//     result: 'a = 1012'
//   })

//   draw.blockEnd()

//   draw.render(10)
// }

export const useRunStore = defineStore(
  'run',
  () => {
    // 是否运行
    const is_run = ref<boolean>(false)
    const code = ref<string>('')
    const tokens = ref<any[]>([])
    const ast = ref<any>({})

    // 监听是否运行
    watch(is_run, () => {
      // 解析代码
      const tokens_list = acorn.tokenizer(code.value, { ecmaVersion: 2020 })

      const list = []

      for (const token of tokens_list) {
        list.push(token)
      }

      const ast_list = parser.parse(code.value)

      tokens.value = list
      ast.value = ast_list

      const draw = new Draw({ id: 'canvas' }, pluginList)

      traverse(ast_list, {
        VariableDeclaration(path) {
          // console.log('VariableDeclaration', path.node)
          draw.insert('Statement', {
            kind: path.node.kind,
            body: path.node.declarations.map((item: any) => {
              return {
                name: item.id.name,
                value: item.init.value
              }
            })
          })
        },
        ExpressionStatement(path) {
          console.log('ExpressionStatement', path.node.expression)
          // 递归遍历
          const recursion = (node: Node) => {
            // left
          }
        },
        IfStatement(path) {
          console.log('IfStatement', path.node.test)
        },
        BinaryExpression(path) {
          console.log('BinaryExpression', path)
          // draw.insert('Expression', {
          //   left: path.node.left.name,
          //   right: path.node.right.name,
          //   operator: path.node.operator,
          //   result: path.node.left.name + path.node.operator + path.node.right.name
          // })
        },
        CallExpression(path) {
          console.log('CallExpression', path.node)
        }
      })

      draw.render(100)
    })

    return { is_run, code, tokens, ast }
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
