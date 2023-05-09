import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'
import { useBinaryExpression } from '$/hooks/useBinaryExpression'

/**
 * 处理 if / else if 语句
 * @param {t.IfStatement} node
 * @param {LexerInterface} _this
 * @returns {boolean}
 */
function useIfStatement(node: t.IfStatement, _this: LexerInterface): boolean {
  const { test } = node
  let result = false

  // 判断条件是否成立 普通表达式
  if (test && test.type === 'BinaryExpression') {
    result = useBinaryExpression(test, _this)
  }

  // TODO: 逻辑表达式
  // if (test && test.type === 'LogicalExpression'){}

  // TODO: 赋值表达式 如果是赋值表达式需要先执行赋值操作 再判断条件是否成立
  // if (test && test.type === 'AssignmentExpression'){}

  // console.log('if 判断结果 -> ', result)

  // 条件不成立，里面的语句不执行，需要跳过
  if (!result) {
    _this.skip.push({
      start: node.consequent?.loc?.start?.line as number,
      end: node.consequent?.loc?.end?.line as number
    })
  }
  _this.queue.push(node)

  return result
}

export default useIfStatement
