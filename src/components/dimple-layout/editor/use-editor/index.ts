import { ref, watch, onMounted, shallowRef, h, render, computed } from 'vue'
import { Graph, EdgeView, Node, Edge, CellView } from '@antv/x6'
import mergeWith from 'lodash-es/mergeWith'

import { buildInTools } from '../tools'
import { buildInPlugins } from '../plugins'

import type { DimpleLayoutCanvas, DimpleLayoutEditorOptions, DimpleLayoutEditorTool } from '../type'

export const useEditor = () => {
  const containerEl = ref<HTMLDivElement>()
  const canvas = ref<DimpleLayoutCanvas | null>()
  const defaultOptions: DimpleLayoutEditorOptions = {
    autoResize: true, // 自动大小
    mousewheel: true, // 滚轮缩放
    scaling: { min: 0.25, max: 10 }, // 缩放大小限制
    panning: false, // 平移
    background: { color: '#F2F7FA' },
    translating: { restrict: true }, // 限制节点只在画布范围内
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
    tools: buildInTools,
  }

  const tools = shallowRef<DimpleLayoutEditorTool[]>([])
  const backgroundConfig = shallowRef({})

  const init = async (initOptions?: DimpleLayoutEditorOptions) => {
    const options: DimpleLayoutEditorOptions = mergeWith(defaultOptions, initOptions || {}, (objValue, srcValue) => {
      if (Array.isArray(objValue)) return objValue.concat(srcValue)
    })

    options.container = options.container || containerEl.value
    canvas.value = new Graph(options) as any
    backgroundConfig.value = options.background || {}

    // 重新一些方法
    const oldDrawBackground = canvas.value?.drawBackground.bind(canvas.value)
    const oldToJSON = canvas.value?.toJSON.bind(canvas.value)
    const oldClearBackground = canvas.value?.clearBackground.bind(canvas.value)

    // @ts-ignore
    canvas.value.drawBackground = (options: any) => {
      oldDrawBackground?.(options)
      backgroundConfig.value = { ...backgroundConfig.value, ...options }
    }

    // @ts-ignore
    canvas.value.toJSON = () => {
      const res: any = oldToJSON?.()
      res.backgroundConfig = backgroundConfig.value
      return res
    }

    // @ts-ignore
    canvas.value.clearBackground = () => {
      oldClearBackground?.()
      backgroundConfig.value = options.background || {}
    }

    // 工具栏相关
    const initTools = options.tools || []
    const sortTools = (data: DimpleLayoutEditorTool[]) => data.sort((item, next) => (item.index ?? initTools.length + 1) - (next.index ?? initTools.length + 1))
    tools.value = sortTools(initTools)
    canvas.value!.getTools = () => tools.value
    canvas.value!.setTools = (data) => (tools.value = sortTools(data))
    tools.value.forEach((item) => item.onMounted?.(canvas.value!))

    // @ts-ignore
    canvas.value!.createRouteNode = (options) => {
      if (!options) options = {}
      const {
        shape = 'image',
        width = 50,
        height = 50,
        data = {},
        imageUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F07%2F20200507234627_hbvdc.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1696928364&t=6ccaf2abb26b4b32b6184f21f6945caf',
      } = options
      data.isRouteNode = true
      return canvas.value?.createNode({ ...options, shape, width, height, data, imageUrl })
    }
    Object.values(buildInPlugins).forEach((item: any) => item(canvas.value!))
  }

  return { init, containerEl, canvas, tools }
}
