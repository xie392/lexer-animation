import * as t from '@babel/types'
import { StackInterface } from '$/types/lexer'

export function findStack(name: string, stack: StackInterface[]) {
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].name === name) {
      return stack[i]
    }
  }
  return null
}

/**
 * 处理基本的四则运算
 * @param {t.BinaryExpression} node
 * @returns {any}
 */
export function useBasicExpression(node: t.BinaryExpression, stack: StackInterface[]): any {
  if (node.type !== 'BinaryExpression') {
    // @ts-ignore
    const { name, value } = node
    return name ? findStack(name, stack)?.value : value
  }

  let result

  const { left, right, operator } = node

  const leftValue = useBasicExpression(left as t.BinaryExpression, stack)
  const rightValue = useBasicExpression(right as t.BinaryExpression, stack)

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
