import type { DimpleLayoutEditorTool } from '../../type'

export default {
  key: 'export',
  name: '导出',
  index: 6,
  position: 'right',
  on: {
    click: (_, canvas) => {
      const jsonData: any = canvas.toJSON() || {}
      const data = JSON.stringify(jsonData)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'data.json'
      link.click()

      URL.revokeObjectURL(url)
    },
  },
} as DimpleLayoutEditorTool
