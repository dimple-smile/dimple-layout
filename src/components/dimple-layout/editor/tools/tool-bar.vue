<template>
  <div class="dimple-layout-editor-toolbar">
    <slot name="left-tools">
      <template v-for="item in leftTools">
        <ToolItem :canvas="props.canvas" :item="item"></ToolItem>
      </template>
    </slot>
    <div style="flex: 1"></div>

    <slot name="center-tools">
      <template v-for="item in centerTools">
        <ToolItem :canvas="props.canvas" :item="item"></ToolItem>
      </template>
    </slot>
    <div style="flex: 1"></div>
    <slot name="right-tools">
      <template v-for="item in rightTools">
        <ToolItem :canvas="props.canvas" :item="item"></ToolItem>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ToolItem from './tool-item.vue'
import type { DimpleLayoutCanvas, DimpleLayoutEditorTool } from '../type'
const props = defineProps<{ canvas: DimpleLayoutCanvas; data: DimpleLayoutEditorTool[] }>()
const tools = computed(() => props.data)

const leftTools = computed(() => tools.value.filter((item) => item.position === 'left' || !item.position))
const centerTools = computed(() => tools.value.filter((item) => item.position === 'center'))
const rightTools = computed(() => tools.value.filter((item) => item.position === 'right'))
</script>

<style scoped>
.dimple-layout-editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
