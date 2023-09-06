import { inter, ptMono } from '@/app/fonts'
import heartBroken from 'public/assets/register/heart-broken.svg'
import angleDown from 'public/assets/register/angle-down.svg'
import copyLink from 'public/assets/register/copy-link.svg'
import linkImage from 'public/assets/register/link.svg'
import Image from 'next/image'
import { lato } from '@/app/fonts'

type Props = {
  brokeLinks: any
}

export default function BrokeSocialLinks({ brokeLinks }: Props) {
  const copiarTexto = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const copiadoModal = document.getElementById('copiadoModal')
      copiadoModal?.classList.remove('hidden')
      setTimeout(() => {
        copiadoModal?.classList.add('hidden')
      }, 1000)
    } catch (err) {
      console.error('Could not copy text: ', err)
    }
  }

  return (
    <>
      {brokeLinks.length > 0 ? (
        <div className='px-12'>
          <div className='collapse bg-[#FCF5F2]'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-medium justify-between flex items-center'>
              <div className='flex items-center gap-4 '>
                <Image
                  src={heartBroken}
                  className='w-[25px] h-[25px]'
                  alt={''}
                />
                <span className='text-lg font-medium'>Problematic links</span>
              </div>
              <div>
                <Image src={angleDown} className='w-[25px] h-[25px]' alt={''} />
              </div>
            </div>
            <div className='collapse-content'>
              <div className='flex justify-between mx-14 gap-7 mb-6'>
                <p
                  className={`text-base italic tracking-wide ${lato.className}`}>
                  Why is this a thing? Well! because these posts have either
                  been
                  <br /> removed, the user has changed their username or they
                  are private.
                </p>
              </div>

              {/* box of rows */}
              <div className='bg-white px-10 py-7 rounded-[10px] flex flex-col gap-3'>
                {/* row */}
                {brokeLinks.map((card: any, index: number) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'>
                    <div
                      className={`${ptMono.className} flex gap-12 items-center`}>
                      <p className={`text-black text-sm`}>
                        {card.creator?.username}
                      </p>
                      <p className='text-black opacity-50 text-sm'>
                        {card.permalink!}
                      </p>
                    </div>

                    <div className='flex gap-4 items-center'>
                      <button
                        onClick={() => {
                          copiarTexto(card.permalink!)
                        }}>
                        <Image
                          src={copyLink}
                          className='h-[30px] w-[100%]'
                          alt={''}
                        />
                      </button>

                      <button
                        className={`mx-2 flex items-center rounded-[8px] bg-[#D3F0E2] bg-opacity-25 px-5 py-2 text-xs text-black ${ptMono.className}`}>
                        send invitation link to creator
                        <Image
                          src={linkImage}
                          className='w-[12px] ml-3'
                          alt={''}
                        />
                      </button>
                      <div
                        id='copiadoModal'
                        className={` ${inter.className} fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 px-4 py-2 border border-[#b6fcdb] bg-[#e9faf2] bg-opacity-90 text-sm rounded-md z-50 hidden`}>
                        link copied successfully!
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
