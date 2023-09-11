import { Selection } from '@antv/x6-plugin-selection'
import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
      modifiers: ['ctrl', 'alt', 'meta'],
      showEdgeSelectionBox: true,
      multipleSelectionModifiers: ['ctrl', 'meta'],
    }),
  )
}
