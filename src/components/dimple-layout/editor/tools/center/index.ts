import type { DimpleLayoutEditorTool } from '../../type'

export default {
  key: 'center',
  name: '回到中心',
  index: 8,
  on: {
    click: (_, canvas) => {
      canvas.zoomTo(1)
      setTimeout(() => {
        canvas.center()
      }, 0)
    },
  },
} as DimpleLayoutEditorTool
