import { Scroller } from '@antv/x6-plugin-scroller'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new Scroller({ enabled: true, pannable: true, autoResize: false, pageVisible: true, pageBreak: false, padding: 0 }))
}
