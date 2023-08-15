'use client'

// Importación de dependencias y componentes de React
import { HtmlHTMLAttributes, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { ptMono } from '@/app/fonts'
import { RegisterNextButton } from './registerNextButton'

// Importación de imágenes y archivos CSS
import check from 'public/assets/SandBox/Cards/check.svg'
import userAgency from 'public/assets/creatorRegister/user-agency.png'
import registerBg from 'public/assets/creatorRegister/bg-connect-with-account.jpg'
import SuccesfullyCreatorConnectionImage from 'public/assets/creatorRegister/SuccesfullyCreatorConnection.png'
import InstagramLogo from 'public/assets/register/InstagramRegister.svg'
import InstagramLogoBlack from 'public/assets/creatorRegister/InstagramLogoBlack.svg'

// Importación de estilos de Swiper
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper.css'

// Componente principal RegisterPage
export default function RegisterPage() {
  // Hooks de estado para el manejo de valores
  const [initialValue, setInitialValue] = useState('')
  const [displayMenu, setDiaplayMenu] = useState(0)

  const [instagramSlideText, setInstagramSlideText] = useState(
    'Let’s connect your Instagram so you never have to send another stats screenshot in your life',
  )
  const [tiktokSlideText, setTiktokSlideText] = useState(
    'Let’s connect your TikTok so you never have to send another stats screenshot in your life',
  )

  const [instagramConection, setInstagramConectionText] = useState(false)
  const [tiktokConection, setTiktokConectionText] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  // Función para manejar la visualización de los elementos en el menu
  function handleDisplayStuff() {
    const display = document.querySelector('.displayMenu')
    const step1 = document.querySelector('.steps-1')
    const step1Number = document.querySelector('.stepNumber-1')
    setDiaplayMenu(displayMenu + 1)

    if (displayMenu === 0) {
      step1?.classList.remove('hidden')
      step1Number?.classList.add('hidden')
    }

    if (displayMenu === 2) {
      display?.classList.add('hidden')
    }
  }

  // Función para validar el formato del correo electrónico
  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Función para manejar la conexión con Instagram
  function hanledInstagramConection(event: any) {
    setInstagramConectionText(true)

    const step2 = document.querySelector('.steps-2')
    const step2Number = document.querySelector('.stepNumber-2')
    const social = event.target
    const instagram = document.querySelector('.instagram')
    const instagramBlack = document.querySelector('.instagramBlack')
    const nextButton = document.getElementById('nextButton2')

    // setInstagramConectionText('Connection successful! Welcome 🥥')
    social?.classList.add('bg-[#E9F7F0]')
    social?.classList.add('text-black')
    social?.classList.remove('text-white')

    instagram?.classList.add('hidden')
    instagramBlack?.classList.remove('hidden')

    step2?.classList.remove('hidden')
    step2Number?.classList.add('hidden')
    nextButton?.classList.remove('hidden')

    setInstagramSlideText('Amazing....')
  }

  // Función para manejar la conexión con TikTok
  function hanledTikTokConection(event: any) {
    setTiktokConectionText(true)

    const step3 = document.querySelector('.steps-3')
    const step3Number = document.querySelector('.stepNumber-3')
    const social = event.target
    const tiktok = document.querySelector('.tiktok')
    const tiktokBlack = document.querySelector('.tiktokBlack')
    const nextButton = document.getElementById('nextButton3')

    // setTiktokConectionText('Connection successful! Welcome 🥥')
    social?.classList.add('bg-[#E9F7F0]')
    social?.classList.add('text-black')
    social?.classList.remove('text-white')

    tiktok?.classList.add('hidden')
    tiktokBlack?.classList.remove('hidden')

    step3?.classList.remove('hidden')
    step3Number?.classList.add('hidden')

    nextButton?.classList.remove('hidden')

    setTiktokSlideText('Amazing....')
  }

  // Función para manejar los cambios en los campos de entrada
  function handleInputChange(event: any) {
    const input = event.target

    const nameInput = document.getElementById('nameInput') as HTMLInputElement
    const emailInput = document.getElementById('emailInput') as HTMLInputElement
    const nextButton = document.getElementById('nextButton')

    const name = nameInput ? nameInput.value.trim() : ''
    const email = emailInput ? emailInput.value.trim() : ''

    // Verificar si tanto el nombre como el correo electrónico son válidos
    if (name !== '' && validateEmail(email)) {
      if (nextButton) {
        nextButton?.classList.remove('hidden')
      }
    } else {
      if (nextButton) {
        nextButton?.classList.add('hidden')
      }
    }

    const smallText = input.nextElementSibling?.querySelector('.small-text')

    if (input.value) {
      if (smallText) {
        smallText.classList.add('hidden')
      }
    } else {
      if (smallText) {
        smallText.classList.remove('hidden')
      }
    }
  }

  const captureInformation = () => {
    const data = {
      nombre: name,
      email: email,
      conections: {
        instagram: instagramConection,
        tiktok: tiktokConection,
      },
    }
  }
  // Componente RegisterPage devuelto por el componente principal
  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
      {/* Imagen de fondo */}
      <Image
        priority
        className='absolute -z-20 h-full w-full object-cover object-center'
        src={registerBg}
        alt='background'
        fill
      />
      <div className='flex w-[500px] flex-col items-center justify-center gap-4 p-10 text-center text-white'>
        <section className='relative h-[600px]'>
          <div className='flex w-[1000px] flex-row items-center justify-center rounded-2xl bg-background bg-opacity-20'>
            {/* Menú lateral */}
            <div className='bg-[#F1ECE7] relative h-[580px] w-[254px] flex flex-col justify-between py-5 pl-4 pr-[24px] -mr-[10px] items-center text-black rounded-l-lg displayMenu'>
              <div className='w-full'>
                <p className='text-xl mb-2'>🥥</p>
                <h4 className='text-lg font-semibold mb-4'>Get connected</h4>
                <div
                  className={`${ptMono.className} gap-2 flex flex-col w-[204px]`}>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-1 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-1'>1.</span> Basic info
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-2 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-2'>2.</span> Connect Instagram
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-3 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-3'>3.</span> Connect TikTok
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <div className='divider -mb-2 px-5 opacity-70'></div>
                <p className='text-sm italic font-light'>
                  you’re connecting with
                </p>
                <div className='flex gap-3 w-full justify-center'>
                  <Image src={userAgency} alt='' className='w-[50px]' />
                  <div className='flex flex-col items-start'>
                    <h5 className='font-semibold text-base'>{`WithRosalind`}</h5>
                    <p className='text-xs font-light'>agency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Swiper para los pasos del registro */}
            <Swiper
              pagination={{
                type: 'progressbar',
              }}
              slidesPerView={1}
              modules={[Pagination]}
              allowTouchMove={false}
              className='h-full w-full'>
              {/* Primer paso: información básica */}
              <SwiperSlide style={{ borderRadius: '10px' }}>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black mb-5'>
                    Fantastic you could make it! <br /> Here’s a few basic
                    things to start with:
                  </h1>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 ${ptMono.className}`}>
                    <div className='flex w-full flex-col gap-4 pr-11'>
                      <div className='relative'>
                        <input
                          id='nameInput'
                          type='text'
                          value={name}
                          onChange={handleNameChange}
                          className={`rounded-full bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full ${ptMono.className}`}
                          onInput={handleInputChange}
                        />
                        <div
                          className={`${initialValue} top-4  absolute left-6 pointer-events-none flex items-center`}>
                          <div
                            className={`small-text opacity-90 ${initialValue}`}>
                            <span className='text-base'>Name</span>{' '}
                            <span className='text-xs'>
                              (how an agency would know you as)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='relative'>
                        <input
                          id='emailInput'
                          type='text'
                          value={email}
                          onChange={handleEmailChange}
                          className={`rounded-full bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full ${ptMono.className}`}
                          onInput={handleInputChange}
                        />
                        <div
                          className={`${initialValue} top-4  absolute left-6 pointer-events-none flex items-center`}>
                          <div
                            className={`small-text opacity-90 ${initialValue}`}>
                            <span className='text-base'>Email</span>{' '}
                            <span className='text-xs'>
                              (we won’t bother you with marketing)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <RegisterNextButton
                      id='nextButton'
                      onClickCapture={() => {
                        handleDisplayStuff()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2 hidden ${ptMono.className}`}>
                      next
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              {/* Segundo paso: conexión con Instagram */}
              <SwiperSlide>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black w-[75%]'>
                    {instagramSlideText}
                  </h1>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 `}>
                    <div className='flex w-full flex-col gap-4 pr-11 items-start text-left'>
                      <button
                        onClick={hanledInstagramConection}
                        className={`${ptMono.className} bg-[#859991] py-3 text-white mb-6 pl-5 pr-8 rounded-lg flex items-center gap-2`}>
                        <Image
                          src={InstagramLogo}
                          className='opacity-60 instagram w-[30px]'
                          alt=''
                        />
                        <Image
                          src={InstagramLogoBlack}
                          className='opacity-60 hidden instagramBlack w-[30px]'
                          alt=''
                        />
                        {instagramConection == false
                          ? 'Connect to Instagram'
                          : 'Connection successful 🍸'}
                      </button>
                      <p className='text-xs font-light italic'>
                        Instagram will ask you to login on a redirected page
                      </p>
                      <p className='text-xs font-light italic'>
                        Cold feet? We can’t access and don’t save login data.
                        Learn more about <br /> Codecoco’s{' '}
                        <Link className='underline' href={'/privacy'}>
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link className='underline' href={'/terms'}>
                          Terms
                        </Link>{' '}
                        and Conditions here.
                      </p>
                    </div>
                    <RegisterNextButton
                      id='nextButton2'
                      onClickCapture={() => {
                        handleDisplayStuff()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2 hidden ${ptMono.className}`}>
                      next
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              {/* Tercer paso: conexión con TikTok */}
              <SwiperSlide>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black  w-[75%]'>
                    {' '}
                    {tiktokSlideText}{' '}
                  </h1>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 `}>
                    <div className='flex w-full flex-col gap-4 pr-11 items-start text-left'>
                      <button
                        onClick={hanledTikTokConection}
                        className={`${ptMono.className} bg-[#859991] py-3 text-white mb-6 pl-5 pr-8 rounded-lg flex items-center gap-2`}>
                        <Image
                          src={InstagramLogo}
                          className='opacity-60 tiktok'
                          alt=''
                        />{' '}
                        <Image
                          src={InstagramLogoBlack}
                          className='opacity-60 hidden tiktokBlack w-[30px]'
                          alt=''
                        />{' '}
                        {tiktokConection == false
                          ? 'Connect to TikTok'
                          : 'Connection successful 🍸'}
                      </button>
                      <p className='text-xs font-light italic'>
                        TikTok will ask you to login on a redirected page
                      </p>
                      <p className='text-xs font-light italic'>
                        Cold feet? We can’t access and don’t save login data.
                        Learn more about <br /> Codecoco’s{' '}
                        <Link className='underline' href={'/privacy'}>
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link className='underline' href={'/terms'}>
                          Terms
                        </Link>{' '}
                        and Conditions here.
                      </p>
                    </div>
                    <RegisterNextButton
                      id='nextButton3'
                      onClickCapture={() => {
                        handleDisplayStuff(), captureInformation()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2 hidden ${ptMono.className}`}>
                      next
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              {/* Cuarto paso: finalización del registro */}
              <SwiperSlide>
                <div className='flex flex-col content-start items-start justify-start bg-white h-[580px] text-black rounded-lg'>
                  <div className='flex flex-col gap-4 w-full h-[214px] bg-[#F2EDE7] py-12 px-14 rounded-t-md'>
                    <div className='flex gap-8 w-full justify-center'>
                      <Image src={userAgency} alt='' className='w-[125px]' />
                      <div className='flex flex-col items-start justify-center gap-2'>
                        <h5 className='font-bold text-2xl'>
                          With that done, we will let With Rosalind know 🥂
                        </h5>
                        <p className='text-base font-normal text-left'>
                          From now on, you don’t need to follow up about posting
                          or send stats. <br /> WithRosalind will be able to see
                          automatically. Isn’t that nice?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='h-full bg-white  px-20 flex w-full justify-between'>
                    <div className='text-left flex flex-col justify-center gap-8 h-full'>
                      <h4 className='text-lg font-bold'>
                        Positive you’re not interested in <br /> joining
                        Codecoco? 🥥
                      </h4>
                      <ul className='flex flex-col gap-2'>
                        <li className='flex gap-1 text-base font-medium'>
                          <Image src={check} className='opacity-50' alt='' />{' '}
                          never send a single stats screenshot again
                        </li>
                        <li className='flex gap-1 text-base font-medium'>
                          <Image src={check} className='opacity-50' alt='' />{' '}
                          track and review all your post results
                        </li>
                        <li className='flex gap-1 text-base font-medium'>
                          <Image src={check} className='opacity-50' alt='' />{' '}
                          present your work beautifully to brands
                        </li>
                      </ul>
                      <div className='flex gap-4'>
                        <Link
                          href={'/signup'}
                          className='py-3 px-6 bg-[#E2F5EC] rounded-full'>
                          Get Started 🥥
                        </Link>
                        <Link
                          href={'/'}
                          className='py-3 px-6 bg-[#FEF1EB] rounded-full'>
                          Learn more 🥥
                        </Link>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={SuccesfullyCreatorConnectionImage}
                        className='w-[380px]'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <div className='my-7 h-px w-full rounded-r-full bg-white opacity-50 hidden'></div>
      </div>
    </div>
  )
}
