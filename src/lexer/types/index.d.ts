export interface LangInterface {
  input: string
  tokenizer(): any[]
  parser(): any[]
}

export interface CompilerInterface {
  // 语言
  lang: LangInterface
  // 输入
  input: string
  /**
   * 词法分析
   * @returns {any[]}
   */
  tokenizer(): any
  /**
   * 语法分析
   * @returns {any[]}
   */
  parser(): any
}

export interface TokenInterface {
  type: string
  value: string
  line: number
  column: number
  index: number
  length: number
  raw: string
  range: [number, number]
  loc: {
    start: {
      line: number
      column: number
    }
    end: {
      line: number
      column: number
    }
  }
}

export interface AstInterface {}
