export class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.ast = { type: 'Program', body: [] }
    this.current = 0
    this.value = null
  }

  init() {
    while (this.current < this.tokens.length) {
      this.nextToken()
      this.ast.body.push(this.parser())
    }

    return this.ast
  }

  parser() {
    const tokens = this.value

    // 处理头文件
    if (this.matchValue('#')) {
      return this.includeDeclaration()
    }

    if (this.matchType('keyword')) {
      // return 类型
      // 1、变量/数字   => '1' 'a'
      // 2、三元表达式,表达式  => 'a+ b'  'a > 1 ? 1 : 0'
      // 3、函数(递归函数)    =>  'add(10,1)'
      // 必须以';'结尾
      if (this.matchValue('return')) {
        return this.returnStatement()
      }

      // 函数/变量声明 int double char
      if (declaration.has(tokens.value)) {
        return this.declaration()
      }

      // for 循环
      if (this.matchValue('for')) {
        return this.forStatement()
      }

      // while 循环
      if (this.matchValue('while')) {
      }

      // while 循环
      if (this.matchValue('switch')) {
      }

      // do while 循环
      if (this.matchValue('do')) {
      }

      // 判断
      if (this.matchValue('if')) {
      }
    }

    // 没有匹配到任何类型，就抛出错误
    console.log('遗漏tokens:', tokens)
  }

  /**
   * 查找索引位置的值
   * @param {number} next     索引跨度值
   * @param {boolean} flag    ture-增 flase-减
   * @returns {object}
   */
  nextToken(next, flag = true) {
    if (!next) {
      this.value = this.tokens[this.current++]
      return this.value
    }
    this.current = flag ? this.current + next : this.current - next

    if (this.current > this.tokens.length) {
      throw new Error('beyond the index!')
    }
    this.value = this.tokens[this.current]
    return this.value
  }

  matchType(type) {
    return this.value?.type === type
  }

  matchValue(value) {
    return this.value?.value === value
  }

  /**
   * 声明分类，判断声明的是函数还是变量
   * @param {boolean} flag
   * @returns
   */
  declaration(flag) {
    const declarations = []

    let tokens = this.value

    // 声明类型 int,char,double,float...
    const id = tokens.value

    if (!declaration.has(id)) {
      throw new Error(`error: '${id}' is undefined ${tokens.line}:${tokens.column}`)
    }

    const walk = () => {
      tokens = this.nextToken()

      const new_tokens = tokens

      // 检查命名是否符合规范
      if (this.matchType('identifier')) {
        const name = new_tokens.value
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) || keywords.has(name)) {
          throw new Error(`Invalid identifier name "${name}" ${tokens.line}:${tokens.column}`)
        }
      } else {
        throw new Error(
          `'${tokens.value}' declarations must be variables ${tokens.line}:${tokens.column}`
        )
      }

      tokens = this.nextToken()

      if (this.matchType('symbol')) {
        // 数组
        if (this.matchValue('[')) {
          while (true) {
            tokens = this.nextToken()
            if (this.matchValue(']') && this.current < this.tokens.length) {
              break
            }
          }
          tokens = this.nextToken()

          return { type: 'arrayExpression', id }
        }

        // 函数
        if (this.matchValue('(')) {
          return this.functionDeclaration(id, new_tokens)
        }

        // 函数有参数
        if (this.matchValue(')')) {
          this.nextToken(1, false)
          declarations.push({ type: 'identifier', name: new_tokens.value, value: undefined })
          return { type: 'variableDeclaration', declarations, id }
        }

        // 连续声明变量 int a,b,c;
        if (this.matchValue(',')) {
          declarations.push({ type: 'identifier', name: new_tokens.value, value: undefined })

          // 如果是函数参数 int add(int a,int b) => int a, int b
          if (flag) {
            tokens = this.nextToken()
            // 特殊情况 int add(int a,char b)
            // int !== char
            if (id !== tokens.value) {
              this.nextToken(1, false)
              return { type: 'variableDeclaration', declarations, id }
            }
          }

          return walk()
        }

        // 变量初始值
        if (this.matchValue('=')) {
          tokens = this.nextToken()
          declarations.push({ type: 'identifier', name: new_tokens.value, value: tokens.value })
          tokens = this.nextToken()
          if (this.matchValue(',')) {
            return walk()
          }
          return { type: 'variableDeclaration', declarations, id }
        }

        // 声明结束
        if (this.matchValue(';')) {
          declarations.push({ type: 'identifier', name: new_tokens.value, value: undefined })
          return { type: 'variableDeclaration', declarations, id }
        }
      }

      throw new Error(
        `'${tokens.value}' declarations must be variables ${tokens.line}:${tokens.column}`
      )
    }

    return walk()
  }

  /**
   * 函数声明处理
   * @param {string} id       函数声明类型
   * @param {string} options  tokens
   * @returns
   */
  functionDeclaration(id, options) {
    const body = { type: 'blockStatement', body: [] }
    const params = []
    let tokens = this.nextToken()

    // 参数
    while (!this.matchValue(')') && this.current < this.tokens.length) {
      params.push(this.declaration(true))
      tokens = this.nextToken()
    }

    tokens = this.nextToken()

    if (this.matchValue('{')) {
      tokens = this.nextToken()
      // 函数主体内容
      while (!this.matchValue('}') && this.current < this.tokens.length) {
        body.body.push(this.parser())
        tokens = this.nextToken()
      }
    }
    return { type: 'functionDeclaration', name: options.value, body, params, id }
  }

  /**
   * 预处理文件
   * @returns
   */
  includeDeclaration() {
    let tokens = this.nextToken()

    if (this.matchValue('include')) {
      tokens = this.nextToken()

      if (this.matchType('string')) {
        return { type: 'includeStatement', value: tokens.value }
      }

      let value = ''
      if (this.matchValue('<')) {
        tokens = this.nextToken()
        while (!this.matchValue('>')) {
          value += tokens.value
          tokens = this.nextToken()
        }
        if (value.length === 0) {
          tokens = this.nextToken(2, false)
          throw new Error(`error: empty filename in #include  ${tokens.line}:${tokens.column}`)
        }
        return { type: 'includeStatement', value }
      }
    }
    // 先不做预处理
    if (this.matchValue('define')) {
      return { type: 'defineStatement' }
    }
    if (this.matchValue('ifdef')) {
      return { type: 'defStatement' }
    }

    throw new Error(
      `error: invalid preprocessing directive '#${tokens.value}' ${tokens.line}:${tokens.column}`
    )
  }

  // return
  returnStatement() {
    const argument = {}

    let tokens = this.nextToken()

    const value = tokens.value

    tokens = this.nextToken()

    // 变量/数字
    if (this.matchValue(';')) {
      return { type: 'returnIdentifier', value }
    }

    // 表达式
    // ...

    // 函数
  }

  // 循环 for
  forStatement() {
    let tokens = this.nextToken()
    const declarations = { type: 'ForStatement', init: null, test: null, update: null, body: [] }

    // for(int i = 0; i < 10; i++)
    // for(int i = 0, j = 0; i < 10; i++)
    // for(i = 0; i < 10; i++)
    // for(;;)
    // for(;;i++)
    if (this.matchValue('(')) {
      tokens = this.nextToken()

      // init 声明变量
      if (!this.matchType('keyword')) {
        tokens = this.nextToken(1, false)
      }
      declarations.init = { ...declarations.init, ...this.declaration() }

      // test 条件 i < 10
      tokens = this.nextToken()

      return declarations
    }
  }

  // 表达式
  expression() {}
}
