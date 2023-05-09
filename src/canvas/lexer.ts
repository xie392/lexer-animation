import {
  LexerInterface,
  StackInterface,
  HeapInterface,
  QueueInterface,
  LocationInterface
} from '$/types/lexer'
import * as acorn from 'acorn'
import * as parser from '@babel/parser'
import * as tr from '@babel/traverse'
import * as t from '@babel/types'
import { codeFrameColumns } from '@babel/code-frame'

const traverse = tr.default as typeof tr.default

// 伪编译器解析器
import useCheckError from '$/lexer/useCheckError'
import useVariableDeclaration from '$/lexer/useVariableDeclaration'
import useIfStatement from '$/lexer/useIfStatement'
import useFunctionDeclaration from '@/canvas/lexer/useFunctionDeclaration'
import useAssignmentExpression from '@/canvas/lexer/useAssignmentExpression'
import useElseStatement from '@/canvas/lexer/useElseStatement'

/**
 * 伪编译器,主要用于解析程序
 * @export Lexer
 * @class Lexer
 * @implements {LexerInterface}
 */
class Lexer implements LexerInterface {
  heap: HeapInterface[] = []
  stack: StackInterface[] = []

  code: string = ''
  tokens: acorn.Token[] = []
  ast: parser.ParseResult<any> = {}

  queue: QueueInterface[] = []

  skip: LocationInterface[] = []

  constructor(code: string = '') {
    this.code = code
  }

  tokenizer() {
    const tokens_list = acorn.tokenizer(this.code, { ecmaVersion: 2020 })
    const tokens: acorn.Token[] = []
    for (const token of tokens_list) {
      tokens.push(token)
    }
    this.tokens = tokens
    return tokens
  }

  parser() {
    const ast_list = parser.parse(this.code)
    this.ast = ast_list
    return ast_list
  }

  traverse() {
    // 如果没有语法树，先生成语法树
    if (!this.ast) this.parser()

    const _this = this

    // 开始遍历
    traverse(this.ast, {
      // 进入节点
      enter(path) {
        // 检查错误
        useCheckError(path, _this)
      },
      // 变量声明
      VariableDeclaration(path) {
        useVariableDeclaration(path.node, _this)
      },
      // if语句
      IfStatement(path) {
        let result = useIfStatement(path.node, _this)

        // 处理 else if
        if (path.node?.alternate && path.node.alternate.type === 'IfStatement') {
          result = useIfStatement(path.node, _this)
        }

        // 处理 else
        if (path.node?.alternate && path.node.alternate.type === 'BlockStatement') {
          // 如果 if 和 else if 都没有执行，执行 else
          if (!result) {
            useElseStatement(path.node.alternate, _this)
          } else {
            // 如果 if 或  else if  为真时需要跳过 else
            const { loc } = path.node.alternate
            _this.skip.push({
              start: loc?.start.line as number,
              end: loc?.end.line as number
            })
          }
        }
      },
      // 函数声明
      FunctionDeclaration(path) {
        useFunctionDeclaration(path.node, _this)
      },
      // 函数调用
      CallExpression(path) {
        _this.queue.push(path.node)
      },
      // 表达式
      ExpressionStatement(path) {
        const { node } = path

        // 赋值表达式 a = 1
        if (node.expression.type === 'AssignmentExpression') {
          console.log('赋值表达式 -> ', node.expression)
          useAssignmentExpression(node.expression, _this)
        }

        // 普通表达式 a < b 1 + 2
        if (node.expression.type === 'BinaryExpression') {
          console.log('普通表达式 -> ', node.expression)
        }

        // 逻辑表达式 a && b
        if (path.node.expression.type === 'LogicalExpression') {
          console.log('逻辑表达式 -> ', node.expression)
        }
      }
    })

    return {
      stack: this.stack,
      heap: this.heap,
      queue: this.queue
    }
  }

  throwError(message: string, location: t.SourceLocation) {
    const error = new Error(message)
    const result = codeFrameColumns(this.code, location as any, {
      highlightCode: true,
      message: error.message
    })
    throw new Error(result)
  }

  isSkip(line: number) {
    return this.skip.some((v) => v.start < line && v.end > line) || false
  }

  findStack(name: string) {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (this.stack[i].name === name) {
        return this.stack[i]
      }
    }
    return null
  }
}

export default Lexer
