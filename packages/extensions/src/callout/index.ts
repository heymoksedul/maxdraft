import { Node, mergeAttributes } from '@tiptap/core'

export type CalloutVariant = 'info' | 'warning' | 'danger' | 'success' | 'tip'

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attributes?: { variant?: CalloutVariant }) => ReturnType
      unsetCallout: () => ReturnType
    }
  }
}

/**
 * Callout extension — renders a styled callout / admonition block.
 *
 * Usage:
 * ```
 * editor.chain().focus().setCallout({ variant: 'info' }).run()
 * ```
 */
export const Callout = Node.create<CalloutOptions>({
  name: 'callout',
  group: 'block',
  content: 'block+',

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      variant: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-variant'),
        renderHTML: (attributes) => ({ 'data-variant': attributes['variant'] }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-callout': '',
        class: `md-callout md-callout-${HTMLAttributes['data-variant'] ?? 'info'}`,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setCallout:
        (attributes) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, attributes)
        },
      unsetCallout:
        () =>
        ({ commands }) => {
          return commands.lift(this.name)
        },
    }
  },
})
