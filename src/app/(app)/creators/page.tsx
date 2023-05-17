import FilterCreators from '@/components/FiltersCreators'
import ButtonGroup from '@/components/buttonsGroup'
import CreatorRow from '@/components/creatorRow'
import TitlePage from '@/components/titlePage'

export default async function creators() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
      <TitlePage title='Creators' />
      <ButtonGroup title='' />
      <FilterCreators />
      <CreatorRow />
    </div>
  )
}
