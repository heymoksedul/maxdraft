'use client'

import * as React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { cn } from '@maxdraft/shared'

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  shortcut?: string
  isActive?: boolean
  size?: 'sm' | 'md'
}

export function ToolbarButton({
  label,
  shortcut,
  isActive,
  size = 'md',
  className,
  children,
  ...props
}: ToolbarButtonProps) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              'inline-flex items-center justify-center rounded',
              'transition-colors duration-100',
              'text-[var(--md-text)] hover:bg-[var(--md-accent)] hover:text-[var(--md-accent-hover)]',
              'disabled:pointer-events-none disabled:opacity-40',
              isActive && 'bg-[var(--md-accent)] text-[var(--md-accent-hover)]',
              size === 'sm' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm',
              className,
            )}
            {...props}
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={6}
            className="z-50 rounded bg-zinc-900 px-2 py-1 text-xs text-white shadow-md"
          >
            {label}
            {shortcut && (
              <span className="ml-1.5 opacity-60">{shortcut}</span>
            )}
            <Tooltip.Arrow className="fill-zinc-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
