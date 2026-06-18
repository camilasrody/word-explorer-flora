'use client'

import { type ChangeEvent } from 'react'
import { Input } from '@/components/atoms/Input'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search words…',
  className,
}: SearchBarProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  return (
    <div className={cn('relative', className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        ⌕
      </span>
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-8"
        aria-label={placeholder}
      />
    </div>
  )
}
