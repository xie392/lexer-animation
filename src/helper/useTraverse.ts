import { StackInterface, HeapInterface, QueueInterface } from '$/types/lexer'
import * as t from '@babel/types'
import { useBasicExpression, findStack } from '@/hooks/useBasicExpression'
import { useBinaryExpression } from '@/hooks/useExpressionResult'

interface ListInterface {
  stack: StackInterface[]
  heap: HeapInterface[]
  queue: QueueInterface[]
}

export interface QueueListInterface {
  name: string
  params?: any
  loc?: t.SourceLocation | null | undefined
}

/**
 * 遍历队列
 * @param {ListInterface} traverseList
 */
function useTraverse(traverseList: ListInterface) {
  const queue_list: QueueListInterface[] = []

  const { stack, queue } = traverseList

  queue.map((v) => {
    const { type } = v

    // 声明变量
    if (type === 'VariableDeclaration') {
      queue_list.push({
        name: 'Statement',
        params: {
          kind: v.kind,
          body: v.declarations.map((item) => {
            return {
              name: (item.id as t.Identifier)?.name,
              // @ts-ignore
              value: item.init ? item.init?.value : 'NULL'
            }
          })
        },
        loc: v.loc
      })
    }

    // 赋值表达式
    if (type === 'AssignmentExpression') {
      const result = useBasicExpression(v.right as t.BinaryExpression, stack)
      console.log('表达式计算结果 -> ', result)
      queue_list.push({
        name: 'Expression',
        params: {
          left: (v.left as t.Identifier)?.name,
          // @ts-ignore  TODO: 目前只有简单的赋值
          right: (v.right as t.Identifier).name ?? v.right.value,
          operator: '=',
          result: result
        }
      })
    }

    // if 声明
    if (type === 'IfStatement') {
      const result = useBinaryExpression(v.test as t.BinaryExpression, stack)

      queue_list.push({
        name: 'IfStatement',
        params: {
          // @ts-ignore
          left: v.test?.left.name ?? v.test?.left?.value,
          // @ts-ignore
          right: v.test?.right?.name ?? v.test?.right?.value,
          // @ts-ignore
          operator: v.test.operator,
          result
        },
        loc: v.loc
      })
    }
  })

  console.log('queue_list -> ', queue)

  return queue_list
}

export default useTraverse
