import { LexerInterface, StackInterface, HeapInterface, QueueInterface } from '$/types/lexer'
import * as acorn from 'acorn'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import { NodePath } from '@babel/traverse'
import { VariableDeclaration, ExpressionStatement, IfStatement } from '@babel/types'

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

  constructor(code: string = '') {
    this.code = code
  }

  stack_push(declaration: StackInterface) {
    this.stack.push(declaration)
  }

  stack_del(name: string) {
    this.stack = this.stack.filter((item) => item.name !== name)
  }

  stack_pop() {
    return this.stack.pop()
  }

  queue_push(declaration: QueueInterface) {
    this.queue.push(declaration)
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
      // enter(path) {
      //   console.log('enter', path)
      // }
      // 退出节点
      // exit(path) {
      //   console.log('exit', path)
      // }
      // 声明节点
      VariableDeclaration(path) {
        _this.handleVariableDeclaration(path)
      },
      // 表达式节点
      ExpressionStatement(path) {
        _this.handleExpressionStatement(path)
      },
      // if语句
      IfStatement(path) {
        _this.handleIfStatement(path)
      }
    })
  }

  /**
   * 处理变量声明
   * @param {NodePath<VariableDeclaration>} path
   * @returns {void}
   */
  handleVariableDeclaration(path: NodePath<VariableDeclaration>) {
    // 作用域类型
    const scope_type = [
      'BlockStatement',
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'FunctionDeclaration',
      'FunctionExpression',
      'ArrowFunctionExpression',
      'WhileStatement',
      'DoWhileStatement',
      'IfStatement',
      'SwitchStatement',
      'TryStatement',
      'CatchClause',
      'WithStatement'
    ]

    const { node } = path
    const { declarations } = node

    for (const declaration of declarations) {
      const { id, init } = declaration
      // @ts-ignore
      const name = (id?.name as string) || ''
      // @ts-ignore
      const value = init?.value || null
      const type = init?.type || null
      const kind = node?.kind || null
      // 判断作用域
      const scope = scope_type.includes(path.scope?.block?.type) ? 'global' : 'local'
      const constant = node?.kind === 'const'
      // const locList = {
      //   start: loc?.start?.line || 0,
      //   end: loc?.end?.line || 0
      // }

      // 进栈
      this.stack_push({ name, value, type, kind, scope, const: constant })
    }

    // 添加到队列
    this.queue_push({
      name: 'statement',
      params: {
        kind: node?.kind || '',
        body: node?.declarations.map((item) => ({
          // @ts-ignore
          name: item?.id?.name || '',
          // @ts-ignore
          value: item?.init?.value || null
        }))
      }
    })
  }

  /**
   * 处理表达式
   * TODO: 表达式类型判断，目前只处理简单判断或赋值
   * @param {NodePath<ExpressionStatement>} path
   * @returns {void}
   */
  handleExpressionStatement(path: NodePath<ExpressionStatement>) {
    // console.log('handleExpressionStatement', path.node)
    // 表达式类型
    const expression_type = ['AssignmentExpression', 'BinaryExpression', 'LogicalExpression']

    if (!expression_type.includes(path.node.expression.type)) return

    // 赋值表达式
    // TODO: 目前只处理简单赋值,后续需要处理多重赋值 
    if (path.node.expression.type === 'AssignmentExpression') {
      const { left, right } = path.node.expression
      // @ts-ignore 判断是否在栈中
      const stack = this.stack.find((item) => item.name === left?.name)

      // 找不到变量有两种情况，一种是全局变量，一种是未定义
      if (!stack) {
        console.log('path.scope?.block?.type ', path.scope?.block?.type)

        // 全局变量
        if (path.scope?.block?.type === 'Program') {
          this.stack_push({
            // @ts-ignore
            name: left?.name as string,
            // @ts-ignore
            value: right?.value || null,
            type: right?.type || null,
            kind: 'var',
            scope: 'global',
            const: false
          })
        } else {
          // 未定义
          console.warn('变量未定义')
          // @ts-ignore
          throw new Error(`变量${left?.name}未定义`)
        }
      } else {
        // 判断是否是常量
        if (stack.const) {
          console.warn('常量不能修改')
          // @ts-ignore
          throw new Error(`Uncaught TypeError: Assignment to constant variable: "${left?.name}"`)
        }

        // @ts-ignore 修改变量值
        stack.value = right?.value || null

        // @ts-ignore 修改变量类型
        stack.type = right?.type || stack.type
      }
    }
  }

  /**
   * 处理if语句
   * @param {NodePath<IfStatement>} path
   * @returns {void}
   */
  handleIfStatement(path: NodePath<IfStatement>) {
    console.log('handleIfStatement', path.node)
    const { test, consequent, alternate } = path.node
  }
}

export default Lexer