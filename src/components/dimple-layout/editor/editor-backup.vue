<template>
  <div class="dimple-layout-editor-container">
    <div ref="dragContainer">
      <slot name="toolbar">
        <div class="dimple-layout-editor-toolbar">
          <!-- 保存 -->
          <div class="dimple-layout-editor-toolbar-item">
            <svg width="24" height="22" viewBox="0 0 1024 1024" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M 280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672 L 314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64H736zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64H608zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64H480z"
              ></path>
            </svg>
          </div>

          <!-- 导入 -->
          <div class="dimple-layout-editor-toolbar-item">
            <div class="custom-file-upload">
              <input type="file" id="file-upload-1" accept="json" class="file-input" @change="uploadJson" />
              <label for="file-upload-1" class="file-upload-btn"> 导入 </label>
            </div>
          </div>

          <!-- undo -->
          <div class="dimple-layout-editor-toolbar-item" @click="undo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-corner-up-left"
            >
              <polyline points="9 14 4 9 9 4"></polyline>
              <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
            </svg>
          </div>

          <!-- redo -->
          <div class="dimple-layout-editor-toolbar-item" @click="redo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-corner-up-right"
            >
              <polyline points="15 14 20 9 15 4"></polyline>
              <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
            </svg>
          </div>

          <!-- 矩形 -->
          <!-- <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'rect')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <rect width="20" height="12" x="2" y="6" fill="none" stroke="#000000" stroke-width="2" />
            </svg>
          </div> -->

          <!-- 圆形 -->
          <!-- <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'circle')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" fill="none" stroke="#000000" stroke-width="2" />
            </svg>
          </div> -->

          <!-- 起点 -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'start')">起点</div>

          <!-- 路径 -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="drawEdge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M 0,12 C 8,0 16,24 24,12" fill="none" stroke="#000000" stroke-width="2" />
            </svg>
            <div style="margin-left: 5px">
              {{ onDragEdgeIndex >= 0 ? '正在绘制' : '绘制路径' }}
            </div>
          </div>

          <!-- 终点 -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'end')">终点</div>

          <!-- 途经点 -->
          <!-- <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'vertice')">途经点</div> -->

          <!-- 生成路线 -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="link">生成路线</div>

          <!-- 路障 -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="drag($event, 'rect')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" xml:space="preserve" data-v-ea893728="">
              <path
                d="M928.99 755.83 574.6 203.25c-12.89-20.16-36.76-32.58-62.6-32.58s-49.71 12.43-62.6 32.58L95.01 755.83c-12.91 20.12-12.9 44.91.01 65.03 12.92 20.12 36.78 32.51 62.59 32.49h708.78c25.82.01 49.68-12.37 62.59-32.49 12.91-20.12 12.92-44.91.01-65.03zM554.67 768h-85.33v-85.33h85.33V768zm0-426.67v298.66h-85.33V341.32l85.33.01z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <!-- center -->
          <div class="dimple-layout-editor-toolbar-item" @mousedown="center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-crosshair"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="22" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="12" x2="2" y2="12"></line>
              <line x1="12" y1="6" x2="12" y2="2"></line>
              <line x1="12" y1="22" x2="12" y2="18"></line>
            </svg>
          </div>

          <!-- zoom -->
          <div class="dimple-layout-editor-toolbar-item">{{ Number(((zoom / 1) * 100).toFixed(2)) }}%</div>

          <div style="flex: 1"></div>

          <!-- image -->
          <div class="dimple-layout-editor-toolbar-item">
            <div class="custom-file-upload">
              <input type="file" id="file-upload" accept="image/png" class="file-input" @change="fileUpload" />
              <label for="file-upload" class="file-upload-btn">
                <svg width="20" height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                  <path fill="currentColor" d="M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"></path>
                  <path
                    fill="currentColor"
                    d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
                  ></path>
                </svg>
              </label>
            </div>
          </div>

          <!-- clear -->
          <div class="dimple-layout-editor-toolbar-item" @click="clear">
            <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path
                fill="currentColor"
                d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
              ></path>
            </svg>
          </div>

          <!-- download -->
          <div class="dimple-layout-editor-toolbar-item" @click="toJSON">
            <svg width="20" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
              ></path>
            </svg>
          </div>
        </div>
      </slot>
    </div>

    <div ref="container" class="dimple-layout-editor">editor</div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import { Graph, EdgeView, Node, Edge, CellView } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd' // 外部拖入
