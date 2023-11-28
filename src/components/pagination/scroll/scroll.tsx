import React from 'react'
import back from 'public/assets/pagination/scroll-back.svg'
import next from 'public/assets/pagination/scroll-next.svg'
import Image from 'next/image'

type Props = {
    pageLength: any
    currentPage: any
    totalPages: any
    loadPrevious: any
    loadMore: any
}

function PaginationScroll({pageLength, loadPrevious, currentPage, totalPages, loadMore} : Props) {
  return (
    <div className='px-12 flex justify-end w-full mb-10'>
      <div className='flex gap-2'>
        {pageLength > 1 && (
          <button onClick={loadPrevious}>
            <Image src={back} alt={''}/>
          </button>
        )}
        {currentPage + 1 < totalPages && (
          <button onClick={loadMore} >
            <Image src={next} alt={''}/>
          </button>
        )}
      </div>
    </div>
  )
}

export default PaginationScroll
