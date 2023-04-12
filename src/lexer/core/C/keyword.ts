// 关键字
export const keywords = new Set([
  'auto',
  'break',
  'case',
  'char',
  'const',
  'continue',
  'default',
  'do',
  'double',
  'else',
  'enum',
  'extern',
  'float',
  'for',
  'goto',
  'if',
  'int',
  'long',
  'register',
  'return',
  'short',
  'signed',
  'sizeof',
  'static',
  'struct',
  'switch',
  'typedef',
  'union',
  'unsigned',
  'void',
  'volatile',
  'while'
])

// 常见的符号
export const symbols = new Set([
  '(',
  ')',
  '{',
  '}',
  '[',
  ']',
  ',',
  ';',
  '#',
  '<',
  '>',
  '.',
  '\\',
  '->',
  '++',
  '--',
  '<<',
  '>>',
  '<=',
  '==',
  '!=',
  '&&',
  '||',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '&=',
  '^=',
  '|=',
  '=',
  '+',
  '-',
  '*',
  '/',
  '%',
  '&',
  '|',
  '!',
  '?',
  ':'
])

export const operators = new Set([
  '++',
  '--',
  '<<',
  '>>',
  '<=',
  '==',
  '!=',
  '&&',
  '||',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '&=',
  '^=',
  '|=',
  '=',
  '+',
  '-',
  '*',
  '/',
  '%',
  '&',
  '|',
  '!',
  '?',
  ':'
])


/**
 * 判断是否为关键字
 * @param word 
 * @returns 
 */
export const isKeyword = (word: string) => keywords.has(word)

/**
 * 判断是否为符号
 * @param word 
 * @returns 
 */
export const isSymbol = (word: string) => symbols.has(word)

/**
 * 判断是否为运算符
 * @param word 
 * @returns 
 */
export const isOperator = (word: string) => operators.has(word)
