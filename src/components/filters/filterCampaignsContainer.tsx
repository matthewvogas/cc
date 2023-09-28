'use client'
import { FiPlus, FiRotateCw, FiChevronDown } from 'react-icons/fi'
import { RedirectLink } from '@/app/(shares)/campaign/[id]/linkShare'
import FilterBy from '../modals/agency/filterBy'
import { Client, Campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Search from '../inputs/search'

type Props = {
  show: any
  campaignsFallback: any
  clientsFallback: any
}

export default function FilterCampaignsContainer({
  show,
  campaignsFallback,
  clientsFallback,
}: Props) {
  const { campaigns, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [inputSearchValue, setInputSearchValue] = useState('')

  const [activeButton, setActiveButton] = useState('')

  const [clientFilterSelected, setClientFilterSelected] = useState<number[]>([])
  const [clientNameFilterSelected, setClientNametFilterSelected] = useState('')
  const [tagSelected, setSearchTags] = useState('')

  const filteredClients = clients.filter((client: any) => {
    const clientNameMatches = client.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
      return clientNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      return client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
    } else if (tagSearchIsActive) {
      return clientNameMatches
    }
  })

  return (
    <>
      <div
        className={`w-full flex gap-4 py-6 bg-[#F3F0EC] rounded-xl mt-4 px-8 ${show}`}>
        <div>
          <p className='font-medium text-base mb-2'>by client</p>
          <div className='dropdown'>
            <Search
              inputSearchValue={inputSearchValue}
              setInputSearchValue={setInputSearchValue}
            />
            <div
              tabIndex={0}
              className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
              <div className='p-6 gap-2 flex flex-col'>
                <span className='text-xs italic'>last clients</span>
                {filteredClients
                  .slice(0, 3)
                  .map((client: Client, index: any) => (
                    <button
                      onClick={() => {
                        setClientFilterSelected([client.id])
                        setClientNametFilterSelected(String(client.name))
                      }}
                      className='w-full py-2 px-4 border border-gray-100 rounded-lg hover:bg-gray-100'
                      value={client.id}
                      key={index}>
                      {client.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className='font-medium text-base mb-2'>by agency</p>
          <div className='dropdown'>
            <Search
              inputSearchValue={inputSearchValue}
              setInputSearchValue={setInputSearchValue}
            />
            <div
              tabIndex={0}
              className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
              <div className='p-6 gap-2 flex flex-col'>
                <span className='text-xs italic'>last agencies</span>
                {filteredClients
                  .slice(0, 3)
                  .map((client: Client, index: any) => (
                    <button
                      onClick={() => {
                        setClientFilterSelected([client.id])
                        setClientNametFilterSelected(String(client.name))
                      }}
                      className='w-full py-2 px-4 border border-gray-100 rounded-lg hover:bg-gray-100'
                      value={client.id}
                      key={index}>
                      {client.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
