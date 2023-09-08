'use client'

type Props = {
  key: number
}

export default function CardCarouselPostItem({ key }: Props) {
  return (
    <>
      <a
        href={`#item${key}`}
        className='px-2 py-2 bg-beigeSelected hover:bg-beigeBorder '></a>
    </>
  )
}
