import { Extension } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion'
import type { SlashCommandItem } from '@maxdraft/shared'

export interface SlashCommandOptions {
  items?: SlashCommandItem[]
  renderComponent?: (props: {
    items: SlashCommandItem[]
    command: (item: SlashCommandItem) => void
    selectedIndex: number
  }) => React.ReactElement
}

/**
 * SlashCommand extension — opens a command palette when the user types `/`.
 * Pair with `@maxdraft/ui`'s `SlashCommandList` for the default UI.
 */
export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: 'slashCommand',

  addOptions() {
    return {
      items: [],
      renderComponent: undefined,
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        command: ({ editor, range, props }) => {
          const item = props as SlashCommandItem
          editor.chain().focus().deleteRange(range).run()
          item.action(editor)
        },
        items: ({ query }) => {
          const allItems = this.options.items ?? []
          if (!query) return allItems
          const q = query.toLowerCase()
          return allItems.filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              item.keywords.some((k) => k.includes(q)),
          )
        },
      } as unknown as SuggestionOptions),
    ]
  },
})
