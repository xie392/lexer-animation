import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'
import { useBasicExpression } from '$/hooks/useBinaryExpression'

/**
 * 赋值表达式
 * @param {t.AssignmentExpression} node
 * @param {LexerInterface} _this
 * @returns {void}
 */
function useAssignmentExpression(node: t.AssignmentExpression, _this: LexerInterface) {

  // 如果在需要跳过的行列中
  if (_this.isSkip(node.loc?.start.line as number)) return

  // @ts-ignore
  const { name } = node.left

  const right_value = useBasicExpression(node.right as t.BinaryExpression, _this) || null

  // console.log(`赋值表达式:${name} -> :`, right_value)

  const stack = _this.findStack(name)

  // 修改栈中的值
  if (stack) {
    // 如果是常量，不允许修改
    if (stack.const) throw new Error(`Error: Assignment to constant variable: "${name}"`)
    stack.value = right_value || null
    // // @ts-ignore
    stack.type = node.right?.type || null
  }

  // 添加到队列
  _this.queue.push(node)
}

export default useAssignmentExpression
