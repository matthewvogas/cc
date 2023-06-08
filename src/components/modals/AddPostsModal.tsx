'use client'

import { ptMono } from '@/app/fonts'
import { Dialog, Tab } from '@headlessui/react'
import Link from 'next/link'

export default function AddPostsModal() {
  ;<>
    <Dialog.Panel
      className={`${ptMono.className} flex w-full max-w-lg flex-col rounded-md bg-white p-16 sm:px-0`}>
      <Dialog.Title className='mb-8 text-center'>add posts</Dialog.Title>
      <Tab.Group>
        <Tab.List className='flex flex-row items-center justify-center gap-6'>
          <Tab
            className={({ selected }) =>
              ` rounded-3xl border-2 border-primary px-8 py-2 hover:shadow ${
                selected ? 'bg-primary' : ''
              }`
            }>
            add manually
          </Tab>

          <Tab
            className={({ selected }) =>
              `rounded-3xl border-2 border-primary px-8  py-2 hover:shadow ${
                selected ? 'bg-primary' : ''
              }`
            }>
            upload from file
          </Tab>
        </Tab.List>
        <Tab.Panels className='mt-2'>
          <Tab.Panel className='px-16 py-8'>
            <form className='flex flex-col gap-3'>
              <label>{`Instagram Link(s)`}</label>
              <textarea
                className='textarea-bordered textarea rounded-md'
                placeholder='copy and paste multiple links here'
              />
            </form>
          </Tab.Panel>

          <Tab.Panel className='flex flex-col gap-4 px-16 py-8'>
            <h2>
              Download a{' '}
              <Link href={'/'}>
                sample CSV template to see an example of the format required
              </Link>
            </h2>
            <form className='flex flex-col gap-3'>
              <input
                type='file'
                className='file-input-bordered file-input w-full'
              />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Dialog.Panel>
  </>
}
