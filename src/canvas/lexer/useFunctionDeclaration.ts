import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'

/**
 * 处理函数声明
 * @param {t.FunctionDeclaration} node
 * @param {LexerInterface} _this
 * @returns {void}
 */
function useFunctionDeclaration(node: t.FunctionDeclaration, _this: LexerInterface) {
  const { id, params, body, loc } = node

  const location = {
    start: loc?.start.line || 0,
    end: loc?.end.line || 0
  }

  // 把函数添加到堆中
  _this.heap.push({
    name: id?.name || '',
    // @ts-ignore
    params: params.map((item) => item?.name),
    body,
    loc: location
  })

  // 需要跳过的行数
  _this.skip.push({
    start: location.start,
    end: location.end
  })
}

export default useFunctionDeclaration

