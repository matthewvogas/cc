import { useSwiper } from 'swiper/react';

export default function RegisterNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()} className='flex self-end mt-auto w-36 bg-primary rounded-lg text-white py-2 px-4'>Next</button>
  );
}