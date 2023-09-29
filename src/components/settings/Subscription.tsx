import React, { useState } from 'react'
import CheckboxGreen from 'public/assets/register/falseCheckboxGreen.svg'
import Checkbox from 'public/assets/register/falseCheckbox.svg'
import Banner from 'public/assets/register/BannerPlans.jpg'
import Radio from 'public/assets/register/falseRadio.svg'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
type Props = {
  tabs: any[]
}
function CustomTabs({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index)
  }

  return (
    <div className='flex flex-row mt-10'>
      <div className='flex gap-3 flex-col text-start w-56 rounded-lg font-semibold'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-3 ${
              activeTab === index
                ? 'text-brown bg-greenCTA rounded-md bg-opacity-50'
                : 'text-brown'
            } inline-block cursor-pointer`}
            onClick={() => handleTabClick(index)}>
            {tab.label}
          </div>
        ))}
      </div>
      <div className='ml-10 w-full mr-20'>
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default function Subscription() {
  const tabs = [
    {
      label: 'Your plan',
      content: (
        <div>
          <div className='bg-background rounded-lg bg-opacity-20 mr-20 w-full'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Profile Settings</h1>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
                save
              </button>
            </div>
            <div className='divider'></div>
            <div className='flex flex-row items-center justify-between p-10'>
              <span className='font-bold'>Yes 🥥</span>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50 mr-80'>
                upgrade
              </button>
              <div className=''>
                <span className={`${ptMono.className}`}>$14.99/month</span>
              </div>
            </div>
            <div className='divider -mt-5'></div>
            <div className='p-10'>
              <span className='font-semibold'>
                You’ll be charged $14.99 on September 11th on the Visa ending in
                6495.
              </span>
              <div className='flex flex-row gap-10 mt-5'>
                <a href='/' className='underline'>
                  Update your payment plan
                </a>
                <a href='' className='underline'>
                  Cancel your subscription
                </a>
                <span>
                  Save 25% by
                  <a href='' className='underline'>
                    {' '}
                    switching to a yearly plan
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className='flex gap-10 mt-10'>
            <div className='w-96 rounded-t-lg bg-beigePlan  p-8 '>
              <div className=''>
                <h2 className={`mb-5 text-2xl ${ptMono.className}`}>Yes 🥥</h2>
                <div className='mb-5 flex flex-col gap-3 text-sm font-medium'>
                  <span className='flex gap-4'>
                    <Image className={``} src={Checkbox} alt={''} /> share your
                    public portfolio
                  </span>
                  <span className='flex gap-4'>
                    <Image className={``} src={Checkbox} alt={''} /> show up to
                    20 posts
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <Image className={``} src={Radio} alt={''} />
                      <div>
                        <p className='text-sm font-medium'>$8.99/month</p>
                        <p className='text-xs opacity-50'>billed monthly</p>
                      </div>
                    </div>
                    {/* <p className='bg-active text-black text-xs px-4 py-2 rounded-lg'>save 30%</p> */}
                  </div>

                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <Image className={``} src={Radio} alt={''} />
                      <div>
                        <p className='text-sm font-medium'>$6/month</p>
                        <p className='text-xs opacity-50'>
                          billed annually ($132)
                        </p>
                      </div>
                    </div>
                    <p className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                      save 30%
                    </p>
                  </div>
                </div>
              </div>

              <div className='divider'></div>
              <p className='text-xs font-medium opacity-50'>
                This is your current plan renewing September
              </p>

              <div className='mt-8 flex flex-col gap-2'></div>
              <button className='mt-6 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '>
                {' '}
                Save 30% with annual
              </button>
            </div>

            <div className='w-96 rounded-t-lg bg-greenPlan p-8 '>
              <div className=''>
                <h2 className={`mb-5 text-2xl ${ptMono.className}`}>
                  Absolutely 🥥🥥
                </h2>
                <div className='mb-5 flex flex-col gap-3 text-sm font-medium'>
                  <span className='flex gap-4'>
                    <Image className={``} src={CheckboxGreen} alt={''} />{' '}
                    customize your portfolio
                  </span>
                  <span className='flex gap-4'>
                    <Image className={``} src={CheckboxGreen} alt={''} />{' '}
                    unlimited posts
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <Image className={``} src={Radio} alt={''} />
                      <div>
                        <p className='text-sm font-medium'>$14.99/month</p>
                        <p className='text-xs opacity-50'>billed monthly</p>
                      </div>
                    </div>
                    {/* <p className='bg-active text-black text-xs px-4 py-2 rounded-lg'>save 30%</p> */}
                  </div>

                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <Image className={``} src={Radio} alt={''} />
                      <div>
                        <p className='text-sm font-medium'>$11/month</p>
                        <p className='text-xs opacity-50'>
                          billed annually ($1,428)
                        </p>
                      </div>
                    </div>
                    <p className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                      save 30%
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex justify-between'>
                <h4 className='text-base font-bold'>Due today</h4>
                <p className='text-base font-bold'>$11.00</p>
              </div>

              <div className='divider'></div>
              <button className='mt-3 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '>
                {' '}
                Save 30% with annual
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Payment Methods',
      content: (
        <div>
          <div className='bg-background rounded-lg bg-opacity-20 mr-20 w-full'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Payment Methods</h1>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
                save
              </button>
            </div>
            <div className='divider'></div>
            <div className='bg-beigePlan m-10 rounded-lg'>
              <a href='' className='flex gap-2 p-4'>
                <span className='font-semibold'>Visa 6495</span>
                <span className='italic'>Exp. 5/2026</span>
              </a>
            </div>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50 ml-10 mb-20'>
              add new card
            </button>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div>
      <CustomTabs tabs={tabs} />
    </div>
  )
}
