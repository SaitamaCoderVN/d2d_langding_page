'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 font-mono',
  {
    variants: {
      variant: {
        default:
          'text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:shadow-[0_0_35px_rgba(59,130,246,0.65)] hover:scale-[1.02] active:scale-[0.98] bg-[linear-gradient(135deg,_hsla(var(--primary)_/_0.95)_0%,_hsla(var(--primary)_/_0.75)_100%)] hover:bg-[linear-gradient(135deg,_hsla(var(--primary)_/_1)_0%,_hsla(var(--primary)_/_0.85)_100%)]',
        outline:
          'border border-primary/50 bg-background text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:border-primary/70 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-primary/60',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
      },
      size: {
        default: 'px-5 py-2.5',
        sm: 'px-3 py-2 text-xs',
        lg: 'px-8 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
