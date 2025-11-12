"use client"

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps, buttonVariants } from '@/components/ui/button'

const SCRAMBLE_DURATION = 600
const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const MotionButton = motion(Button)

function getRandomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
}

export interface AnimatedButtonProps
  extends Omit<ButtonProps, 'children'>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  label: string
  scrambleOnLeave?: boolean
  textClassName?: string
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      label,
      scrambleOnLeave = false,
      variant = 'default',
      size = 'default',
      className,
      textClassName,
      href,
      target,
      rel,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...buttonProps
    },
    ref,
  ) => {
    const [displayText, setDisplayText] = React.useState(label)
    const rafRef = React.useRef<number | null>(null)
    const measureRef = React.useRef<HTMLSpanElement>(null)
    const [labelWidth, setLabelWidth] = React.useState<number | null>(null)

    React.useLayoutEffect(() => {
      if (measureRef.current) {
        setLabelWidth(measureRef.current.getBoundingClientRect().width)
      }
    }, [label, textClassName])

    const cancelScramble = React.useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      setDisplayText(label)
    }, [label])

    const runScramble = React.useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      const letters = label.split('')
      const totalFrames = Math.max(letters.length * 8, Math.round((SCRAMBLE_DURATION / 1000) * 60))
      let frame = 0

      const animate = () => {
        const progress = Math.min(frame / totalFrames, 1)
        const revealedCount = Math.floor(progress * letters.length)
        const output = letters
          .map((char, idx) => (idx < revealedCount ? char : getRandomChar()))
          .join('')

        setDisplayText(output)
        frame += 1

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setDisplayText(label)
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }, [label])

    React.useEffect(() => {
      setDisplayText(label)
      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }, [label])

    const handleEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      runScramble()
      onMouseEnter?.(event)
    }

    const handleLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (scrambleOnLeave) {
        runScramble()
      } else {
        cancelScramble()
      }
      onMouseLeave?.(event)
    }

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      runScramble()
      onFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
      if (!scrambleOnLeave) {
        cancelScramble()
      }
      onBlur?.(event)
    }

    const textClasses = cn(
      'whitespace-nowrap font-mono tracking-[0.3em] uppercase text-[0.7rem] @lg:text-sm text-current',
      textClassName,
    )

    const content = (
      <span
        className="relative inline-flex items-center justify-center"
        style={labelWidth ? { minWidth: labelWidth } : undefined}
      >
        <span className={textClasses}>{displayText}</span>
        <span
          ref={measureRef}
          aria-hidden="true"
          className={cn('absolute pointer-events-none select-none opacity-0', textClasses)}
        >
          {label}
        </span>
      </span>
    )

    const computedClassName = cn(
      buttonVariants({ variant, size }),
      'relative overflow-hidden px-4 py-2 @lg:px-8 @lg:py-3',
      className,
    )

    const {
      onAnimationStart: _htmlAnimationStart,
      onAnimationEnd: _htmlAnimationEnd,
      onAnimationIteration: _htmlAnimationIteration,
      onDragStart: _htmlDragStart,
      onDragEnd: _htmlDragEnd,
      onDrag: _htmlDrag,
      onDragOver: _htmlDragOver,
      onDragEnter: _htmlDragEnter,
      onDragLeave: _htmlDragLeave,
      onDragExit: _htmlDragExit,
      onDrop: _htmlDrop,
      ...restButtonProps
    } = buttonProps

    const motionButtonProps: React.ComponentProps<typeof MotionButton> = {
      ref,
      variant,
      size,
      className: computedClassName,
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'aria-label': label,
      ...restButtonProps,
    }

    if (href) {
      return (
        <MotionButton {...motionButtonProps} asChild>
          <Link href={href} target={target} rel={rel} className="inline-flex w-full items-center justify-center">
            {content}
          </Link>
        </MotionButton>
      )
    }

    return <MotionButton {...motionButtonProps}>{content}</MotionButton>
  },
)
AnimatedButton.displayName = 'AnimatedButton'
