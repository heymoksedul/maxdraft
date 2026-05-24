export const MAXDRAFT_VERSION = '0.0.1'

export const DEFAULT_PLACEHOLDER = 'Write something, or type \'/\' for commands…'

export const DEFAULT_AUTOSAVE_DELAY = 2000

export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const
export type HeadingLevel = (typeof HEADING_LEVELS)[number]

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
