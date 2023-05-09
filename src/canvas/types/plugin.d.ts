import Statement from '$/plugin/statement'
import Expression from '$/plugin/expression'
import AssignmentExpression from '@/canvas/plugin/AssignmentExpression'

/**
 * 插件类型
 * @export GroupKitInterface
 */
export type GroupKitInterface = typeof Statement | typeof Expression | typeof AssignmentExpression

/**
 * 结果类型
 * @interface ResultInterface
 */
export type TypeInterface =
  | string
  | number
  | boolean
  | null
  | undefined
  | object
  | Array<any>
  | Function
  | RegExp
  | Date
  | Error
  | Symbol
  | bigint

/**
 * 声明变量的参数
 * @interface StatementOptionsInterface
 */
export interface StatementOptionsInterface {
  /**
   * 变量声明的类型 let | const | var
   * @type {string}
   */
  kind: string
  /**
   * 变量内容
   * @type {Array<{ name: string; value: any }>}
   * @example
   * let a = 1, b = 2
   * [
   *  { name: 'a', value: 1 },
   *  { name: 'b', value: 2 },
   *  ...
   * ]
   */
  body: Array<{ name: string; value: any }>
}

/**
 * 表达式公共参数
 * @interface ExpressionOptionsInterface
 */
export interface ExpressionOptionsInterface {
  /**
   * 左边的值
   * @type {TypeInterface}
   */
  left: TypeInterface | ExpressionOptionsInterface
  /**
   * 右边的值
   * @type {string}
   */
  right: TypeInterface | ExpressionOptionsInterface
  /**
   * 运算符
   * @type {string}
   */
  operator: string
}

/**
 * 普通表达式 a + b   1 + 2
 * @interface ExpressionInterface
 * @extends {ExpressionOptionsInterface}
 */
export interface BinaryExpressionInterface extends ExpressionOptionsInterface {
  /**
   * 结果
   * @type {TypeInterface}
   * @description 用于存储结果
   */
  result: TypeInterface
}

/**
 * 赋值表达式 a = 1  a = b + 1
 * @interface AssignmentExpressionInterface
 * @extends {ExpressionOptionsInterface}
 */
export interface AssignmentExpressionInterface extends ExpressionOptionsInterface {
  /**
   * 左边的值
   * @type {string}
   * @example
   * a = 1  -> a
   */
  left: string
  /**
   * 右边值
   * @example
   * [
   *  {name: 'a', value: 1, type: 'variable'},
   *  {name: '+', type: 'operator'},
   * ]
   */
  right: Array<{
    name: string
    value?: string
    type: string
  }>
  /**
   * 结果
   * @type {string}
   */
  result: string
}


/**
 * if 参数
 * @interface IfStatementInterface
 * @extends {ExpressionOptionsInterface}
 */
// export interface IfStatementInterface extends ExpressionOptionsInterface {
//   /**
//    * 条件
//    * @type {string}
//    * @example
//    */
//   test: string

