import type { ReactElement } from 'react'
import { Extension } from '@tiptap/core'
import type { Range } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import type { SlashCommandItem } from '@maxdraft/shared'

export interface SlashCommandOptions {
  items?: SlashCommandItem[]
  renderComponent?: (props: {
    items: SlashCommandItem[]
    command: (item: SlashCommandItem) => void
    selectedIndex: number
  }) => ReactElement
}

/**
 * SlashCommand extension — opens a command palette when the user types `/`.
 * Pair with `@maxdraft/ui`'s `SlashCommandList` for the default UI.
 */
export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: 'slashCommand',

  addOptions() {
    return {
      items: [] as SlashCommandItem[],
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: import('@tiptap/core').Editor
          range: Range
          props: unknown
        }) => {
          const item = props as SlashCommandItem
          editor.chain().focus().deleteRange(range).run()
          item.action(editor)
        },
        items: ({ query }: { query: string }) => {
          const allItems = this.options.items ?? []
          if (!query) return allItems
          const q = query.toLowerCase()
          return allItems.filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              item.keywords.some((k) => k.includes(q)),
          )
        },
      }),
    ]
  },
})
