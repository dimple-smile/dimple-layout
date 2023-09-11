<template>
  <div class="dimple-layout-editor-container">
    <slot name="tool-bar">
      <DimpleLayoutEditorToolBar :data="tools" :canvas="(canvas as any)"></DimpleLayoutEditorToolBar>
    </slot>
    <div ref="containerEl" class="dimple-layout-editor-canvas"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useEditor } from './use-editor'

import DimpleLayoutEditorToolBar from './tools/tool-bar.vue'

import type { DimpleLayoutEditorOptions } from './type'

const props = defineProps<{ options?: DimpleLayoutEditorOptions }>()

const { init, containerEl, canvas, tools } = useEditor()

// let resizeObserver: ResizeObserver
onMounted(() => {
  init(props.options || {})
  // resizeObserver = new ResizeObserver(([node]) => {
  //   const { contentRect } = node
  //   canvas.value?.resize(contentRect.width, contentRect.height)
  // })
  // resizeObserver.observe(containerEl.value!)
})

// onBeforeUnmount(() => {
//   resizeObserver.disconnect()
// })

defineExpose({
  canvas,
})
</script>

<style scoped>
.dimple-layout-editor-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dimple-layout-editor-canvas {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
