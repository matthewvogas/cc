import { ReactNode } from 'react'

export type ChipStateName = 'INFO' | 'PENDING' | 'NOT'
export type ChipState = {
  classNames: string
  content: string
  icon: ReactNode
}

export const chipStateMap: { [key in ChipStateName]: ChipState } = {
  INFO: {
    classNames: 'bg-active',
    content: 'posted',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 22 22'
        strokeWidth={3}
        stroke='black'
        className='h-4 w-4'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 12.75l6 6 9-13.5'
        />
      </svg>
    ),
  },
  PENDING: {
    classNames: 'bg-beigeFirst',
    content: 'not tracking',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
        strokeWidth={3}
        stroke='gray'
        className='h-4 w-4'>
        {' '}
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ),
  },
  NOT: {
    classNames: 'bg-orange-100',
    content: 'not yet',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
        strokeWidth={3}
        stroke='gray'
        className='h-4 w-4'>
        {' '}
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ),
  },
}

export const ChipStateComponent = ({ state }: { state: ChipStateName }) => {
  return (
    <div
      className={`${chipStateMap[state].classNames} flex gap-3 rounded-full px-8 py-3 text-sm text-black`}>
      {chipStateMap[state].icon} {chipStateMap[state].content}
    </div>
  )
}
