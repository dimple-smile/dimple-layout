import { ref } from 'vue'
import { default as DimpleLayoutEditor } from './editor.vue'
const getDimpleLayoutEditorRef = () => ref<InstanceType<typeof DimpleLayoutEditor> | null>(null)

export { DimpleLayoutEditor, getDimpleLayoutEditorRef }
