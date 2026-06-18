import { forwardRef, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/atoms/Input'
import { cn } from '@/lib/utils'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className, ...props }, ref) => (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <Input ref={ref} id={id} error={error} {...props} />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  ),
)

FormField.displayName = 'FormField'
