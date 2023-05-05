import { LexerInterface, StackInterface, HeapInterface } from '$/types/lexer'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
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
  tokens: any[] = []
  ast: any[] = []

  constructor(language: string = 'javascript', code: string = '') {
    this.code = code
  }

  stack_push(declaration: StackInterface) {
    this.stack.push(declaration)
  }

  stack_del(name: string) {
    this.stack = this.stack.filter((item) => item.name !== name)
  }
}

export default Lexer
