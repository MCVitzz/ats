import Image from 'next/image'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'bg' | 'xs'
}

const getSize = (size: string) => {
  switch (size) {
    case 'xs':
      return { w: 100, h: 13 }
    case 'sm':
      return { w: 149, h: 22 }
    case 'md':
      return { w: 297, h: 45 }
    case 'bg':
      return { w: 594, h: 90 }
    default:
      return { w: 100, h: 13 }
  }
}

export default function Logo({ size = 'md' }: LogoProps) {
  const nSize = getSize(size)

  return (
    <Image
      priority
      src="/logo.svg"
      width={nSize.w}
      height={nSize.h}
      alt="Logo"
    />
  )
}
