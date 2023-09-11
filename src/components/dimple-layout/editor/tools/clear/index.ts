import type { DimpleLayoutEditorTool } from '../../type'

export default {
  key: 'clear',
  name: '清空画布',
  index: 10,
  position:'right',
  on: {
    click: (_, canvas) => {
      canvas.clearCells()
      canvas.clearBackground()

      canvas.zoomTo(1)
      setTimeout(() => {
        canvas.center()
      }, 0)
    },
  },
} as DimpleLayoutEditorTool
