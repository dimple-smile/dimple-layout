<template>
  <div class="custom-file-upload">
    <input type="file" id="file-upload-1" accept="json" class="file-input" @change="uploadJson" />
    <label for="file-upload-1" class="file-upload-btn"> 导入 </label>
  </div>
</template>

<script setup lang="ts">
import type { DimpleLayoutCanvas } from '../../type'

const props = defineProps<{
  canvas: DimpleLayoutCanvas
}>()

const uploadJson = (e: any) => {
  const { canvas } = props

  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event: any) => {
    const jsonData = JSON.parse(event?.target?.result)
    canvas.fromJSON(jsonData)
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.custom-file-upload {
  position: relative;
  display: inline-block;
}

.file-input {
  display: none;
}
</style>
