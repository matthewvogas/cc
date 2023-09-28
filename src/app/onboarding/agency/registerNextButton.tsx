import React, { ButtonHTMLAttributes } from 'react'
import { useSwiper } from 'swiper/react'

export const RegisterNextButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const swiper = useSwiper()

  const handleClick = () => {
    swiper.slideNext()
  }

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  )
}
