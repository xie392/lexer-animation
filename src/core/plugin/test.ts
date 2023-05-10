declare abstract class Test {
  static readonly draw: any
  static readonly pluginName: string

  constructor(draw: any, options: any)

  abstract render(): void
}

// class a extends Test {
//   static get pluginName() {
//     return 'a'
//   }
// }
