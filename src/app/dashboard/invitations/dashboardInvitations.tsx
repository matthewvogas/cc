'use client'
import TwoTabsComponent from '@/components/settings/Twotabs'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Connections from '@/components/settings/Connections'
import backgroundImage from 'public/assets/creatorRegister/Rectangle66.jpg'
import Image from 'next/image'
import AgenciesDashBoard from '@/components/dashboards/influencer/AgenciesDashBoard'
import ClientsDashBoard from '@/components/dashboards/agency/ClientsDashBoard'
import CreatorsDashBoard from '@/components/dashboards/agency/CreatorsDashboard'
import Spinner from '@/components/loading/spinner'
import { useRouter } from 'next/navigation'

type Props = {
  invites: any
  session: any
  agenciesConnections: any
  agency: any
  instagramConnection: any
  clients: any
  user: any
  userCreators: any
  creators: any
  campaigns: any
  connections: any
  igpages: any
  ttpages: any
}

export default function PortfolioTabs({
  invites,
  session,
  agenciesConnections,
  agency,
  instagramConnection,
  clients,
  user,
  userCreators,
  creators,
  campaigns,
  connections,
  igpages,
  ttpages
}: Props) {
  const [other, setOther] = useState('')
  const [inviteId, setInviteId] = useState('')
  const [status, setStatus] = useState('Accept')

  const [loading, setLoading] = React.useState(false)
  const [done, setdone] = React.useState(false)

  const router = useRouter()

  const handleAcceptInvite = async () => {
    setLoading(true)
    setdone(true)

    try {
      if (session.user.role === 'AGENCY') {
        const res = await fetch('/api/connections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId1: session?.user?.id,
            userId2: other,
          }),
        })

        if (res.status === 200) router.refresh()
        console.log(res.status)
      } else {
        const res = await fetch('/api/connections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId1: other,
            userId2: session?.user?.id,
          }),
        })

        if (res.status === 200) router.refresh()
        console.log(res.status)
      }
    } catch (error: any) {}
  }

  const handleChangeInviteStatus = async () => {
    try {
      setLoading(true)
      setdone(true)

      const res = await fetch('/api/invitesUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteId: inviteId,
          status: status,
        }),
      })
      if (res.status === 200) router.refresh()
      console.log(res.status)
    } catch (error) {}
  }

  const pendingInvitations = invites?.filter(
    (invite: any) => invite.status === 'PENDING',
  )

  const tabs: TabItem[] = [
    {
      label: 'Accepted',
      content: (
        <div>
          {user.role == 'CREATOR' ? (
            <AgenciesDashBoard
              instagramConnection={instagramConnection}
              agenciesConnections={connections}
              agency={agency}
              session={session.user.id}
            />
          ) : (
            <CreatorsDashBoard
              connectionsFallback={agenciesConnections}
              campaignsFallback={campaigns}
              creatorsFallback={creators}
              userCreatorsFallback={userCreators}
              session={session}
              igpages={igpages}
              ttpages={ttpages}
            />
          )}
        </div>
      ),
    },
    {
      label: 'Pending',
      content: (
        <div>
          {pendingInvitations.map((invite: any) => (
            <div
              key={invite.id}
              className='border rounded-lg p-4 m-2 bg-white shadow-md flex justify-between items-center'>
              <div className='font-semibold'>
                From: {invite.sender.name}
                <div className='font-light'>
                  Status: {done ? 'DONE' : 'PENDING'}
                </div>
              </div>
              <div className='mt-4'>
                <button
                  onClick={() => {
                    handleChangeInviteStatus()
                  }}
                  onMouseOver={() => {
                    setStatus('REJECTED')
                  }}
                  className='border text-black font-bold py-2 px-4 rounded mr-4'>
                  Decline
                </button>
                {loading ? (
                  <Spinner width='w-4' height='h-4' border='border-2' />
                ) : (
                  <button
                    onClick={async () => {
                      handleAcceptInvite()
                      await handleChangeInviteStatus()
                    }}
                    onMouseOver={() => {
                      {
                        setOther(invite.sender.id)
                      }
                      setInviteId(invite.id)
                      setStatus('ACCEPTED')
                    }}
                    className='border text-black font-bold py-2 px-4 rounded'>
                    Accept
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className='relative'>
        <Image
          src={backgroundImage}
          alt='Imagen de fondo'
          layout='responsive'
          objectFit='cover'
        />
        <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12 ml-4 -mt-16'>
          <div className='w-full '>
            <div>
              <div className=''>
                <h1 className='pb-8 align-middle text-2xl font-semibold text-white'>
                  {`You're connected with`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  )
}

type TabItem = {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
}

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='w-full '>
      <Tab.Group>
        <Tab.List className='space-x-16 pl-12  border-b-2'>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative ${
                  selected
                    ? 'font-medium text-brown pb-5 border-b-4 border-[#808080] outline-none text-[#000]'
                    : 'text-[#808080]'
                } inline-block`
              }
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className=''>{tabs[activeTab].content}</div>
    </div>
  )
}
