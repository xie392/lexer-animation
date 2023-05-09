import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'
import { NodePath } from '@babel/traverse'

/**
 * 用于处理错误的函数
 * @param {string} code 代码
 * @param {string} message 错误信息
 * @param {t.SourceLocation} location 错误位置
 */
function useCheckError(path: NodePath<t.Node>, _this: LexerInterface) {
  // 检查变量是否定义
  if (path.isIdentifier() && !path.scope.hasBinding(path.node.name)) {
    const error = new Error(`Variable '${path.node.name}' is not defined\n`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }

  // @ts-ignore 检查函数是否定义
  if (path.isCallExpression() && !path.scope.hasBinding(path.node.callee.name)) {
    // @ts-ignore
    const error = new Error(`Function '${path.node.callee.name}' is not defined\n`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }

  // @ts-ignore 检查对象是否定义
  if (path.isMemberExpression() && !path.scope.hasBinding(path.node.object.name)) {
    // @ts-ignore
    const error = new Error(`Object '${path.node.object.name}' is not defined\n`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }

  // 检查未定义的变量赋值
  if (
    path.isAssignmentExpression() &&
    path.node.operator === '=' &&
    // @ts-ignore
    !path.scope.hasBinding(path.node.left.name)
  ) {
    // @ts-ignore
    const error = new Error(`Cannot assign to undefined variable '${path.node.left.name}'\n`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }

  // 检查未定义的常量赋值
  if (
    path.isVariableDeclarator() &&
    !path.node.init &&
    // @ts-ignore
    !path.scope.hasBinding(path.node.id.name)
  ) {
    // @ts-ignore
    const error = new Error(`Cannot declare undefined constant '${path.node.id.name}'\n`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }

  // 检查赋值的情况
  if (path.isAssignmentExpression() && path.node.operator !== '=') {
    // @ts-ignore
    const error = new Error(`Cannot assign value to ${path.node.left.name}`)
    const location = path.node.loc
    _this.throwError(error.message, location as t.SourceLocation)
  }
}

export default useCheckError
