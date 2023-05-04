# 目录介绍

```bash
├── canvas              # 动画绘制
│   ├── README.md       # 介绍
│   ├── draw.ts         # 绘制
│   ├── index.ts        # 入口
│   ├── all-kit.ts      # 工具集
│   ├── plugin.ts       # 插件，用于扩展，导出抽象类，要想写新插件需要继承实现
├── plugin              # 插件
│   ├── expression.ts   # 表达式
│   ├── statement.ts    # 声明
├── types               # 类型
│   ├── index.ts        # 基本类型声明
│   ├── plugin.ts       # 插件类型声明
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
