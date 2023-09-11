const modules: any = import.meta.glob('./*/index.ts', { eager: true })

export const buildInTools = Object.keys(modules).map((key) => modules[key].default)
