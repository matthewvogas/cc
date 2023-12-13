import modalCover from 'public/assets/register/addpostToTrack.jpg'
import Spinner from '@/components/loading/spinner'
import TagsInput from '@/components/inputs/tag'
import { FiChevronDown } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import { excelToJson } from '@/lib/Utils'
import { Tab } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import DropdownCheckbox from '@/components/inputs/dropdownCheckbox'

type Props = {
  campaignsFallback: any
  clientsFallback: any
  connections: any
  text: string
  icon: any
}

export default function AddNewPosts({
  campaignsFallback,
  clientsFallback,
  connections,
  text,
  icon,
}: Props) {
  interface CheckboxOption {
    id: string
    username: string
    checked: boolean
  }
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([])
  const [errorText, setErrorText] = useState('')

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

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [rowsLinks, setRowsLinks] = useState(1)

  const [isOpen, setIsOpen] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handleDownloadClick = async () => {
    const url = 'https://dewinu.com/docs/example.xlsx'
    if (url) {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const filename = 'example_codecoco.xlsx'
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = filename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(objectUrl)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    }
  }

  const track = async () => {
    setLoading(true)

    const creators = checkboxOptions.filter(option => option.checked)
    const campaignId = campaignsFallback.id

    try {
      const res = await fetch('/api/collect/track/instagram', {
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
        setErrorText('An error occurred, refresh the page and try again. Make sure you have correctly included the hashtags without # and creators')
        setFetchError('An error occurred')
      }
    } catch (error) {
     
      setFetchError('An error occurred')
    }
  }

  const handleHashTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFetchError(null)
    setLoading(false)
  }

  const handleLinksSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFetchError(null)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const file = formData.get('file') as File
    const posts: Array<string> = file.name
      ? await excelToJson(file)
      : links.split(',').map(post => post.trim())

    if (
      posts.some(
        post =>
          !post.startsWith('https://') &&
          !post.includes('instagram') &&
          !post.includes('tiktok'),
      )
    ) {
      setLoading(false)
      setFetchError('Please add valid links')
      return
    }

    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posts,
          campaignId: campaignsFallback.id,
        }),
      })

      if (res.ok) {
        form.reset()
        setLinks('')
        setIsOpen(false)
        router.refresh()
      } else {
        setFetchError('An error occurred')
      }
    } catch (error) {
      console.log(error)
      setFetchError('An error occurred')
    } finally {
      setLoading(false)
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
          add a post
          {icon}
        </label>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Image src={modalCover} className='rounded-t-xl' alt={''} />
            <Dialog.Title className=' text-lg font-medium mb-8 text-center'>
              Add posts 🥥
            </Dialog.Title>

            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 px-12  ${ptMono.className}`}>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl  border-[#FEF8F6] px-12 py-2 w-full ${
                      selected ? 'text-black bg-primary' : 'text-[#CCCCCC]'
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl  bg-[#c0e2d2] px-12 py-2 w-full ${
                      selected
                        ? '  text-black'
                        : 'text-[#4d4d4d8e] bg-[#d8ebe223]'
                    }`
                  }>
                  hashtag tracking
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='divider mx-0'></div>

                  <form onSubmit={handleLinksSubmit}>
                    <div className='flex flex-col gap-4 px-7'>
                      <h2 className='text-left font-medium'>
                        Instagram, Facebook, or TikTok link
                      </h2>
                      <textarea
                        value={links}
                        onChange={e => setLinks(e.target.value)}
                        rows={rowsLinks}
                        className='border px-4 py-3 outline-none rounded-lg border-[#7F7F7F] text-[#7F7F7F] h-full'
                        placeholder='https://'></textarea>
                    </div>

                    <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                      <div className='flex justify-between w-full mt-3'>
                        <button
                          type='button'
                          onClick={() =>
                            rowsLinks == 1 ? setRowsLinks(5) : setRowsLinks(1)
                          }
                          className='text-xs font-light mb-4 flex gap-2 items-center'>
                          <span className='text-[#7F7F7F]'>
                            {rowsLinks === 1
                              ? 'bulk add links'
                              : 'add one link'}
                          </span>
                          <FiChevronDown
                            style={{
                              color: '#7F7F7F',
                              transform: rowsLinks == 1 ? '' : 'rotate(180deg)',
                            }}
                          />
                        </button>

                        <p className='text-xs italic font-light mb-4'>
                          separate multiple with a comma
                        </p>
                      </div>
                    </div>

                    <div className='divider mx-0'> or </div>

                    <div className='flex gap-4  px-7 justify-between mb-4 flex-col'>
                      <h2 className='text-sm -mb-3'>Upload a file</h2>
                      <p className='text-xs'>
                        Download a{' '}
                        <button
                          className='underline'
                          onClick={handleDownloadClick}>
                          sample CSV template
                        </button>
                        {''}
                        to see an example of the format required.
                      </p>

                      <div className='flex flex-col gap-3'>
                        <input
                          type='file'
                          className='file-input file-input-bordered w-full max-w-xs'
                          name='file'
                          accept='.xlsx, .xls, .csv'
                        />
                        {fetchError && (
                          <div className='alert alert-error flex justify-center shadow-lg'>
                            <div className='flex flex-row gap-4'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 flex-shrink-0 stroke-current'
                                fill='none'
                                viewBox='0 0 24 24'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>
                              <span>{fetchError}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        disabled={loading}
                        className='flex self-end bg-[#E2DED4] rounded-lg px-7 py-2'
                        type='submit'>
                        {loading ? <span>Loading...</span> : 'done'}
                      </button>
                    </div>
                  </form>
                </Tab.Panel>
                <Tab.Panel className=''>
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
