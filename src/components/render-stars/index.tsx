import Image from 'next/image'
import { CSSProperties } from 'react'

type RenderStarProps = {
  counter: number
}

export default function RenderStar({ counter }: RenderStarProps) {
  const totalImages = 5
  const filledImages = Math.min(counter, totalImages)
  const emptyImages = totalImages - filledImages

  const styleStar: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
  }

  return (
    <div style={styleStar}>
      {[...Array(filledImages)].map((_, index) => (
        <Image
          key={`filled-${index}`}
          src="/icons/starFilled.svg"
          alt="Star"
          width={20}
          height={20}
        />
      ))}

      {[...Array(emptyImages)].map((_, index) => (
        <Image
          key={`empty-${index}`}
          src="/icons/star.svg"
          alt="Star"
          width={20}
          height={20}
        />
      ))}
    </div>
  )
}
