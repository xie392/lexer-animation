import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import Draw, { pluginList, Lexer } from '$/index'
// import * as tokenizer from '@babel/tokenizer'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'

interface AstNode {
  type: string
  value?: any
  [key: string]: any
}

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
      // const tokens_list = acorn.tokenizer(code.value, { ecmaVersion: 2020 })
      // const list = []
      // for (const token of tokens_list) {
      //   list.push(token)
      // }
      // const ast_list = parser.parse(code.value)
      // tokens.value = list
      // ast.value = ast_list
      // const draw = new Draw({ id: 'canvas' }, pluginList)
      const lexer = new Lexer(code.value)
      const tokens = lexer.tokenizer()
      const ast = lexer.parser()
      // console.log('tokens', tokens)
      // console.log('ast', ast)
      lexer.traverse()
      // traverse(ast_list, {
      //   // 变量声明
      //   VariableDeclaration(path) {
      //     console.log('VariableDeclaration', path)
      //     const declaration = path.node.declarations.map((item: any) => {
      //       return {
      //         name: item.id.name as string,
      //         value: item.init.value as any
      //       }
      //     })
      //     // 添加变量
      //     // declaration.map((v) => {
      //     //   lexer.setDeclaration({
      //     //     name: v.name,
      //     //     value: v.value,
      //     //     type: typeof v.value,
      //     //     scope: 'global',
      //     //     const: path.node.kind === 'const' ? true : false
      //     //   })
      //     // })
      //     // draw.insert('Statement', {
      //     //   kind: path.node.kind,
      //     //   body: path.node.declarations.map((item: any) => {
      //     //     return {
      //     //       name: item.id.name,
      //     //       value: item.init.value
      //     //     }
      //     //   })
      //     // })
      //   },
      //   // if 语句
      //   IfStatement(path) {
      //     // console.log('IfStatement', path.node.test)
      //   },
      //   // 表达式
      //   ExpressionStatement(path) {},
      //   // 赋值表达式
      //   AssignmentExpression(path) {
      //     // console.log('AssignmentExpression', path.node)
      //   },
      //   // 函数声明
      //   FunctionDeclaration(path) {
      //     // console.log('FunctionDeclaration', path.node)
      //     // lexer.setFunction({
      //     //   name: path.node?.id?.name as string,
      //     //   params: path.node.params.map((item: any) => {
      //     //     return {
      //     //       name: item.name
      //     //     }
      //     //   }),
      //     //   loc: {
      //     //     start: path.node?.loc?.start?.line as number,
      //     //     end: path.node?.loc?.end?.line as number
      //     //   }
      //     // body: path.node.body.body.map((item: any) => {
      //     //   return {
      //     //     name: item.name as string,
      //     //     value: item.value
      //     //   }
      //     // })
      //     // })
      //   },
      //   // 箭头函数
      //   ArrowFunctionExpression(path) {
      //     console.log('ArrowFunctionExpression', path.node)
      //   }
      // })
      // console.log(lexer.declarations)
      // draw.render(100)
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