import { Transform } from '@antv/x6-plugin-transform' // 图形变换
import { Snapline } from '@antv/x6-plugin-snapline' // 对齐线
import { Clipboard } from '@antv/x6-plugin-clipboard' // 复制粘贴
import { Keyboard } from '@antv/x6-plugin-keyboard' // 键盘快捷键
import { History } from '@antv/x6-plugin-history' // 撤销重做
import { Selection } from '@antv/x6-plugin-selection' // 框选
import { Scroller } from '@antv/x6-plugin-scroller' // 滚动画布

import intersect from 'path-intersection' // 计算path交点

const container = ref<HTMLDivElement | null>(null)
const dragContainer = ref<HTMLDivElement | null>(null)
const graph = shallowRef<Graph | null>(null)
const dnd = shallowRef<Dnd | null>(null)
const onDragEdgeIndex = ref(-1)
const drawEdgeData = shallowRef<any[]>([])
const onDrawRoute = ref(false)

const zoom = ref(1)

const defaultOptions = {
  autoResize: true, // 自动大小
  mousewheel: true, // 缩放
  scaling: { min: 0.25, max: 10 },
  panning: false, // 平移
  background: { color: '#F2F7FA' },
  translating: { restrict: true },
  grid: {
    visible: true,
    type: 'doubleMesh',
    args: [
      {
        color: '#eee', // 主网格线颜色
        thickness: 1, // 主网格线宽度
      },
      {
        color: '#ddd', // 次网格线颜色
        thickness: 1, // 次网格线宽度
        factor: 4, // 主次网格线间隔
      },
    ],
  },
}

const updateEdges = (node: any) => {
  if (node.data?.isEdgeNode) return
}

onMounted(() => {
  if (!container.value) return
  graph.value = new Graph({
    ...defaultOptions,
    container: container.value,
    connecting: {
      snap: true,
      edgeAnchor: {
        name: 'orth',
        args: { fallbackAt: 'closest' },
      },
    },
  })

  // 外部拖入
  dnd.value = new Dnd({ target: graph.value })

  // 图形变换
  graph.value.use(
    new Transform({
      resizing: {
        enabled: (node: Node) => {
          const data = node.getData() || {}
          if (data.isDrawEdgeSource || data.isDrawEdgeTarget) return
          return true
        },
      },
    }),
  )

  // 对齐线
  graph.value.use(new Snapline({ enabled: true }))

  // 复制粘贴
  graph.value.use(new Clipboard({ enabled: true }))

  // 键盘快捷键
  graph.value.use(new Keyboard({ enabled: true, global: true }))
  const copy = () => {
    const cells = graph.value?.getSelectedCells() || []
    if (cells.length) graph.value?.copy(cells)
    return false
  }
  graph.value?.bindKey('ctrl+c', copy)
  graph.value?.bindKey('command+c', copy)

  const paste = () => {
    if (!graph.value?.isClipboardEmpty()) {
      const cells = graph.value?.paste({ offset: 32 }) || []
      graph.value?.cleanSelection()
      graph.value?.select(cells)
    }
    return false
  }

  graph.value?.bindKey('ctrl+v', paste)
  graph.value?.bindKey('command+v', paste)

  graph.value?.bindKey('ctrl+z', undo)
  graph.value?.bindKey('command+z', undo)

  const remove = () => {
    const cells = graph.value?.getSelectedCells() || []
    if (cells.length) graph.value?.removeCells(cells)
    return false
  }
  graph.value?.bindKey('delete', remove)
  graph.value?.bindKey('backspace', remove)

  // 撤销重做
  graph.value.use(new History({ enabled: true }))

  // 框选
  graph.value.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
      modifiers: ['ctrl', 'alt', 'meta'],
    }),
  )

  // 滚动画布
  graph.value.use(new Scroller({ enabled: true, pannable: false, autoResize: false, pageVisible: true, pageBreak: true }))

  graph.value.on('node:change:position', ({ node }) => {
    updateEdges(node)
  })
  graph.value.on('node:change:size', ({ node }) => {
    updateEdges(node)
  })
  graph.value?.on('node:added', ({ node }) => {
    updateEdges(node)
  })
  graph.value?.on('node:dblclick', ({ node }) => {
    const data = node.getData() || {}
    if (data.type !== 'end') return
    highlightLink(node)
    // updateEdges(node)
  })
  graph.value?.on('blank:mousemove', () => {
    if (onDrawRoute.value) {
    }
  })

  graph.value.on('scale', (e) => {
    zoom.value = e.sx
  })

  graph.value.on('blank:click', (e) => {
    if (onDragEdgeIndex.value < 0) return
    const { x, y } = e

    if (!drawEdgeData.value[onDragEdgeIndex.value]) drawEdgeData.value[onDragEdgeIndex.value] = { time: 0 }
    const item = drawEdgeData.value[onDragEdgeIndex.value]
    if (item.time === 0) {
      item.source = graph.value?.addNode({
        shape: 'circle',
        width: 10,
        height: 10,
        x,
        y,
        data: { isDrawEdgeSource: true, index: onDragEdgeIndex.value },
      })
    }

    if (item.time === 1) {
      item.target = graph.value?.addNode({ shape: 'circle', width: 10, height: 10, x, y, data: { isDrawEdgeTarget: true, index: onDragEdgeIndex.value } })
      const { source, target } = item
      const edge = graph.value?.addEdge({
        source,
        target,
        attrs: {
          line: {
            sourceMarker: false,
            targetMarker: false,
          },
          body: { magnet: true },
        },
        tools: ['segments'],
        ports: [
          {
            id: 'port1',
            attrs: {
              circle: {
                magnet: true,
                r: 8,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
              },
            },
          },
        ],
        data: { isDrawEdge: true, index: onDragEdgeIndex.value },
      })
      item.edge = edge
    }

    if (item.edge && item.time > 1) {
      const edge: Edge = item.edge
      const node: Node = item.target
      const vertices = edge.getVertices() || []
      vertices.push(node.getPosition())
      node.setPosition({ x, y })
      edge.setVertices(vertices)
    }
    item.time++
    drawEdgeData.value[onDragEdgeIndex.value] = item
  })
})

