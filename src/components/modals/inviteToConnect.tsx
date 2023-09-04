import { inter, ptMono } from '@/app/fonts'

export default function InviteToConnect() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-5xl flex-col items-start justify-center overflow-hidden rounded-xl bg-white px-20 py-12'>
          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>
          <h3 className='mb-5 text-2xl font-bold'>
            Invite creators to connect, get more stats.
          </h3>

          <div
            className={`flex w-full flex-col justify-start gap-4 ${ptMono.className}`}>
            <label className='pb-4' htmlFor=''>
              When you invite creators to connect to Codecoco and your campaign,
              you get access to more stats automatically. Here’s more on what
              you get from non-connected and connected accounts.
            </label>

            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <div className='bg-gray-50 p-6'>
                  <label className='mb-4 text-xl font-bold '>
                    What we track from non-connected creators
                  </label>
                  <p>likes and comments</p>
                  <p>followers </p>
                </div>

                <div className='h-full bg-green-50 p-6'>
                  <label className='pb-4 text-xl font-bold '>
                    What we track from connected creators 🥥
                  </label>
                  <p> likes and comments</p>
                  <p>Reach unique views</p>
                  <p>total saves</p>
                  <p>total shares</p>
                  <p>impressions</p>
                  <p>engagements</p>
                </div>
              </div>

              <hr className='my-8 h-px border-0 bg-gray-200'></hr>
              <div className=' flex gap-4 text-left'>
                <button className='w-full rounded-full bg-rose-200 px-8 py-2 '>
                  add manually
                </button>
                <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 '>
                  invite to connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
