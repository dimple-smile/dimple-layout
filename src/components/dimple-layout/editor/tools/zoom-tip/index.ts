import { ref } from 'vue'

import type { DimpleLayoutEditorTool, DimpleLayoutCanvas } from '../../type'

const name = ref('100%')

export default {
  key: 'zoom-tip',
  name: name,
  index: 9,
  onMounted: (canvas) => {
    canvas.on('scale', (e) => {
      const zoom = e.sx
      name.value = Number(((zoom / 1) * 100).toFixed(2)) + '%'
    })
  },
} as DimpleLayoutEditorTool
