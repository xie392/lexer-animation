import * as t from '@babel/types'

/**
 * 表达式
 * @param {(t.LogicalExpression | t.AssignmentExpression | t.BinaryExpression)} node
 * @export Expression
 */
export function useExpression(
  node: t.LogicalExpression | t.AssignmentExpression | t.BinaryExpression
) {}

/**
 * 逻辑表达式
 * @param {t.LogicalExpression} node
 * @returns {boolean}
 * @example
 * a < b && b < c
 */
// export function useLogicalExpression(node: t.LogicalExpression): boolean {
//   let flag = false

//   const { left, right } = node

//   if ('left' in left) {
//     // flag = useLogicalExpression(left)
//   }

//   return flag
// }

/**
 * 二元表达式
 * @param {t.BinaryExpression} node
 * @returns {boolean}
 * @memberof Expression
 * @example
 * 1 + 1
 * 1 - 1
 */
export function useBinaryExpression(node: t.BinaryExpression): boolean {
  let flag = false

  if (node.left.type === 'BinaryExpression') {
    flag = useBinaryExpression(node.left)
  }

  return flag
}

const ex = {
  left: {
    left: {
      value: 1
    },
    operator: '<',
    right: {
      value: '2'
    }
  },
  operator: '&&',
  right: {
    left: {
      value: 3
    },
    operator: '<',
    right: {
      value: 4
    }
  }
}
