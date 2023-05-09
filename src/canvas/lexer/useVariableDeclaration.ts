import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'

/**
 * 处理变量声明 把变量放入栈中
 * @param {t.VariableDeclaration} node 变量声明
 * @param {LexerInterface} _this 伪编译器
 */
function useVariableDeclaration(node: t.VariableDeclaration, _this: LexerInterface) {
  const { declarations } = node

  // 遍历所有的变量声明,并把变量放入栈中
  for (const declaration of declarations) {
    const { id, init } = declaration
    // 变量名
    const name = (id as t.Identifier)?.name || ''

    // @ts-ignore 变量初始化的值
    const value = init?.value || null

    // 变量类型 NumericLiteral StringLiteral BooleanLiteral ...
    const type = init?.type || null

    // 声明类型 let const var
    const kind = node?.kind || null

    // 是否是常量
    const constant = node?.kind === 'const' ? true : false

    // 进栈
    _this.stack.push({ name, value, type, kind, const: constant })
  }

  // 如果不在需要跳过的行数中
  if (!_this.isSkip(node.loc?.start.line as number)) {
    _this.queue.push(node)
  }
}

export default useVariableDeclaration
