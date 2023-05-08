import { GroupKitInterface } from '$/types/plugin'

import Statement from '$/plugin/statement'
import Expression from '$/plugin/expression'
import AssignmentExpression from '@/canvas/plugin/AssignmentExpression'

export const pluginList: GroupKitInterface[] = [Statement, Expression, AssignmentExpression]
