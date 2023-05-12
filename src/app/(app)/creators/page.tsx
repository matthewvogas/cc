import ButtonGroup from '@/components/buttonsGroup'
import TitlePage from '@/components/titlePage'

export default async function creators() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
      <TitlePage title='Creators' />
      <ButtonGroup title='' />
    </div>
  )
}
