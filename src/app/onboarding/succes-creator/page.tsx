'use client'
import { inter } from '@/app/fonts'

const handleCloseButtonClick = () => {
  window.close()
}

export default function SuccesConection() {
  return (
    <html
      className='bg-beigeSelected w-screen h-screen flex justify-center items-center'
      lang='en'>
      <body className={`${inter.className} `}>
        <p className='text-center px-8 py-2 border  rounded-full bg-whiteBrown text-amber-950'>
          Successful connection, now the agency that sent you the invitation
          will have access to your data as a creator. <br />{' '}
          <span className='font-medium'>
            You can revoke this information within the settings of each social
            network. You can close the tab. 🥥
          </span>
        </p>
      </body>
    </html>
  )
}
