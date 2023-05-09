import { Buffer } from 'buffer'
import process from 'process'

// 该文件自动包含在项目中
declare module 'acorn-walk' {
  import * as acorn from 'acorn'

  interface SimpleWalker {
    (this: any, node: acorn.Node, state: any): void
  }

  interface FullWalker<T> {
    (
      this: any,
      node: acorn.Node,
      state: T,
      callback: (node: acorn.Node, st: T) => void,
      c: any
    ): void
  }

  interface RecursiveWalker<T> {
    (this: any, node: acorn.Node, state: T, callbacks: WalkCallbacks<T>, c: any): void
  }

  interface BaseWalkCallbacks<T> {
    node?: SimpleWalker | FullWalker<T>
    // 其他回调函数
    [key: string]: (SimpleWalker | FullWalker<T>) | undefined
  }

  type WalkCallbacks<T> = BaseWalkCallbacks<T> & {
    [nodeType: string]: SimpleWalker | FullWalker<T> | BaseWalkCallbacks<T>
  }

  function simple(
    node: acorn.Node,
    visitors: BaseWalkCallbacks<any>,
    base?: WalkCallbacks<any>,
    state?: any
  ): void
  function full(
    node: acorn.Node,
    state: any,
    visitors: BaseWalkCallbacks<any>,
    base?: WalkCallbacks<any>
  ): void
  function recursive<T>(
    node: acorn.Node,
    state: T,
    visitors: WalkCallbacks<T>,
    base?: WalkCallbacks<T>
  ): void

  namespace ancestors {
    function find(node: acorn.Node, ast: acorn.Node): acorn.Node[]
    function get(node: acorn.Node): acorn.Node[]
  }

  namespace util {
    function makePredicate<T>(
      predicates: T,
      defaultWhenEmpty?: boolean
    ): (node: acorn.Node, ...args: any[]) => boolean
  }
}

// window 全局变量
declare global {
  interface Window {
    Buffer: typeof Buffer
    process: typeof process
  }
}
