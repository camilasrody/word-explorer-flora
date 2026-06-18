'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/components/atoms/Button'
import { Spinner } from '@/components/atoms/Spinner'
import { useModal } from '@/hooks/useModal'

const WordDetail = dynamic(
  () => import('@/components/organisms/WordDetail').then((m) => ({ default: m.WordDetail })),
  { loading: () => <div className="flex justify-center py-8"><Spinner size="lg" /></div>, ssr: false },
)

interface WordModalProps {
  word: string | null
  onClose: () => void
}

export function WordModal({ word, onClose }: WordModalProps) {
  const { dialogRef } = useModal(!!word, onClose)

  if (!word) return null

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full max-w-2xl border border-gray-200 bg-white p-6 shadow-xl backdrop:bg-black/50 dark:border-gray-700 dark:bg-gray-900"
      aria-labelledby="modal-word-title"
      aria-modal="true"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="modal-word-title"
          className="text-base font-semibold text-gray-900 dark:text-gray-100"
        >
          {word}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
          ✕
        </Button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        <WordDetail word={word} />
      </div>
    </dialog>
  )
}
