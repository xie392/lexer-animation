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
 * 处理基本的四则运算
 * @param {t.BinaryExpression} node
 * @returns {any}
 */
// export function handleBasicExpression(node: t.BinaryExpression): any {
//   if (node.type !== 'BinaryExpression') {
//     // @ts-ignore
//     const { name, value } = node
//     return name ? this.findStack(name)?.value : value
//   }

//   const { left, right, operator } = node

//   const leftValue = this.handleBasicExpression(left as t.BinaryExpression)
//   const rightValue = this.handleBasicExpression(right as t.BinaryExpression)

//   switch (operator) {
//     case '+':
//       return leftValue + rightValue
//     case '-':
//       return leftValue - rightValue
//     case '*':
//       return leftValue * rightValue
//     case '/':
//       return leftValue / rightValue
//     default:
//       throw new Error(`Unsupported operator: ${operator}`)
//   }
// }
