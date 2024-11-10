import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'

import styles from './skeleton.module.css'

const skeletonStyles = cva(styles.skeleton, {
  variants: {
    speed: {
      slow: styles['skeleton--slow'],
      medium: styles['skeleton--medium-speed'],
      fast: styles['skeleton--fast'],
    },
  },
  defaultVariants: {
    speed: 'slow',
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonStyles> {
  width?: string | number
  height?: string | number
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  speed,
  width,
  height,
  ...props
}) => {
  return (
    <div
      className={classNames(skeletonStyles({ speed }), className)}
      style={{ width, height }}
      {...props}
    />
  )
}

export default Skeleton
