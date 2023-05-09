import { findStack } from '@/hooks/useBasicExpression'
import { StackInterface } from '$/types/lexer'
import * as t from '@babel/types'

/**
 * 计算表达式结果
 * @param {any} left
 * @param {any} right
 * @param {operator} string
 * @returns {any}
 */
export function useExpressionResult(left: any, right: any, operator: string) {
  let result = null
  switch (operator) {
    case '+':
      result = left + right
      break
    case '-':
      result = left - right
      break
    case '*':
      result = left * right
      break
    case '/':
      result = left / right
      break
    case '%':
      result = left % right
      break
    case '>':
      result = left > right
      break
    case '>=':
      result = left >= right
      break
    case '<':
      result = left < right
      break
    case '<=':
      result = left <= right
      break
    case '==':
      result = left == right
      break
    case '===':
      result = left === right
      break
    case '!=':
      result = left != right
      break
    case '!==':
      result = left !== right
      break
    case '&&':
      result = left && right
      break
    case '||':
      result = left || right
      break
    case '??':
      result = left ?? right
      break
    default:
      result = null
      break
  }

  return result
}

/**
 * 处理 if / else if 的判断条件，目前只支持普通表达式
 * @param {t.BinaryExpression} node
 * @returns {boolean}
 * @example
 * 1 > 0 -> true
 */
export function useBinaryExpression(node: t.BinaryExpression, _stack: StackInterface[]): boolean {
  let flag = false
  let left_flag
  let right_flag

  // @ts-ignore
  const { name: left_naem, value: left_value } = node.left
  // @ts-ignore
  const { name: right_naem, value: right_value } = node.right

  if (left_naem) {
    // 查找变量
    const stack = findStack(left_naem, _stack)
    if (stack) {
      left_flag = stack.value
    }
  } else {
    left_flag = left_value
  }

  if (right_naem) {
    // 查找变量
    const stack = findStack(right_naem, _stack)
    if (stack) {
      right_flag = stack.value
    }
  } else {
    right_flag = right_value
  }

  flag = useExpressionResult(left_flag, right_flag, node.operator)

  return flag
}
