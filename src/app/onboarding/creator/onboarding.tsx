'use client'

import { HtmlHTMLAttributes, useEffect, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { ptMono } from '@/app/fonts'
import { RegisterNextButton } from './registerNextButton'

import check from 'public/assets/SandBox/Cards/check.svg'
import userAgency from 'public/assets/creatorRegister/user-agency.png'
import registerBg from 'public/assets/creatorRegister/bg-creatorCreateAccountbyInvitation.jpg'
import InstagramLogo from 'public/assets/register/InstagramRegister.svg'
import InstagramLogoBlack from 'public/assets/creatorRegister/InstagramLogoBlack.svg'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper.css'

export default function Onboarding() {

  const [initialValue, setInitialValue] = useState('')
  const [displayMenu, setDiaplayMenu] = useState(0)
  const [instagramConection, setInstagramConectionText] = useState(false)
  const [tiktokConection, setTiktokConectionText] = useState(false)

  function handleDisplayStuff() {
    const step1 = document.querySelector('.steps-1')
    const step2 = document.querySelector('.steps-2')
    const step3 = document.querySelector('.steps-3')
    const step1Number = document.querySelector('.stepNumber-1')
    const step2Number = document.querySelector('.stepNumber-2')
    const step3Number = document.querySelector('.stepNumber-3')
    setDiaplayMenu(displayMenu + 1)

    if (displayMenu === 0) {
      step1?.classList.remove('hidden')
      step1Number?.classList.add('hidden')
    }

    if (displayMenu === 1) {
      step2?.classList.remove('hidden')
      step2Number?.classList.add('hidden')
    }

    if (displayMenu === 2) {
      step3?.classList.remove('hidden')
      step3Number?.classList.add('hidden')
    }

    if (aboutBrandsSelecteds) {
    }
  }

  // Función para validar el formato del correo electrónico
  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Función para manejar la conexión con Instagram
  function hanledInstagramConection(event: any) {
    const social = event.target
    const instagram = document.querySelector('.instagram')
    const instagramBlack = document.querySelector('.instagramBlack')

    setInstagramConectionText(true)
    social?.classList.add('bg-[#E9F7F0]')
    social?.classList.add('text-black')
    social?.classList.remove('text-white')

    instagram?.classList.add('hidden')
    instagramBlack?.classList.remove('hidden')
  }

  // Función para manejar la conexión con TikTok
  function hanledTikTokConection(event: any) {
    const social = event.target
    const tiktok = document.querySelector('.tiktok')
    const tiktokBlack = document.querySelector('.tiktokBlack')

    setTiktokConectionText(true)
    social?.classList.add('bg-[#E9F7F0]')
    social?.classList.add('text-black')
    social?.classList.remove('text-white')

    tiktok?.classList.add('hidden')
    tiktokBlack?.classList.remove('hidden')
  }

  useEffect(() => {
    const nextButton = document.getElementById('nextButton4')
    const step4 = document.querySelector('.steps-4')
    const step4Number = document.querySelector('.stepNumber-4')

    if (instagramConection == true && tiktokConection == true) {
      step4?.classList.remove('hidden')
      step4Number?.classList.add('hidden')
      nextButton?.classList.remove('hidden')
    }
  }, [instagramConection, tiktokConection])

  // Función para manejar los cambios en los campos de entrada
  function handleInputChange(event: any) {
    const input = event.target

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

  const [aboutBrandsSelecteds, setAboutBrandsSelecteds] = useState<string[]>([])
  const [genderSelecteds, setGenderSelecteds] = useState<string[]>([])
  const [interested, setInteresed] = useState<string[]>([])

  const aboutBrand = [
    'beauty',
    'home design',
    'fashion',
    'skincare',
    'haircare',
    'luxury fashion',
    'travel',
    'luxury travel',
    'fitness',
    'food',
    'dining out',
    'cooking',
    'family',
    'dogs',
    'I literally am a dog',
    'dating',
    'LGBTQ+',
    'pop culture',
    'other',
  ]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [infoAboutCreator, setInfoAboutCreator] = useState('')
  const [location, setLocation] = useState('')

  const handleInfoAboutCreator = (event: any) => {
    setInfoAboutCreator(event.target.value)
  }

  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value)
  }

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value)
  }

  const handleBrandClick = (typeBrand: string) => {
    const isSelected = aboutBrandsSelecteds.includes(typeBrand)
    const nextButton = document.getElementById('nextButton2')

    setAboutBrandsSelecteds(prevSelected => {
      if (isSelected) {
        // Si está seleccionado, eliminarlo del array de selecciones
        return prevSelected.filter(selected => selected !== typeBrand)
      } else {
        // Si no está seleccionado, agregarlo al array de selecciones
        return [...prevSelected, typeBrand]
      }
    })
  }

  useEffect(() => {
    const nextButton = document.getElementById('nextButton2')

    if (aboutBrandsSelecteds.length > 0) {
      nextButton?.classList.remove('hidden')
    } else {
      nextButton?.classList.add('hidden')
    }
  }, [aboutBrandsSelecteds])

  useEffect(() => {
    const nextButton = document.getElementById('nextButton3')

    if (genderSelecteds.length > 0) {
      nextButton?.classList.remove('hidden')
    } else {
      nextButton?.classList.add('hidden')
    }
  }, [genderSelecteds])

  useEffect(() => {
    const nextButton = document.getElementById('nextButton5')

    if (interested.length > 0) {
      nextButton?.classList.remove('hidden')
    } else {
      nextButton?.classList.add('hidden')
    }
  }, [interested])

  const genders = ['female', 'male', 'other', 'espresso martini 🍸']

  const handleGenderClick = (genders: string) => {
    setGenderSelecteds([genders])
  }

  const intereses = [
    'tracking stats',
    'creating a portfolio of my work',
    'identifying my top performing content',
    'working with better agencies',
    'getting stats to my agency',
  ]

  const captureInformation = () => {
    const data = {
      nombre: name,
      email: email,
      website: website,
      creatorCategory: aboutBrandsSelecteds,
      info: infoAboutCreator,
      gender: genderSelecteds,
      location: location,
      conections: {
        instagram: instagramConection,
        tiktok: tiktokConection,
      },
      intereses: interested,
    }
  }

  const handleInteresClick = (intereses: string) => {
    const isSelected = interested.includes(intereses)
    setInteresed(prevSelected => {
      if (isSelected) {
        // Si está seleccionado, eliminarlo del array de selecciones
        return prevSelected.filter(selected => selected !== intereses)
      } else {
        // Si no está seleccionado, agregarlo al array de selecciones
        return [...prevSelected, intereses]
      }
    })
  }

  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
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
                    <span className='stepNumber-1'>1.</span> Basics
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-2 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-2'>2.</span> Your focus
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-3 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-3'>3.</span> You as a creator
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-4 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-4'>4.</span> Your platforms
                  </p>
                  <p className='py-4 text-left pl-7 bg-white rounded-2xl text-xs flex items-center gap-2'>
                    <span className='steps-5 hidden'>
                      <Image src={check} className='opacity-50 w-4' alt='' />
                    </span>{' '}
                    <span className='stepNumber-5'>5.</span> How can we help
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
                    You made the right choice. <br /> Here’s a few basic things
                    to start with:
                  </h1>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 ${ptMono.className}`}>
                    <div className='flex w-full flex-col gap-4 pr-11'>
                      <div className='relative'>
                        <input
                          id='nameInput'
                          type='text'
                          className={`rounded-full bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full ${ptMono.className}`}
                          onInput={handleInputChange}
                          onChange={handleNameChange}
                        />
                        <div
                          className={`${initialValue} top-4  absolute left-6 pointer-events-none flex items-center`}>
                          <div
                            className={`small-text opacity-90 ${initialValue}`}>
                            <span className='text-base'>your name</span>{' '}
                          </div>
                        </div>
                      </div>
                      <div className='relative'>
                        <input
                          id='emailInput'
                          type='text'
                          className={`rounded-full bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full ${ptMono.className}`}
                          onInput={handleInputChange}
                          onChange={handleWebsiteChange}
                        />
                        <div
                          className={`${initialValue} top-4  absolute left-6 pointer-events-none flex items-center`}>
                          <div
                            className={`small-text opacity-90 ${initialValue}`}>
                            <span className='text-base'>website</span>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <RegisterNextButton
                      id='nextButton'
                      onClickCapture={() => {
                        handleDisplayStuff()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2  ${ptMono.className}`}>
                      next
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              {/* 2 paso: mostrar el enfoque del influencer */}
              <SwiperSlide style={{ borderRadius: '10px' }}>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black m'>
                    Tell us about your brand. We might be able to <br /> get you
                    some more business in the future.
                  </h1>
                  <p className='text-xs font-normal text-left'>
                    Select a few categories you’d say you cover:
                  </p>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 ${ptMono.className}`}>
                    <div className='flex flex-wrap w-full gap-2 '>
                      {aboutBrand.map((typeBrand, index) => (
                        <button
                          className={`px-6 py-3 rounded-full border border-[#F2EDE7] ${
                            aboutBrandsSelecteds.includes(typeBrand)
                              ? 'bg-[#EFEDE8]'
                              : ''
                          }`}
                          key={index}
                          onClick={() => handleBrandClick(typeBrand)}>
                          {typeBrand}
                        </button>
                      ))}
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

              <SwiperSlide style={{ borderRadius: '10px' }}>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white pl-20 pr-[60px] mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black '>
                    Tell us about you as a creator
                  </h1>
                  <p className='text-xs font-normal text-left'>
                    This may be one of the only times you get explain your
                    aesthetic after <br /> genuinely being asked. Enjoy this.
                  </p>
                  <div
                    className={`flex w-full flex-col gap-4 justify-start h-full pb-12  ${ptMono.className}`}>
                    <textarea
                      value={infoAboutCreator}
                      onChange={handleInfoAboutCreator}
                      placeholder='yes, go ahead, describe your aesthetic..'
                      className={`rounded-xl bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full text-sm `}
                      name=''
                      id=''></textarea>
                    <h3 className='text-xs text-left'>Gender reveal:</h3>
                    <div className='flex w-full flex-col gap-4'>
                      <div className='flex  gap-2'>
                        {genders.map((genders, index) => (
                          <button
                            className={`px-6 py-3 rounded-full border border-[#F2EDE7] ${
                              genderSelecteds.includes(genders)
                                ? 'bg-[#EFEDE8]'
                                : ''
                            }`}
                            key={index}
                            onClick={() => handleGenderClick(genders)}>
                            {genders}
                          </button>
                        ))}
                      </div>
                      <h3 className='text-xs text-left'>
                        Location (you can lie about being from LA in peace):
                      </h3>
                      <div className='relative'>
                        <input
                          id='emailInput'
                          type='text'
                          className={`rounded-lg bg-[#F8F7F4] py-4 pl-6 text-black outline-none w-full `}
                          value={location}
                          onChange={handleInputChange}
                          onInput={handleLocationChange}
                        />
                        <div
                          className={`${initialValue} top-4 absolute left-6 pointer-events-none flex items-center`}>
                          <div
                            className={`small-text opacity-90 ${initialValue}`}>
                            <span className='text-xs'>type in a city...</span>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <RegisterNextButton
                      id='nextButton3'
                      onClickCapture={() => {
                        handleDisplayStuff()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2  ${ptMono.className}`}>
                      next
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              {/* Segundo paso: conexión con Instagram */}
              <SwiperSlide>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black w-[75%]'>
                    What platforms are you creating on? Get connected.
                  </h1>
                  <p className='text-xs font-normal text-left leading-4'>
                    Not required right now, but highly recommended. We connect
                    to your accounts <br /> not to login, post, or manage on
                    your behalf. We don’t have access to or save <br /> your
                    admin information, messages, notifications, contacts, etc.
                    Codecoco only <br /> pulls your post stats for display here.
                    Everything is encrypted and safe.
                  </p>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 `}>
                    <div className='flex w-full flex-col gap-4  items-start text-left'>
                      <div className='flex gap-4'>
                        <Link
                          onClick={hanledInstagramConection}
                          className={`${ptMono.className} bg-[#859991] py-3 text-white mb-6 pl-5 pr-8 rounded-lg flex items-center gap-2`}
                          target='_blank'
                          href={'/api/oauth/connect/facebook'}>
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
                          Connect to Instagram
                         
                        </Link>
                        <Link
                          onClick={hanledTikTokConection}
                          className={`${ptMono.className} bg-[#859991] py-3 text-white mb-6 pl-5 pr-8 rounded-lg flex items-center gap-2`}
                          target='_blank'
                          href={'/api/oauth/connect/tiktok'}>
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
                          Connect to Tiktok
                        </Link>
                      </div>

                      <p className='text-xs font-light italic'>
                        You will be asked to login on a redirected official page
                        from each platform.
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
                      id='nextButton4'
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

              <SwiperSlide style={{ borderRadius: '10px' }}>
                <div className='flex flex-col content-start items-start justify-start gap-4 bg-white px-20 mt-[96px] h-[483px] text-black'>
                  <h1 className='text-lg text-left font-medium text-black m'>
                    Last thing! Select what you’re most excited about.
                  </h1>
                  <p className='text-xs font-normal text-left'>
                    We’re interested in knowing how we can help you. Select a
                    few activities and <br /> features you would be interested
                    in below. Some are available already, others <br /> we are
                    considering 👀
                  </p>
                  <div
                    className={`flex w-full flex-col gap-4 justify-between h-full pb-12 ${ptMono.className}`}>
                    <div className='flex flex-wrap w-full  gap-4 pr-11'>
                      {intereses.map((interes, index) => (
                        <button
                          className={`px-6 py-3 rounded-full border border-[#F2EDE7] ${
                            interested.includes(interes) ? 'bg-[#EFEDE8]' : ''
                          }`}
                          key={index}
                          onClick={() => handleInteresClick(interes)}>
                          {interes}
                        </button>
                      ))}
                    </div>
                    <Link
                      href={'/plans'}
                      id='nextButton5'
                      onClickCapture={() => {
                        captureInformation()
                      }}
                      className={`mt-auto self-end rounded-lg bg-[#E2DED4] px-8 py-2  ${ptMono.className}`}>
                      done!
                    </Link>
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
