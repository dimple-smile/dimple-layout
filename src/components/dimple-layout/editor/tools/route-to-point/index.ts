import icon from './icon.svg'

import type { Edge } from '@antv/x6'
import type { DimpleLayoutEditorTool, DimpleLayoutCanvas } from '../../type'

function isPointOnLine(point: any, lineStart: any, lineEnd: any) {
  const k1 = (point.y - lineStart.y) / (point.x - lineStart.x)
  const k2 = (point.y - lineEnd.y) / (point.x - lineEnd.x)
  const res = Number(Math.abs(k1 - k2).toFixed(3))
  return res === 0
}
function splitPolylineByPoint(polyline: any[], targetPoint: any) {
  let res: any[] = []
  for (let i = 0; i < polyline.length; i++) {
    const item = polyline[i]
    const next = polyline[i + 1]
    if (!next) break
    res.push(item)
    if (isPointOnLine(targetPoint, item, next)) {
      res.push(targetPoint)
      break
    }
  }
  return res
}

export default {
  key: 'route-to-point',
  name: '连接目标点',
  // icon,
  on: {
    click: (_, canvas) => {
      const road = canvas.getEdges()[0] as Edge
      const points = canvas.getNodes().filter((item) => item.data?.isRouteNode) || []

      for (const item of points) {
        canvas.addEdge({
          id: `route-to-node-${item.id}`,
          source: { cell: road, connectionPoint: { name: 'boundary', args: { sticky: true } }, anchor: { name: 'orth', args: { fallbackAt: 'closest' } } },
          target: { cell: item, connectionPoint: { name: 'boundary', args: { sticky: true } }, anchor: { name: 'orth', args: { fallbackAt: 'closest' } } },
          attrs: { line: { stroke: '#FFA500', strokeWidth: 2, sourceMarker: false, targetMarker: false } },
          router: 'manhattan',
          data: { isRouteToPoint: true, targetNodeId: item.id, sourceEdgeId: road.id },
        })
      }
    },
  },
  onMounted: (canvas) => {
    canvas.on('node:dblclick', ({ node }) => {
      const data = node.getData() || {}
      if (!data.isRouteNode) return
      const routeToNodeEdge = canvas.getCellById(`route-to-node-${node.id}`) as Edge
      const routeToNodeEdgePolyline: any[] = routeToNodeEdge.getPolyline().points || []
      console.log(routeToNodeEdgePolyline)

      // @ts-ignore
      const sourcePonit = routeToNodeEdge.findView(canvas)?.getTerminalConnectionPoint('source')

      const routeToNodeData = routeToNodeEdge.getData() || {}

      const routeEdge = canvas.getCellById(routeToNodeData.sourceEdgeId) as Edge
      const routeEdgePolyline: any[] = routeEdge.getPolyline().points || []

      const highlightPoints = splitPolylineByPoint(routeEdgePolyline, sourcePonit)
      highlightPoints.push(...routeToNodeEdgePolyline.slice(1, routeToNodeEdgePolyline.length - 1))

      canvas.addEdge({
        source: highlightPoints[0],
        target: highlightPoints[highlightPoints.length - 1],
        vertices: highlightPoints.splice(1, highlightPoints.length - 1),
        attrs: { line: { stroke: '#FFA500', strokeWidth: 2, sourceMarker: false, targetMarker: false } },
        data: { isHighlightRoute: true },
      })
    })

    canvas.on('node:move', () => {
      canvas
        .getEdges()
        .filter((item) => item.getData()?.isHighlightRoute)
        .forEach((item) => item.remove())
    })
  },
  index: 4,
} as DimpleLayoutEditorTool
