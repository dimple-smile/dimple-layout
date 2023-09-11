<template>
  <div ref="containerEl" class="dimple-layout-editor-toolbar-item">
    <template v-if="hasComponent">
      <ItemComponent :canvas="props.canvas"></ItemComponent>
    </template>
    <template v-else>
      <template v-if="item.icon">
        <img :src="item.icon" />
      </template>
      <template v-else>{{ item.name.value || item.name }}</template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
import type { DimpleLayoutCanvas, DimpleLayoutEditorTool } from '../type'
const props = defineProps<{ canvas: DimpleLayoutCanvas; item: DimpleLayoutEditorTool }>()

const item = computed(() => props.item)
const hasComponent = !!props.item.component
const ItemComponent = props.item.component

const containerEl = ref<HTMLDivElement | null>(null)

let listeners: any = {}

const addEventListener = () => {
  const on: any = item.value.on || {}
  Object.keys(on).forEach((key) => {
    listeners[key] = (event: any) => on?.[key](event, props.canvas)
    containerEl.value?.addEventListener(key, listeners[key])
  })
}

const removeEventListener = () => {
  Object.keys(listeners).forEach((key) => {
    containerEl.value?.removeEventListener(key, listeners[key])
  })
  listeners = {}
}

onMounted(() => {
  item.value.onMounted?.(props.canvas)
  addEventListener()
})

onBeforeUpdate(() => {
  removeEventListener()
  setTimeout(() => {
    addEventListener()
  }, 0)
})

onBeforeUnmount(() => {
  removeEventListener()
})
</script>

<style scoped>
.dimple-layout-editor-toolbar-item {
  margin-right: 20px;
  padding: 10px 0;
  cursor: pointer;
}
.dimple-layout-editor-toolbar-item:last-child {
  margin-right: 0px;
}
</style>
