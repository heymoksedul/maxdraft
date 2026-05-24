// Re-export tiptap core so consumers don't need to install it separately
export { Editor, Extension, Node, Mark } from '@tiptap/core'

export { createEditor } from './editor'
export { buildBaseExtensions } from './extensions'
export * from './commands'
export * from './serializer'
