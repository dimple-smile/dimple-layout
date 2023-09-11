import icon from './icon.svg'
import type { DimpleLayoutEditorTool, DimpleLayoutCanvas } from '../../type'

export default {
  key: 'redo',
  name: '重做',
  // icon,
  on: { click: (_, canvas) => canvas.redo() },
  index: 2,
} as DimpleLayoutEditorTool
