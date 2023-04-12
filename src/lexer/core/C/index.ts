import { Tokenizer } from './lexer/tokenizer'
import { Parser } from './lexer/parser'
import { TokenInterface } from 'lexer/types/index'

export default class C {
  input: string
  tokens: Array<TokenInterface>
  ast: any[]

  constructor(input: string) {
    this.input = input
    this.tokens = []
    this.ast = []
  }

  tokenizer() {
    let tokenizer = new Tokenizer(this.input)
    this.tokens = tokenizer.init()
    console.log('tokens:', this.tokens)
    return this.tokens
  }

  parser() {
    if (this.tokens.length === 0) this.tokenizer()
    let parser = new Parser(this.tokens)
    this.ast = parser.init()
    console.log('ast部分:', this.ast)
    console.log('ast完整:', JSON.stringify(this.ast, null, 2))
    return this.ast
  }
}
