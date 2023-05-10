运行教程

1、安装依赖 
yarn
或
npm install

2、运行
yarn dev
或
npm run dev 

3、打包
yarn build
或
npm run build 


目录介绍

+---src
|   App.vue                                 # 入口组件
|   auto-imports.d.ts                       # ant-design 自动导入类型声明文件
|   main.ts                                 # 入口文件
|  
+---assets                                  # 静态资源管理
|   |   logo.svg                            # logo
|   |                   
|   \---styles                              # 全局样式目录
|           base.css                        # 一些常用类名样式，例如: flex 类型设置 flex 布局
|           global.css                      # 全局样式
|           reset.css                       # 重置浏览器一些基本样式
|           
+---canvas                                  # 核心目录
|   |   all-kit.ts                          # 动画插件配置
|   |   draw.ts                             # 动画类
|   |   index.ts                            # 入口文件
|   |   lexer.ts                            # 伪编译器类
|   |   plugin.ts                           # 动画插件类，约束插件必须实现几个抽象方法和属性
|   |   README.md                           # canvas 目录介绍文件
|   |   
|   +---hooks                               # 解析器 hooks 目录
|   |       useBinaryExpression.ts          # 处理表达式 hooks
|   |       useExpression.ts                # 处理表达式 hooks
|   |       
|   +---lexer                               # 伪编译器解析目录
|   |       useAssignmentExpression.ts      # 处理赋值表达式
|   |       useCheckError.ts                # 用于抛出异常
|   |       useElseStatement.ts             # 解析 else 
|   |       useFunctionDeclaration.ts       # 解析函数声明
|   |       useIfStatement.ts               # 解析 if / else if 
|   |       useVariableDeclaration.ts       # 解析变量声明
|   |           
|   +---plugin                              # 插件
|   |       AssignmentExpression.ts         # 赋值表达式动画
|   |       expression.ts                   # 表达式动画
|   |       statement.ts                    # 变量声明动画
|   |       
|   \---types                               # ts 类型声明目录
|           index.d.ts                      # draw类和一些基本类型声明
|           lexer.d.ts                      # 伪编译器类型声明
|           plugin.d.ts                     # 插件类型声明
|           
+---components                              # 组件目录
|   +---CodeAnimation                       
|   |       index.vue                       # 动画组件
|   |       
|   \---CodeBlock                           
|           index.ts                        # 代码编辑器引用
|           index.vue                       # 代码编辑器
|           
+---helper                                
|       useTraverse.ts                      # 遍历队列
|       
+---hooks                                   # 全局 hooks
|       useBasicExpression.ts               # 基本表达式
|       useExpressionResult.ts              # 计算表达式结果
|       
+---layout                                        
|       index.vue                           # layout
|       
+---router                                  # 路由
|       index.ts
|       
+---stores                                  # 状态存储
|       run.ts                              # 处理点击代码运行事件
|       
+---types                                   # 全局类型声明       
|       global.d.ts
|       
\---views                                   # 视图文件
    |   index.vue                         
    |   
    \---home                          
            index.vue
