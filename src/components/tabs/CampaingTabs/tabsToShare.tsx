'use client'
import prev from 'public/assets/register/GridExample.jpg'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EmailsInput from '@/components/inputs/email'
import InputEmails from '@/components/inputs/emails'

const ActionButtonStyle =
  'flex w-full text-xm justify-center border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 cursor-pointer '

type TabsToShareProps = {
  campaignId: any
  access: any 
  campaign: any
}

export default function TabsToShare({
  campaignId,
  access,
  campaign,
}: TabsToShareProps) {
  const [openTab, setOpenTab] = React.useState(1)
  const [codeToCopy, setcodeToCopy] = React.useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [isChecked, setIsChecked] = useState<boolean>(false)

  
  useEffect(() => {
    setIsChecked(!campaign.isPublic ?? true)
  }, [campaign.isPublic])

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedStatus = event.target.checked;
  
    try {
      const response = await fetch('/api/shares/campaignAccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: !newCheckedStatus,
          id: campaignId, 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
  
      setIsChecked(newCheckedStatus);
    } catch (error) {
      console.error('Error en la solicitud:', error);
  
    }
  }
  

  function removeEmail(index: any) {
    setEmails(emails.filter((el, i) => i !== index))
  }

  // const handleCheckboxChange = async (event: any) => {
  //   console.log('Checkbox cambiado a:', event.target.checked)

  //   setIsChecked(event.target.checked)
  // }

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="https://codecoco.co/campaign/' +
    campaignId +
    '"' +
    ' height="400" width="300"></iframe>' +
    '</body> </html>'
  const iframe =
    '<iframe src="https://codecoco.co/campaign/' +
    campaignId +
    '"' +
    ' height="400" width="300"></iframe>'

  const sendEmailsAccess = async () => {
    const res = await fetch(`/api/shares/campaigns`, {
      method: 'POST',
      body: JSON.stringify({
        emails: emails,
        campaignId: campaignId,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setEmails([])
    }
  }

  return (
    <>
      <div className='flex w-full flex-wrap  '>
        <div className='w-full'>
          <h5 className='bg-beigeFirst pb-4 pt-8 text-3xl font-bold md:px-20'>
            Sharing options
          </h5>

          <ul
            className='mb-0 flex list-none flex-row  bg-beigeFirst pt-4 md:px-20 '
            role='tablist'>
            <li className='-mb-px mr-2 flex-auto text-center last:mr-0'>
              <a
                className={
                  ' block h-36 w-full rounded-t-3xl p-2 px-5 py-3 text-left text-xs leading-normal ' +
                  (openTab === 1
                    ? ' bg-white'
                    : ' border-x border-t border-beigeBorder bg-beigeSelected')
                }
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(1)
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'>
                <div className='p-2'>
                  <p className='pb-1 text-2xl font-medium '>share via link</p>
                  <label
                    className='flex w-4/6 pb-2 text-lg leading-[18px] font-light'
                    htmlFor=''>
                    get a shareable link or invite specific people to view this
                    campaign
                  </label>
                </div>
              </a>
            </li>

            <li className='-mb-px mr-2 flex-auto text-center last:mr-0'>
              <a
                className={
                  'block h-36 w-full rounded-t-3xl p-2 px-5 py-3 text-left text-xs leading-normal ' +
                  (openTab === 2
                    ? ' bg-white'
                    : ' border-x border-t border-beigeBorder bg-beigeSelected')
                }
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(2)
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'>
                <div className='p-2'>
                  <p className='pb-1 text-2xl font-medium'>embed</p>
                  <label
                    className='flex w-4/6 pb-2 text-lg leading-[18px] font-light'
                    htmlFor=''>
                    embed your campaign grid and results on your own webpage
                  </label>
                </div>
              </a>
            </li>

            <li className='-mb-px mr-2 flex flex-auto items-center text-center last:mr-0'>
              <Link
                href={'/campaign/' + campaignId}
                target='_blank'
                className={`${ActionButtonStyle}`}>
                view live campaign
              </Link>
            </li>
          </ul>

          <div
            className={`flex w-full flex-col rounded bg-white md:px-20 ${ptMono.className}`}>
            <div className='mt-8'>
              <div className='tab-content tab-space'>
                {/* tab 1 */}
                <div className={openTab === 1 ? 'block ' : 'hidden'} id='link1'>
                  {/* Campaign permalink */}
                  <div className='mb-7 rounded-xl bg-greenPastel p-7'>
                    <p className='mb-4 text-xl'>Campaign permalink</p>
                    <input
                      className='mb-2 w-full rounded-xl px-5 py-3 focus:outline-none'
                      type='text'
                      value={'https://codecoco.co/campaign/' + campaignId}
                      readOnly
                    />
                  </div>
                  <div>
                    <div className='flex divide-x-2'>
                      <div className='w-4/6'>
                        <h4 className='mb-4 block font-semibold text-base'>
                          Invite people to view
                        </h4>
                        <div className='mr-4 rounded-xl border-2  '>
                          <div className='flex flex-wrap gap-3 rounded-t-lg border-b-2 bg-beigeFirst p-6'>
                            {emails.map((email: any, index: number) => (
                              <p
                                className=' flex items-center justify-center gap-3 rounded-lg px-2 py-3 bg-white shadow-sm'
                                key={email}>
                                {email}{' '}
                                <span
                                  onClick={() => removeEmail(index)}
                                  className=' flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600'>
                                  &times;
                                </span>
                              </p>
                            ))}
                          </div>

                          <div>
                            {/* emails component */}
                            <InputEmails email={emails} setEmails={setEmails} />
                          </div>
                        </div>
                      </div>

                      {/* Users who currently have access */}
                      <div className='w-2/6 pl-4'>
                        <h4 className='mb-4 font-semibold text-base'>
                          Users who currently have access
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {access.map((email: any, index: number) => (
                            <h2
                              key={index}
                              className='border px-2 py-2 rounded-lg'>
                              {email.email}
                            </h2>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button onClick={sendEmailsAccess} className='btn mt-4'>
                      {' '}
                      send{' '}
                    </button>
                    {/* Privacy options */}
                    <h4 className='my-4 font-semibold text-base'>
                      Privacy options
                    </h4>
                    <div className='mr-4 inline-block gap-3 rounded-xl bg-beigeFirst p-3'>
                      <input
                        onChange={handleCheckboxChange}
                        className='mx-2'
                        type='checkbox'
                        checked={isChecked}
                      />
                      <label className='' htmlFor=''>
                        Require email to view
                      </label>
                    </div>

                    {/* <label htmlFor=''>view visitors</label> */}
                  </div>
                </div>

                {/* tab 2 */}

                {/* technology to share */}
                <div
                  className={openTab === 2 ? 'mb-4 block' : 'hidden'}
                  id='link2'>
                  <div className='flex '>
                    <button
                      onClick={() => {
                        setcodeToCopy(iframe)
                      }}
                      className='text-xm mr-4 items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
                      iframe
                    </button>
                    <button
                      onClick={() => {
                        setcodeToCopy(html)
                      }}
                      className='text-xm mr-4 items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
                      HTML y CSS
                    </button>
                  </div>

                  {/* share */}
                  <div className='mt-6 flex h-auto '>
                    {/* share code */}
                    {/* code */}
                    <div className='w-full p-4 '>
                      <textarea
                        placeholder='<<<<<'
                        className=' h-full w-full select-all resize-none rounded-xl bg-gray-100 p-6 outline-none'
                        value={codeToCopy}
                        readOnly
                      />
                    </div>

                    <div className='flex w-full flex-col items-center justify-center gap-6'>
                      <Image
                        priority
                        className={`border-5 h-full rounded-xl object-cover  p-8 shadow-xl`}
                        src={prev}
                        alt={'prev'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
