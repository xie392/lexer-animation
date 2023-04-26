import { PointInterface, PointListInterface } from '$/types/point'

class Point implements PointInterface {
  group: Array<PointListInterface> = []

  getGroupEnd() {
    return this.group[this.group.length - 1]
  }

  addGroup(list: PointListInterface) {
    this.group.push(list)
  }

//   getGroupBodyEnd() {
//     const group = this.getGroupEnd()

//     if (group) {
//       return group.body[group.body.length - 1]
//     }
//   }
}

export default Point
