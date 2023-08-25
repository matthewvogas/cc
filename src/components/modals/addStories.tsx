import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import TagsInput from '../TagsInput'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { excelToJson } from '@/lib/Utils'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import useClients from '@/hooks/useClients'
import Spinner from '@/components/ui/spinner'
import { Posts } from '@/types/posts/PostByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import modalCover from 'public/assets/register/addpostToTrack.jpg'

import { FiChevronDown } from 'react-icons/fi'

type Props = {
  campaignsFallback: CampaignRes
  clientsFallback: any
  text: string
  icon: any
}

export default function AddNewStories({
  campaignsFallback,
  clientsFallback,
  text,
  icon,
}: Props) {
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [rowsLinks, setRowsLinks] = useState(1)

  const [isOpen, setIsOpen] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [fileSelected, setFileSelected] = useState(false) // Nuevo estado

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true)
    } else {
      setFileSelected(false)
    }
  }

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

        // Liberar el objeto URL
        URL.revokeObjectURL(objectUrl)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    }
  }

  const handleLinksChange = (e: any) => {
    setLinks(e.target.value)
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

    console.log(links)
    console.log(campaignsFallback.id)
    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posts: links,
          campaignId: campaignsFallback.id,
        }),
      })

      if (res.status === 200 && res.ok) {
        setLinks('')
        setLoading(false)
        setIsOpen(false)
        await router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    setFetchError(null)
    e.preventDefault()
    const fileInput = document.getElementById(
      'campaignExcel',
    ) as HTMLInputElement

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      if (!file) {
        setFetchError('Please select a file')
        return
      }
      const posts = await excelToJson(file)

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

        if (res.status === 200 && res.ok) {
          setLoading(false)
          setIsOpen(false)
          await router.refresh()
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
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
            <Dialog.Title className=' text-lg font-medium mb-2 text-center'>
              Add Stories 🥥
            </Dialog.Title>

            <Tab.Group>
              <Tab.Panels className=''>
                <div className='w-full flex justify-center my-12'>
                  <p className='border p-3 rounded-xl text-gray-700 bg-gray-100'>
                    this function is under construction
                  </p>
                </div>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
