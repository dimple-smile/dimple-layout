import { Snapline } from '@antv/x6-plugin-snapline'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new Snapline({ enabled: true }))
}
