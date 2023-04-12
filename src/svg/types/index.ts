/**
 * 变量声明
 */
export interface VariableInterface {
    kind: 'var' | 'let' | 'const';
    declarations: any[];
}
