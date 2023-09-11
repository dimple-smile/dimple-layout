import { History } from '@antv/x6-plugin-history'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new History({ enabled: true }))
}
