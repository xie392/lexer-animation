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
    const error = ref<string>('')

    // 监听是否运行
    // watch(is_run, () => {})

    const run = () => {
      try {
        const lexer = new Lexer(code.value)
        tokens.value = lexer.tokenizer()
        ast.value = lexer.parser()
        lexer.traverse()
      } catch (err: any) {
        error.value = err.message
        console.error(err.message)
      }
    }

    return { is_run, code, tokens, ast, error, run }
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
