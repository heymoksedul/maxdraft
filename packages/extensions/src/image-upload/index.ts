import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import type { MaxDraftEditorProps } from '@maxdraft/shared'
import { SUPPORTED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES, fileToDataUrl } from '@maxdraft/shared'

export interface ImageUploadOptions {
  onImageUpload?: MaxDraftEditorProps['onImageUpload']
}

/**
 * ImageUpload extension — handles paste and drop of image files.
 * If `onImageUpload` is provided the returned URL is used; otherwise
 * the image is embedded as a base64 data URL.
 */
export const ImageUpload = Extension.create<ImageUploadOptions>({
  name: 'imageUpload',

  addOptions() {
    return { onImageUpload: undefined }
  },

  addProseMirrorPlugins() {
    const { onImageUpload } = this.options
    const editor = this.editor

    const handleFile = async (file: File) => {
      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) return
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        console.warn('[MaxDraft] Image exceeds 10 MB limit')
        return
      }

      let src: string

      if (onImageUpload) {
        src = await onImageUpload(file)
      } else {
        src = await fileToDataUrl(file)
      }

      editor.chain().focus().setImage({ src, alt: file.name }).run()
    }

    return [
      new Plugin({
        key: new PluginKey('imageUpload'),
        props: {
          handlePaste(_view, event) {
            const items = Array.from(event.clipboardData?.items ?? [])
            const imageItem = items.find((i) => i.type.startsWith('image/'))
            if (!imageItem) return false
            const file = imageItem.getAsFile()
            if (file) void handleFile(file)
            return true
          },

          handleDrop(_view, event) {
            const files = Array.from(event.dataTransfer?.files ?? [])
            const imageFile = files.find((f) => f.type.startsWith('image/'))
            if (!imageFile) return false
            void handleFile(imageFile)
            return true
          },
        },
      }),
    ]
  },
})
