import Image from 'next/image'
import Link from 'next/link'

export type ChipStateName = 'SIGNEDUP' | 'INVITE' | 'REJECTED'
export type ChipState = {
  classNames: string
  content: string
}

export const chipStateMap: { [key in ChipStateName]: ChipState } = {
  SIGNEDUP: {
    classNames: 'bg-active',
    content: 'signed up',
  },
  INVITE: {
    classNames: 'border-2 border-beigeSelected',
    content: 'invite',
  },
  REJECTED: {
    classNames: 'bg-red-100',
    content: 'rejected',
  },
}

export const CreatorStatus = ({ state }: { state: ChipStateName }) => {
  return (
    <>
      <div className='flex justify-start gap-2'>
        <div
          className={`${chipStateMap[state].classNames} flex gap-3 rounded-full px-8 py-3 text-sm text-black`}>
          {chipStateMap[state].content}
        </div>
      </div>
    </>
  )
}
