import FilterCreators from '@/components/filtersCreators'
import ButtonGroup from '@/components/buttonsGroup'
import CreatorRow from '@/components/creatorRow'
import EmbedToConnect from '@/components/modals/embedToConnect'
import InviteToConnect from '@/components/modals/inviteToConnect'
import TitlePage from '@/components/titlePage'

export default async function creators() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
      <TitlePage title='Creators' onSubmit={undefined} />
      <EmbedToConnect />
      <ButtonGroup title='' />
      <CreatorRow />
    </div>
  )
}
