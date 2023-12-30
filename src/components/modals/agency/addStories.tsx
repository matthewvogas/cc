import { CampaignRes } from '@/types/campaign/campaignRes'
import ImageUploader from './imageUploader'
import { Dialog } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { ptMono } from '@/app/fonts'
import TagsInput from '@/components/inputs/tag'
import DropdownCheckbox from '@/components/inputs/dropdownCheckbox'
import Spinner from '@/components/loading/spinner'

type Props = {
  campaignFallback: CampaignRes
  clientFallback: any
  connections: any
}

export default function AddNewStories({
  campaignFallback,
  clientFallback,
  connections,
}: Props) {
  interface CheckboxOption {
    id: string
    username: string
    checked: boolean
  }

  const [isOpen, setIsOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([])
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const transformedOptions = connections.flatMap((connection: any) => {
      const creator =
        connection.user1.role === 'CREATOR'
          ? connection.user1
          : connection.user2

      const instagramToken = creator.socialConnections.find(
        (conn: any) => conn.platform === 'INSTAGRAM',
      )?.token

      if (creator.instagramPages && instagramToken) {
        return creator.instagramPages.map((page: any) => ({
          id: page.accountId,
          username: page.username,
          checked: false,
          token: instagramToken,
        }))
      }

      return []
    })

    setCheckboxOptions(transformedOptions)
  }, [connections])

  const handleOptionChange = (id: string, checked: boolean) => {
    const updatedOptions = checkboxOptions.map(option => {
      if (option.id === id) {
        return { ...option, checked }
      }
      return option
    })
    setCheckboxOptions(updatedOptions)
  }

  const track = async () => {
    setLoading(true)

    const creators = checkboxOptions.filter(option => option.checked)
    const campaignId = campaignFallback.id

    try {
      const res = await fetch('/api/collect/track/instagramStories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creators,
          tags,
          campaignId,
        }),
      })

      if (res.ok) {
        setLoading(false)
        setErrorText('')
        setIsOpen(false)
      } else {
        setLoading(false)
        setErrorText(
          'An error occurred, refresh the page and try again. Make sure you have correctly included the hashtags without # and creators',
        )
        setFetchError('An error occurred')
      }
    } catch (error) {
      setFetchError('An error occurred')
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}>
        <label
          tabIndex={0}
          className={`flex items-center rounded-full bg-active px-8 min-w-max max-h-6 min-h-[52px] py-3 text-lg text-black cursor-pointer ${ptMono.className}`}>
          upload stories
        </label>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Dialog.Title className=' text-lg font-medium mb-8 text-center mt-12'>
              add creators
            </Dialog.Title>
            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 ${ptMono.className}`}>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-12 py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `rounded-3xl border-2 border-primary px-8  py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  auto tracking
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <p className='text-xs font-medium mx-12 my-4'>
                    Upload screenshots of stories here so they display with your
                    other posts.
                  </p>
                  <div className='w-full flex justify-center mb-12'>
                    <ImageUploader
                      setIsOpen={setIsOpen}
                      campaignFallback={campaignFallback}
                    />
                  </div>
                </Tab.Panel>

                <Tab.Panel className=' flex flex-col'>
                  <div className='divider mx-0'></div>

                  <div className='px-7'>
                    <p className='text-sm font-semibold mb-2'>
                      Hashtag(s) your creator will use
                    </p>
                    <TagsInput required tags={tags} setTags={setTags} />
                    <span className='text-xs italic font-light mb-4'>
                      separate multiple with a comma
                    </span>
                  </div>
                  <div className='px-7'>
                    <p className='text-sm font-semibold'>Assign to creator</p>
                    <div className='flex gap-3'>
                      <div className='w-full'>
                        <DropdownCheckbox
                          options={checkboxOptions}
                          onOptionChange={handleOptionChange}
                        />
                      </div>
                      {/* <div className='w-full'>
        <button className='w-full mt-4 rounded-xl border border-[#7F7F7F] bg-[#0000] pl-4 py-2 text-sm text-gray-900 flex flex-wrap gap-2  outline-none'>
          upload a list
        </button>
      </div> */}
                    </div>
                    <p className='mt-4 text-xs text-gray-500'>
                      {' '}
                      Remember that if you have not connected with the creator
                      through codecoco, you will not be able to track the data.{' '}
                    </p>
                  </div>

                  <div className='flex w-full flex-col justify-end items-end px-7 mt-4 mb-4 '>
                    <button
                      disabled={loading}
                      onClick={track}
                      className={`flex self-end bg-[#D3F0E2] rounded-lg px-8 py-2`}>
                      {loading ? (
                        <Spinner width='w-4' height='h-4' border='border-2' />
                      ) : (
                        'start tracking'
                      )}
                    </button>
                    <p className='pt-2 text-sm'>{errorText}</p>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
