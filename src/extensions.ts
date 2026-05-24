import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import { createLowlight, all } from 'lowlight'

const lowlight = createLowlight(all)

export function buildExtensions(placeholder?: string) {
  return [
    StarterKit.configure({ codeBlock: false }),
    Underline,
    Typography,
    Superscript,
    Subscript,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { class: 'md-link', rel: 'noopener noreferrer', target: '_blank' },
    }),
    Image.configure({
      allowBase64: true,
      HTMLAttributes: { class: 'md-image' },
    }),
    Table.configure({ resizable: true }),
    TableRow,
    TableCell,
    TableHeader,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight.configure({ multicolor: true }),
    TaskList,
    TaskItem.configure({ nested: true }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'plaintext',
      HTMLAttributes: { class: 'md-code-block' },
    }),
    Placeholder.configure({
      placeholder: placeholder ?? 'Write something, or type \'/\' for commands…',
      emptyEditorClass: 'md-empty',
    }),
    CharacterCount,
  ]
}
