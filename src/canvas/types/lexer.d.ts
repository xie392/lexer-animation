import * as acorn from 'acorn'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'

/**
 * 伪编译器接口
 * @export LexerInterface
 */
export class LexerInterface {
  /**
   * 栈，这里存放所有的变量
   */
  stack: StackInterface[]
  /**
   * 堆，这里存放所有的函数
   * @type {Array<HeapInterface>}
   * @memberof LexerInterface
   */
  heap: HeapInterface[]
  /**
   * 要解析的代码片段
   * @type {string}
   */
  code: string
  /**
   * 词法分析后的代码
   * @type {acorn.Token[]}
   */
  tokens: acorn.Token[]
  /**
   * 语法分析后的代码
   * @type {parser.ParseResult<any>}
   */
  ast: parser.ParseResult<any>
  /**
   * 进栈
   * @param {StackInterface} declaration 变量声明
   * @returns {void}
   */
  stack_push(declaration: StackInterface): void
  /**
   * 删除某个变量
   * @param {string} name 变量名
   * @returns {void}
   */
  stack_del(name: string): void
  /**
   * 出栈
   * @returns {StackInterface | undefined}
   */
  stack_pop(): StackInterface | undefined
  /**
   * 词法分析
   * @returns {}
   */
  tokenizer(): acorn.Token[]
  /**
   * 语法分析
   * @returns {void}
   */
  parser(): parser.ParseResult<any>
  /**
   * 遍历语法树，这里主要用于解析函数，变量声明等
   * @returns {void}
   */
  traverse(): void
}

/**
 * 变量声明接口
 * @export VariableInterface
 */
export type VariableInterface =
  | string
  | number
  | boolean
  | Object
  | null
  | Function
  | undefined
  | symbol
  | bigint
  | int
  | float
  | double
  | long
  | short
  | byte
  | char
  | any

/**
 * 栈变量接口
 * @export StackInterface
 */
export interface StackInterface {
  /**
   * 变量名
   * @type {string}
   * @memberof HeapVariableInterface
   * @default ''
   */
  name: string
  /**
   * 变量值
   * @type {VariableInterface}
   * @default null
   */
  value: VariableInterface
  /**
   * 变量类型
   * @type {VariableInterface}
   * @memberof HeapVariableInterface
   * @default 'any'
   */
  type: VariableInterface
  /**
   * 变量作用域
   * @type {('global' | 'local')} global 全局变量 local 局部变量
   * @memberof HeapVariableInterface
   * @default 'global'
   */
  scope: 'global' | 'local'
  /**
   * 变量是否为常量
   * @type {boolean} true 常量 false 变量 const 不可修改
   * @memberof HeapVariableInterface
   * @default false
   */
  const: boolean
  /**
   * 位置
   * @type {{
   *   start: number
   *  end: number
   * }}
   * @memberof HeapVariableInterface
   */
  loc: {
    /**
     * 开始位置
     * @type {number}
     * @memberof FunctionDeclarationInterface
     * @default 0
     */
    start: number
    /**
     * 结束位置
     * @type {number}
     * @memberof FunctionDeclarationInterface
     * @default 0
     * @description 如果没有结束位置，那么就是 0
     */
    end: number
  }
}

/**
 * 堆声明接口
 * @export HeapInterface
 */
export interface HeapInterface {
  /**
   * 函数名
   * @type {string}
   * @default ''
   */
  name: string
  /**
   * 函数参数
   * @type {Array<any>}
   * @default []
   */
  params: Array<{
    /**
     * 参数名
     * @type {string}
     * @default ''
     */
    name: string
    /**
     * 参数默认值
     * @type {VariableInterface}
     * @default null
     * @description 如果没有默认值，那么就是 undefined
     */
    value?: VariableInterface
  }>
  /**
   * 函数返回值
   * @type {any}
   * @default undefined
   * @description 如果没有返回值，那么就是 undefined
   */
  return?: any
  /**
   * 函数体
   * @type {Array<VariableDeclarationInterface>}
   * @default []
   */
  body: Array<VariableDeclarationInterface | HeapInterface>
  /**
   * 位置
   * @type {{
   *   start: number
   *  end: number
   * }}
   * @default { start: 0, end: 0 }
   * @description 如果没有位置，那么就是 { start: 0, end: 0 }
   */
  loc: {
    /**
     * 开始位置
     * @type {number}
     * @default 0
     */
    start: number
    /**
     * 结束位置
     * @type {number}
     * @default 0
     * @description 如果没有结束位置，那么就是 0
     */
    end: number
  }
}
