<template>
  <div class="container">
    <!-- <div @mousedown="handleDragStart">外部拖入</div> -->
    <div class="layout-editor">
      <DimpleLayoutEditor ref="editor" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DimpleLayoutEditor, getDimpleLayoutEditorRef } from './components/dimple-layout'

import type { DimpleLayoutEditorOptions } from './components/dimple-layout/type'

const options: DimpleLayoutEditorOptions = {
  tools: [
    {
      key: 'custom',
      name: '目标点',
      index: 3.1,
      on: {
        mousedown: (event, canvas) => {
          const node = canvas.createRouteNode()
          canvas.dnd.start(node, event)
        },
      },
    },
  ],
}

const editor = getDimpleLayoutEditorRef()

const handleDragStart = (event: any) => {
  const canvas = editor.value?.canvas!
  const node = canvas.createRouteNode()
  canvas.dnd.start(node, event)
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.layout-editor {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
