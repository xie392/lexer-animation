const ast = {
  type: 'BinaryExpression',
  left: {
    type: 'BinaryExpression',
    left: {
      type: 'BinaryExpression',
      left: {
        type: 'NumericLiteral',
        value: 1
      },
      operator: '+',
      right: {
        type: 'NumericLiteral',
        value: 11
      }
    },
    operator: '+',
    right: {
      type: 'NumericLiteral',
      value: 20
    }
  },
  operator: '+',
  right: {
    type: 'NumericLiteral',
    value: 3
  }
}

// 1 + 10 + 20 + 3

function evaluate(ast) {

  if (ast.type !== 'BinaryExpression') {
    return ast.value
  }

  const { left, right, operator } = ast

  const leftValue = evaluate(left)
  const rightValue = evaluate(right)

  switch (operator) {
    case '+':
      return leftValue + rightValue
    case '-':
      return leftValue - rightValue
    case '*':
      return leftValue * rightValue
    case '/':
      return leftValue / rightValue
    default:
      throw new Error(`Unsupported operator: ${operator}`)
  }
}

const result = evaluate(ast)
console.log(result) // 输出 34

// let a = 1
// a = 1 + 10 + 20 + 3
