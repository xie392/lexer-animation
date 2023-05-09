# 目录介绍

```bash
├── canvas                          # 动画绘制
│   ├── README.md                   # 介绍
│   ├── draw.ts                     # 绘制动画类
│   ├── index.ts                    # 入口文件
│   ├── all-kit.ts                  # 插件集合，后面需要引入到绘制动画类中
│   ├── plugin.ts                   # 插件，用于扩展，导出抽象类，要想写新插件需要继承实现
│   ├── lexer.ts                    # 伪编译器，用于程序解析
├── hooks                           # 一些封装好的 hooks
│   ├── useBinaryExpression.ts      # 处理一些简单表达式 hooks
│   ├── useExpression.ts            # 计算表达式结果的 hooks
├── lexer                           # 伪编译器解析目录
│   ├── useAssignmentExpression.ts  # 处理赋值表达式
│   ├── useCheckError.ts            # 处理错误，用于抛出一些语法错误
│   ├── useElseStatement.ts         # 处理 else 
│   ├── useFunctionDeclaration.ts   # 处理函数声明
│   ├── useIfStatement.ts           # 处理 if / else if 语句 
│   ├── useVariableDeclaration.ts   # 处理变量声明
├── plugin                          # 插件
│   ├── AssignmentExpression.ts     # 赋值表达式动画
│   ├── expression.ts               # 普通表达式动画
│   ├── statement.ts                # 声明变量动画
├── types                           # 类型
│   ├── index.ts                    # 基本类型声明
│   ├── plugin.ts                   # 插件类型声明
│   ├── lexer.ts                    # 伪编译器类型声明
```

# 使用



```ts
import Draw, { pluginList } from '$/index'

const draw = new Draw({ id: 'canvas' }, pluginList)

/**
 * 绘制表达式
 * @param {string} name 表达式类型名称
 * @param {object} options 表达式参数参数
 */
draw.insert('Statement', {
  kind: 'int',
  body: [
    {
      name: 'a',
      value: 11
    },
    {
      name: 'b',
      value: 1001
    }
  ]
})

draw.render()
```

# 实现一个动画插件

动画都是有插件 `Konva` 绘制，点击这里可以插件中文网： [Konva](http://konvajs-doc.bluehymn.com/docs/index.html);
如果你想定义一个动画插件，你可以先想好你想要传什么参数过来，下面以一个简单的例子来演示：

## 1、明确参数

为了明确自己所需要的参数，可以定义一个接口来规范所需要传入的参数

```ts
/**
 * 声明变量的参数
 * @interface StatementOptionsInterface
 */
export interface StatementOptionsInterface {
  /**
   * 变量声明的类型 let | const | var
   * @type {string}
   */
  kind: string
  /**
   * 变量内容
   * @type {Array<{ name: string; value: any }>}
   * @example
   * let a = 1, b = 2
   * [
   *  { name: 'a', value: 1 },
   *  { name: 'b', value: 2 },
   *  ...
   * ]
   */
  body: Array<{ name: string; value: any }>
}
```

# 2、编写插件

如果想要实现一个插件，就必须继承 `Plugin` 类, 实现里面的抽象方法，下面为一个简单的例子：

```ts
import { StatementOptionsInterface, DrawInterface } from '$/types'
import Konva from 'konva'
import { Plugin } from '$/index'

class Statement extends Plugin {
  /**
   * 画布实例(必须)
   */
  draw: DrawInterface
  /**
   * 插件参数(必须)
   */
  params: StatementOptionsInterface

  constructor(draw: DrawInterface, params: StatementOptionsInterface) {
    super()
    this.params = params
    this.draw = draw
  }

  /**
   * 插件名字(必须) 后面想要调用这个插件的话需要用到这个名字
   * @returns {string}
   */
  static getName() {
    return 'Statement'
  }

  /**
   * 插件渲染方法(必须) 这里会在被调用，绘制出所有图形
   * @returns {Array<RenderInterface>} 接口请看下面
   */
  render() {
    // 绘制一个文本
    const text = new Konva.Text({
      x: 20,
      y: 20,
      text: 'test',
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: '#333'
    })

    return [{ name: 'Test', value: this.big_group_text }]
  }
}

export default Statement
```

render 返回值类型接口如下：

```ts
export interface RenderInterface {
  /**
   * 名字
   * @param {string} name
   */
  name: string
  /**
   * 图形类别
   * @param {QueueInterface} value
   */
  value: QueueInterface
  /**
   * 动画参数
   * @param {any} options
   */
  options?: {
    [key: string]: any
  }
}
```

# 3、把插件添加到 all-kit 中

在目录 `all-kit.ts` 中把你写好的插件添加到数组中

```ts
import Statement from '$/plugin/statement'

export const pluginList[] = [Statement]
```

# 4、使用

如果想用你写好的插件，可以按照下面来:

```ts
// pluginList 为 all-kit.ts 中的插件列表
import Draw, { pluginList } from '$/index'

// 实例化画图类
const draw = new Draw({ id: 'canvas' }, pluginList)

// 刚刚写好的插件  "Statement" 为插件名字，在第 2 步 中的 getName() 方法实现
draw.insert('Statement', {
  kind: 'int',
  body: [
    {
      name: 'a',
      value: 11
    },
    {
      name: 'b',
      value: 1001
    }
  ]
})

// 必须实现渲染方法 100 为动画的时长，如果不传就默认 1000 毫秒
draw.render(100)
```
