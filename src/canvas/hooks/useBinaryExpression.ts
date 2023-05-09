import * as t from '@babel/types'
import { LexerInterface } from '$/types/lexer'
import { useExpressionResult } from '$/hooks/useExpression'

/**
 * 处理 if / else if 的判断条件，目前只支持普通表达式
 * @param {t.BinaryExpression} node
 * @returns {boolean}
 * @example
 * 1 > 0 -> true
 */
export function useBinaryExpression(node: t.BinaryExpression, _this: LexerInterface): boolean {
  let flag = false
  let left_flag
  let right_flag

  // @ts-ignore
  const { name: left_naem, value: left_value } = node.left
  // @ts-ignore
  const { name: right_naem, value: right_value } = node.right

  if (left_naem) {
    // 查找变量
    const stack = _this.findStack(left_naem)
    if (stack) {
      left_flag = stack.value
    }
  } else {
    left_flag = left_value
  }

  if (right_naem) {
    // 查找变量
    const stack = _this.findStack(right_naem)
    if (stack) {
      right_flag = stack.value
    }
  } else {
    right_flag = right_value
  }

  flag = useExpressionResult(left_flag, right_flag, node.operator)

  return flag
}

/**
 * 处理基本的四则运算
 * @param {t.BinaryExpression} node
 * @returns {any}
 */
export function useBasicExpression(node: t.BinaryExpression, _this: LexerInterface): any {
  if (node.type !== 'BinaryExpression') {
    // @ts-ignore
    const { name, value } = node
    return name ? _this.findStack(name)?.value : value
  }

  let result

  const { left, right, operator } = node

  const leftValue = useBasicExpression(left as t.BinaryExpression, _this)
  const rightValue = useBasicExpression(right as t.BinaryExpression, _this)

  switch (operator) {
    case '+':
      result = leftValue + rightValue
      break
    case '-':
      result = leftValue - rightValue
      break
    case '*':
      result = leftValue * rightValue
      break
    case '/':
      result = leftValue / rightValue
      break
    default:
      throw new Error(`Unsupported operator: ${operator}`)
  }

  return result
}