const drag = (event: any, shape: 'rect' | 'circle' | 'start' | 'end' | 'edge' | 'vertice') => {
  const options = { shape, width: 100, height: 40, attrs: {} }

  if (shape === 'start' || shape === 'end') {
    const node = graph.value?.createNode({
      shape: 'image',
      width: 50,
      height: 50,
      imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      label: shape === 'start' ? '起点' : '终点',
      attrs: {
        label: {
          fontSize: 12,
          refX: 0.5,
          refY: '100%',
          refY2: 4,
          textAnchor: 'middle',
          textVerticalAnchor: 'top',
        },
      },
      data: { type: shape },
    })
    dnd.value?.start(node!, event)
    return
  }

  const node = graph.value?.createNode(options)
  dnd.value?.start(node!, event)
}

const undo = () => {
  graph.value?.undo()
}

const redo = () => {
  graph.value?.redo()
}

let drawingTipDom: any
const drawingTipMouseMove = (e: any) => {
  drawingTipDom.style.top = e.y + 'px'
  drawingTipDom.style.left = e.x + 'px'
}
const drawingTipDbClick = () => {
  const dragEdgeDataItem = drawEdgeData.value[onDragEdgeIndex.value]
  if (!(dragEdgeDataItem.source && dragEdgeDataItem.target && dragEdgeDataItem.edge)) {
    drawEdgeData.value.splice(onDragEdgeIndex.value, 1)
  }
  onDragEdgeIndex.value = -1
  removeDrawingTip()
}

const initDrawingTip = (e: any) => {
  drawingTipDom = document.createElement('div')
  drawingTipDom.style.cssText = `position: fixed;top:${e.y}px;left: ${e.x}px;height:10px;width:10px;border-radius: 50%;background: red`
  document.body.appendChild(drawingTipDom)
  document.addEventListener('mousemove', drawingTipMouseMove)
  document.addEventListener('dblclick', drawingTipDbClick)
  document.addEventListener('contextmenu', drawingTipDbClick)
}
const removeDrawingTip = () => {
  drawingTipDom.remove()
  document.removeEventListener('mousemove', drawingTipMouseMove)
  document.removeEventListener('dblclick', drawingTipDbClick)
  document.removeEventListener('contextmenu', drawingTipDbClick)
}

const drawEdge = (e: any) => {
  if (onDragEdgeIndex.value >= 0) {
    removeDrawingTip()
    return
  }
  onDragEdgeIndex.value = drawEdgeData.value.length
  initDrawingTip(e)
}

