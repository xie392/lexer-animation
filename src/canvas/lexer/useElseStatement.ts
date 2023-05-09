import { LexerInterface } from '$/types/lexer'
import * as t from '@babel/types'

/**
 * 处理 else 语句
 * @param {t.Statement} node
 * @param {LexerInterface} _this
 * @returns {void}
 */
function useElseStatement(node: t.Statement, _this: LexerInterface) {
  console.log('else 语句 -> ', node)
}

export default useElseStatement
