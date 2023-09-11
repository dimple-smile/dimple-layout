import { Clipboard } from '@antv/x6-plugin-clipboard'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new Clipboard({ enabled: true }))
}
