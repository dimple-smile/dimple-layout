<template>
  <div class="custom-file-upload">
    <input type="file" id="file-upload" accept="image/png" class="file-input" @change="imageUpload" />
    <label for="file-upload" class="file-upload-btn"> 背景图片 </label>
  </div>
</template>

<script setup lang="ts">
import type { DimpleLayoutCanvas } from '../../type'

const props = defineProps<{
  canvas: DimpleLayoutCanvas
}>()

const imageUpload = (e: any) => {
  const { canvas } = props
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event: any) => {
    const base64 = event?.target?.result
    canvas.drawBackground({ image: base64 })
    canvas.updateBackground()
  }
  reader.readAsDataURL(file)
  e.target.value = ''
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
