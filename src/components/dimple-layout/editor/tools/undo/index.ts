import icon from './icon.svg'

import type { DimpleLayoutEditorTool, DimpleLayoutCanvas } from '../../type'

export default {
  key: 'undo',
  name: '回退',
  // icon,
  on: { click: (_, canvas) => canvas.undo() },
  index: 1,
} as DimpleLayoutEditorTool