const links = shallowRef<any[]>([])
function calculateDistance(p1: any, p2: any) {
  const { x: x1, y: y1 } = p1
  const { x: x2, y: y2 } = p2
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

const getEdgeSvg = async (edge: Edge): Promise<Element> => {
  return await new Promise((resolve) => {
    const sti = setInterval(() => {
      if (!graph.value?.findViewByCell(edge)) return
      const svgElement = graph.value?.findViewByCell(edge)?.container as any
      resolve(svgElement)
      clearInterval(sti)
    }, 50)
  })
}

const getEdgePath = async (edge: Edge): Promise<string> => {
  const svg = await getEdgeSvg(edge)
  return svg.children[1].getAttribute('d') || ''
}

const getEdgePathStartPoint = async (edge: Edge): Promise<{ x: number; y: number }> => {
  const pathString = await getEdgePath(edge)
  const startPoint = pathString.match(/M\s*([\d.]+)\s*([\d.]+)/i)
  if (startPoint && startPoint.length === 3) {
    const x = parseFloat(startPoint[1])
    const y = parseFloat(startPoint[2])
    return { x, y }
  }
  return { x: 0, y: 0 }
}

const link = async () => {
  const road = graph.value?.getEdges()[0] as Edge
  const endNodes = graph.value?.getNodes().filter((item) => item.data?.type === 'end') || []

  for (const item of endNodes) {
    graph.value?.addEdge({
      id: `${item.id}-end-node-edge`,
      source: { cell: road, connectionPoint: { name: 'anchor', args: { sticky: true } } },
      target: { cell: item, connectionPoint: 'anchor' },
      attrs: { line: { sourceMarker: false, targetMarker: false } },
      router: 'manhattan',
      data: { type: 'endNodeEdge', targetNodeId: item.id },
    })
  }
}

function getPathPoints(path: any) {
  var regex = /[ML]\s*([\d.-]+)\s*,?\s*([\d.-]+)?/g
  var matches
  var coordinates = []

  while ((matches = regex.exec(path)) !== null) {
    var x = parseFloat(matches[1])
    var y = parseFloat(matches[2])

    coordinates.push({ x: x, y: y })
  }

  return coordinates
}

function isPointOnLine(point: any, lineStart: any, lineEnd: any) {
  const k1 = (point.y - lineStart.y) / (point.x - lineStart.x)
  const k2 = (point.y - lineEnd.y) / (point.x - lineEnd.x)
  const res = Number(Math.abs(k1 - k2).toFixed(3))
  return res === 0
}
function generateNewPolyline(points: any[], targetPoint: any) {
  let res: any[] = []
  for (let i = 0; i < points.length; i++) {
    const item = points[i]
    const next = points[i + 1]
    if (!next) break
    res.push(item)
    if (isPointOnLine(targetPoint, item, next)) {
      res.push(targetPoint)
      break
    }
  }
  return res
}

const highlightLink = async (endNode: Node) => {
  const roadEdge = graph.value?.getEdges()[0] as Edge
  const roadEdgePoints = roadEdge.getPolyline().points
  const edgeView = graph.value?.getCellById(`${endNode.id}-end-node-edge`).findView(graph.value)
  const edgeSvgPath = edgeView?.container.children[1].getAttribute('d')
  const edgePoints = getPathPoints(edgeSvgPath)
  const highlightPoints = generateNewPolyline(roadEdgePoints, edgePoints[0])
  highlightPoints.push(...edgePoints.splice(1, edgePoints.length - 1))
  graph.value?.addEdge({
    source: highlightPoints[0],
    target: highlightPoints[highlightPoints.length - 1],
    vertices: highlightPoints.splice(1, highlightPoints.length - 1),
    attrs: {
      line: {
        stroke: '#FFA500',
        strokeWidth: 2,
        sourceMarker: false,
        targetMarker: false,
      },
    },
  })
  // roadEdge.remove()
}

const center = () => {
  graph.value?.zoomTo(1)
  setTimeout(() => {
    graph.value?.center()
  }, 0)
}

const backgroundImage = ref('')
const fileUpload = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event: any) => {
    backgroundImage.value = event?.target?.result
    graph.value?.drawBackground({
      image: backgroundImage.value,
    })
    graph.value?.updateBackground()
  }
  reader.readAsDataURL(file)
}

const uploadJson = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event: any) => {
    const jsonData = JSON.parse(event?.target?.result)
    graph.value?.fromJSON(jsonData)
  }
  reader.readAsText(file)
}

const clear = () => {
  graph.value?.clearCells()
  graph.value?.clearBackground()
}

const toJSON = () => {
  const jsonData: any = graph.value?.toJSON() || {}
  const data = JSON.stringify(jsonData)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'data.json'
  link.click()

  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.dimple-layout-editor-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dimple-layout-editor {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.dimple-layout-editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.dimple-layout-editor-toolbar-item {
  padding: 5px;
  font-size: 12px;
  /* cursor: move; */
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
}

.file-input {
  display: none;
}
</style>
