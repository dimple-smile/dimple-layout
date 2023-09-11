import { Keyboard } from '@antv/x6-plugin-keyboard'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new Keyboard({ enabled: true }))

  const copy = () => {
    const cells = canvas.getSelectedCells() || []
    if (cells.length) canvas.copy(cells)
    return false
  }
  canvas.bindKey('ctrl+c', copy)
  canvas.bindKey('command+c', copy)

  const paste = () => {
    if (!canvas.isClipboardEmpty()) {
      const cells = canvas.paste({ offset: 32 }) || []
      canvas.cleanSelection()
      canvas.select(cells)
    }
    return false
  }

  canvas.bindKey('ctrl+v', paste)
  canvas.bindKey('command+v', paste)

  const remove = () => {
    const cells = canvas.getSelectedCells() || []
    if (cells.length) canvas.removeCells(cells)
    return false
  }
  canvas.bindKey('delete', remove)
  canvas.bindKey('backspace', remove)

  const undo = () => canvas.undo()
  canvas.bindKey('ctrl+z', undo)
  canvas.bindKey('command+z', undo)
}
