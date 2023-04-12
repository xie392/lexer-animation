import { CompilerInterface, LangInterface } from './types/index'
import C from 'lexer/core/C/index'

export default class Compiler implements CompilerInterface {
  lang: LangInterface

  input: string

  constructor(language = 'C', input = '') {
    let Languages = { C }
    // @ts-ignore
    this.lang = new Languages[language]()
    this.input = input
  }

  tokenizer() {
    return this.lang.tokenizer()
  }

  parser() {
    return this.lang.parser()
  }
}
