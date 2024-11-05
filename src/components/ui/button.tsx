import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'

import styles from './button.module.css'

const buttonStyles = cva(styles.button, {
  variants: {
    intent: {
      primary: styles['button--primary'],
      secondary: styles['button--secondary'],
    },
    size: {
      small: styles['button--small'],
      medium: styles['button--medium'],
      large: styles['button--large'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, intent, size, isLoading, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          buttonStyles({ intent, size }),
          className,
          isLoading && styles['button--loading'],
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? <span className={styles.spinner} /> : children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
