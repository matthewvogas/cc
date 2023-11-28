import React from 'react'

type Props = {
    pageLength: any
    currentPage: any
    totalPages: any
    loadPrevious: any
    loadMore: any
}

function Pagination({pageLength, loadPrevious, currentPage, totalPages, loadMore} : Props) {
  return (
    <div className='px-12 flex justify-between w-full mb-10'>
      <div>
        {pageLength > 1 && (
          <button onClick={loadPrevious} className='btn mr-2'>
            Previous
          </button>
        )}
        {currentPage + 1 < totalPages && (
          <button onClick={loadMore} className='btn'>
            Next
          </button>
        )}
      </div>
      <div>
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  )
}

export default Pagination
