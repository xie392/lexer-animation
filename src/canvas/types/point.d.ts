export interface PointInterface {
  /**
   * 所有坐标组
   * @type {Array<PointListInterface>}
   */
  group: Array<PointListInterface>
  /**
   * 获取坐标组最后一个坐标组
   * @returns {PointListInterface}
   */
  getGroupEnd(): PointListInterface | undefined
  /**
   * 添加坐标组到坐标组
   * @param {PointListInterface} list
   */
  addGroup(list: PointListInterface): void
  /**
   * 获取坐标组内部 body 最后一个坐标组
   * @returns {ListInterface}
   */
//   getGroupBodyEnd(): ListInterface | undefined
}

export interface PointListInterface {
  kind: string
//   body: Array<ListInterface>
  value: ListInterface
}

/**
 * 一个坐标组的坐标点
 * @interface ListInterface
 */
export interface ListInterface {
  x1: number
  y1: number
  x2: number
  y2: number
}
