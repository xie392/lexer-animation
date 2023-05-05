import { LexerInterface, StackInterface, HeapInterface } from '$/types/lexer'
import * as acorn from 'acorn'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'

/**
 * 伪编译器,主要用于解析程序
 * @export Lexer
 * @class Lexer
 * @implements {LexerInterface}
 */
class Lexer implements LexerInterface {
  heap: HeapInterface[] = []
  stack: StackInterface[] = []

  code: string = ''
  tokens: acorn.Token[] = []
  ast: parser.ParseResult<any> = {}

  constructor(code: string = '') {
    this.code = code
  }

  stack_push(declaration: StackInterface) {
    this.stack.push(declaration)
  }

  stack_del(name: string) {
    this.stack = this.stack.filter((item) => item.name !== name)
  }

  stack_pop() {
    return this.stack.pop()
  }

  tokenizer() {
    const tokens_list = acorn.tokenizer(this.code, { ecmaVersion: 2020 })
    const tokens: acorn.Token[] = []
    for (const token of tokens_list) {
      tokens.push(token)
    }
    this.tokens = tokens
    return tokens
  }

  parser() {
    const ast_list = parser.parse(this.code)
    this.ast = ast_list
    return ast_list
  }

  traverse() {
    // 如果没有语法树，先生成语法树
    if (!this.ast) this.parser()

    // 开始遍历
    traverse(this.ast, {
      enter(path) {
        console.log(path)
      }
    })
  }
}

export default Lexer
