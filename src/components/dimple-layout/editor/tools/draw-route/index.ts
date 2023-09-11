import { ref, shallowRef } from 'vue'
import icon from './icon.svg'
import type { Edge } from '@antv/x6'

import type { DimpleLayoutEditorTool, DimpleLayoutCanvas } from '../../type'

type HandleFun = (e: MouseEvent, canvas?: DimpleLayoutCanvas) => any

const inDraw = ref(false)
const drawTimes = ref(0)
const drawingRouteId = ref('')
const canvas = shallowRef<DimpleLayoutCanvas>()

let drawingTipDom: HTMLDivElement
let drawingTipTextDom: HTMLDivElement

const handleCanvasClick = (e: any) => {
  const point = { x: e.x, y: e.y }

  if (drawTimes.value === 0) {
    const edge = canvas.value?.addEdge({ source: point, target: point, attrs: { line: { sourceMarker: 'circle', targetMarker: false } }, data: { isDrawRoute: true } })
    drawingRouteId.value = edge?.id || ''
  }

  const edge = canvas.value?.getCellById(drawingRouteId.value) as Edge

  if (drawTimes.value > 0) {
    const vertices = edge.getVertices()
    vertices.push(point)
    edge.setVertices(vertices)
  }
  edge.setTarget(point)

  drawTimes.value++
}

const handleEdgeClick = (event: any) => {
  if (drawTimes.value > 0) return
  const { x, y } = event
  const source = { x, y }
  const parentLength = event.view.getClosestPointLength(source)

  const edge = canvas.value?.addEdge({
    source: {
      cell: event.cell,
      anchor: { name: 'length', args: { length: parentLength } },
    },
    target: source,
    attrs: { line: { sourceMarker: 'circle', targetMarker: false } },
    data: { isDrawRoute: true, isChild: true, parentLength },
  })
  drawingRouteId.value = edge?.id || ''
  drawTimes.value++
}

const onDrawStart: HandleFun = (e, canvasElement) => {
  inDraw.value = true
  drawingTipDom = document.createElement('div')
  drawingTipDom.style.cssText = `position: fixed;top:${e.y}px;left: ${e.x}px;height:10px;width:10px;border-radius: 50%;background: red`

  drawingTipTextDom = document.createElement('div')
  drawingTipTextDom.style.cssText = `position: fixed;top:${e.y - 40}px;left: ${e.x}px;color: #aaa;font-size: 12px;user-select:none;point-event:none`
  drawingTipTextDom.innerHTML = `单击画布两点连线<br />右键或双击可停止`

  document.body.appendChild(drawingTipDom)
  document.body.appendChild(drawingTipTextDom)

  document.addEventListener('mousemove', onDrawMove)
  document.addEventListener('dblclick', onDrawEnd)
  document.addEventListener('contextmenu', onDrawEnd)
  canvas.value = canvasElement

  canvas.value?.on('blank:click', handleCanvasClick)
  canvas.value?.on('edge:click', handleCanvasClick)
}

const onDrawMove: HandleFun = (e) => {
  drawingTipDom.style.top = e.y + 'px'
  drawingTipDom.style.left = e.x + 'px'

  drawingTipTextDom.style.top = e.y - 40 + 'px'
  drawingTipTextDom.style.left = e.x + 'px'
}

const onDrawEnd: HandleFun = () => {
  if (drawTimes.value < 2) {
    const edge = canvas.value?.getCellById(drawingRouteId.value) as Edge
    edge?.remove()
  }

  inDraw.value = false
  drawingTipDom.remove()
  drawingTipTextDom.remove()
  document.removeEventListener('mousemove', onDrawMove)
  document.removeEventListener('dblclick', onDrawEnd)
  document.removeEventListener('contextmenu', onDrawEnd)
  canvas.value?.off('blank:click', handleCanvasClick)
  canvas.value?.off('edge:click', handleCanvasClick)
  drawTimes.value = 0
  drawingRouteId.value = ''
}

export default {
  key: 'draw-route',
  name: '绘制路网',
  // icon,
  on: {
    click: (e, canvas) => {
      if (inDraw.value) return onDrawEnd(e, canvas)
      if (drawTimes.value === 0) onDrawStart(e, canvas)
      if (drawTimes.value > 0) onDrawMove(e, canvas)
    },
  },

  index: 3,
} as DimpleLayoutEditorTool
