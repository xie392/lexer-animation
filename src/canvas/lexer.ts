import { LexerInterface, StackInterface, HeapInterface, QueueInterface } from '$/types/lexer'
import * as acorn from 'acorn'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
// import generator from '@babel/generator'
import { codeFrameColumns } from '@babel/code-frame'

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

  skip: number[] = []

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

  heap_push(declaration: HeapInterface) {
    this.heap.push(declaration)
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
      enter(path) {
        // 检查变量是否定义
        if (path.isIdentifier() && !path.scope.hasBinding(path.node.name)) {
          const error = new Error(`Variable '${path.node.name}' is not defined\n`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // @ts-ignore 检查函数是否定义
        if (path.isCallExpression() && !path.scope.hasBinding(path.node.callee.name)) {
          // @ts-ignore
          const error = new Error(`Function '${path.node.callee.name}' is not defined\n`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // @ts-ignore 检查对象是否定义
        if (path.isMemberExpression() && !path.scope.hasBinding(path.node.object.name)) {
          // @ts-ignore
          const error = new Error(`Object '${path.node.object.name}' is not defined\n`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // 检查未定义的变量赋值
        if (
          path.isAssignmentExpression() &&
          path.node.operator === '=' &&
          // @ts-ignore
          !path.scope.hasBinding(path.node.left.name)
        ) {
          // @ts-ignore
          const error = new Error(`Cannot assign to undefined variable '${path.node.left.name}'\n`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // 检查未定义的常量赋值
        if (
          path.isVariableDeclarator() &&
          !path.node.init &&
          // @ts-ignore
          !path.scope.hasBinding(path.node.id.name)
        ) {
          // @ts-ignore
          const error = new Error(`Cannot declare undefined constant '${path.node.id.name}'\n`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // 检查赋值的情况
        if (path.isAssignmentExpression() && path.node.operator !== '=') {
          // @ts-ignore
          const error = new Error(`Cannot assign value to ${path.node.left.name}`)
          const location = path.node.loc
          _this.throwError(error.message, location as t.SourceLocation)
        }

        // console.log('enter', path)
      },

      // 退出节点
      // exit(path) {
      //   console.log('exit', path)
      //   _this.queue.push({
      //     type: 'exit',
      //     node: path.node,
      //     parent: path.parent,
      //     key: path.key
      //   })
      // }
      // 声明节点
      VariableDeclaration(path) {
        _this.handleVariableDeclaration(path.node)
      },
      // 表达式节点
      ExpressionStatement(path) {
        _this.handleExpressionStatement(path.node)
      },
      // if语句
      IfStatement(path) {
        _this.handleIfStatement(path.node)
      },
      // 函数
      FunctionDeclaration(path) {
        _this.handleFunctionDeclaration(path.node)
      },
      // 函数调用
      CallExpression(path) {
        _this.handleCallExpression(path.node)
      }
    })

    console.log('任务队列：', this.queue)
  }

  /**
   * 抛出错误
   * @param message   错误信息
   * @param location  错误位置
   */
  throwError(message: string, location: t.SourceLocation) {
    const error = new Error(message)
    const result = codeFrameColumns(this.code, location as any, {
      highlightCode: true,
      message: error.message
    })
    throw new Error(result)
  }

  /**
   * 从后面往回找栈中的变量
   * @param name 变量名
   * @returns
   */
  findStack(name: string) {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (this.stack[i].name === name) {
        return this.stack[i]
      }
    }
    return null
  }

  /**
   * 处理变量声明
   * @param {t.VariableDeclaration} path
   * @returns {void}
   */
  handleVariableDeclaration(node: t.VariableDeclaration) {
    const { declarations } = node

    for (const declaration of declarations) {
      const { id, init } = declaration
      // @ts-ignore
      const name = (id?.name as string) || ''
      // @ts-ignore
      const value = init?.value || null
      const type = init?.type || null
      const kind = node?.kind || null
      // 是否是常量
      const constant = node?.kind === 'const' ? true : false
      // 进栈
      this.stack_push({ name, value, type, kind, const: constant })
    }

    const line = node.loc?.start.line as number

    // 如果没有要跳过的行号就添加到队列
    if (!this.skip.includes(line)) {
      this.queue_push({
        name: 'Statement',
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
  }

  /**
   * 处理函数调用
   * @param {t.CallExpression} node
   * @returns {void}
   */
  handleCallExpression(node: t.CallExpression) {
    const { callee, arguments: args } = node
    // @ts-ignore
    const name = callee?.name || ''
    const params = args?.map((item) => {
      // @ts-ignore
      return item?.value || null
    })

    console.log('函数调用', name, params, node)

    // this.queue_push({
  }

  /**
   * 处理表达式
   * TODO: 表达式类型判断，目前只处理简单判断或赋值
   * @param {Nt.ExpressionStatement} node
   * @returns {void}
   */
  handleExpressionStatement(node: t.ExpressionStatement) {
    // 赋值表达式
    if (node.expression.type === 'AssignmentExpression') {
      this.handleAssignmentExpression(node.expression)
    }

    // 普通表达式 a < b 1 + 2
    if (node.expression.type === 'BinaryExpression') {
      // const flag = this.handleBinaryExpression(path.node.expression)
      // console.log('普通表达式', path.node.expression)
    }

    // 逻辑表达式
    // if (path.node.expression.type === 'LogicalExpression') {
    //   const flag = this.handleLogicalExpression(path.node.expression)
    //   console.log('逻辑表达式', flag, path.node.expression)
    // }
  }

  /**
   * 处理if语句
   * @param {t.IfStatement} node
   * @returns {void}
   */
  handleIfStatement(node: t.IfStatement) {
    const { test } = node
    let result = false

    // 判断条件是否成立 普通表达式
    if (test && test.type === 'BinaryExpression') {
      result = this.handleBinaryExpression(test)
    }

    // TODO: 逻辑表达式
    // if (test && test.type === 'LogicalExpression')
    // TODO: 赋值表达式 如果是赋值表达式需要先执行赋值操作 再判断条件是否成立
    // if (test && test.type === 'AssignmentExpression')

    // 条件不成立，里面的语句不执行，需要跳过
    if (!result) {
      // @ts-ignore
      const body = path.node.consequent.body || []
      // @ts-ignore
      const number_list = body.map((item) => item.loc?.start.line)
      // 添加队列时需要跳过的行数
      this.skip.push(...number_list)
    }
  }

  /**
   * 处理函数声明
   * @param {t.FunctionDeclaration} node
   * @returns {void}
   */
  handleFunctionDeclaration(node: t.FunctionDeclaration) {
    const { id, params, body, loc } = node
    // console.log('函数声明', node)
    const location = {
      start: loc?.start.line || 0,
      end: loc?.end.line || 0
    }

    // 把函数添加到堆中
    this.heap_push({
      name: id?.name || '',
      // @ts-ignore
      params: params.map((item) => item?.name),
      body,
      loc: location
    })

    // 需要跳过的行数
    this.skip.push(location.start, location.end)
  }

  /**
   * 处理逻辑表达式
   * TODO: 未完成 代码有问题
   * @param {t.LogicalExpression} node
   */
  handleLogicalExpression(node: t.LogicalExpression) {
    let flag = false
    let left_flag
    let right_flag

    if ('left' in node) {
      // 不是最里层的逻辑表达式，递归处理
      this.handleLogicalExpression(node.left as t.LogicalExpression)
    } else {
      console.log('left', node)
      // @ts-ignore
      const { name, value } = node
      if (name) {
        // 查找变量
        const stack = this.findStack(name)
        if (stack) {
          left_flag = stack.value
        }
      } else {
        left_flag = value
      }
    }

    if ('right' in node) {
      this.handleLogicalExpression(node.right as t.LogicalExpression)
    } else {
      // @ts-ignore
      const { name, value } = node
      if (name) {
        // 查找变量
        const stack = this.findStack(name)
        if (stack) {
          right_flag = stack.value
        }
      } else {
        right_flag = value
      }
    }

    switch (node.operator) {
      case '&&':
        flag = left_flag && right_flag
        break
      case '||':
        flag = left_flag || right_flag
        break
      case '??':
        flag = left_flag ?? right_flag
        break
      default:
        flag = false
    }

    return flag
  }

  /**
   * 处理普通表达式
   * @param {t.BinaryExpression} node
   * @returns {boolean}
   * @example
   * a < b
   * a <= b
   */
  handleBinaryExpression(node: t.BinaryExpression) {
    let flag = false
    let left_flag
    let right_flag

    // @ts-ignore
    const { name: left_naem, value: left_value } = node.left
    // @ts-ignore
    const { name: right_naem, value: right_value } = node.right

    if (left_naem) {
      // 查找变量
      const stack = this.findStack(left_naem)
      if (stack) {
        left_flag = stack.value
      }
    } else {
      left_flag = left_value
    }

    if (right_naem) {
      // 查找变量
      const stack = this.findStack(right_naem)
      if (stack) {
        right_flag = stack.value
      }
    } else {
      right_flag = right_value
    }

    flag = this.handleExpression(left_flag, right_flag, node.operator)

    return flag
  }

  /**
   * 处理赋值表达式
   * TODO: 如果右边有多个值，需要先计算右边的值，再赋值 a = b = 1 a = b + 1
   * @param {t.AssignmentExpression} node
   * @returns {void}
   * @example
   * a = 1
   * a = b = 1
   * a = b + 1
   * a = b + c + 1
   */
  handleAssignmentExpression(node: t.AssignmentExpression) {
    // @ts-ignore
    const { name } = node.left

    // right 右边的值 可能有多个 例如：a = b = 1
    // let right_value = null

    // @ts-ignore
    // right_value = node.right.value

    const right_value = this.handleBasicExpression(node.right)

    console.log('handleAssignmentExpression -> right_value', right_value)

    const stack = this.findStack(name)

    // 修改栈中的值
    if (stack) {
      // 如果是常量，不允许修改
      if (stack.const) throw new Error(`Error: Assignment to constant variable: "${name}"`)
      stack.value = right_value || null
      // @ts-ignore
      stack.type = node.right?.type || null
    }

    const line = node.loc?.start.line as number

    // 如果没有要跳过的行号就添加到队列
    if (!this.skip.includes(line)) {
      this.queue_push({
        name: 'AssignmentExpression',
        params: {
          left: name,
          right: right_value || null
        }
      })
    }
  }

  /**
   * 计算表达式结果
   * @param {any} left
   * @param {any} right
   * @param {operator} string
   * @returns {any}
   */
  handleExpression(left: any, right: any, operator: string) {
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
  handleBasicExpression(node: t.BinaryExpression): any {
    if (node.type !== 'BinaryExpression') {
      // @ts-ignore
      const { name, value } = node
      return name ? this.findStack(name)?.value : value
    }

    const { left, right, operator } = node

    const leftValue = this.handleBasicExpression(left as t.BinaryExpression)
    const rightValue = this.handleBasicExpression(right as t.BinaryExpression)

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
}

export default Lexer
