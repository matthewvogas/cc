import CheckboxGreen from 'public/assets/register/falseCheckboxGreen.svg'
import { useSubscriptionStore } from './store/subscriptionStore'
import Checkbox from 'public/assets/register/falseCheckbox.svg'
import { Dialog, Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { checkout } from '../../app/api/subscriptions/checkout/checkout'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'

import { EnumSubscriptionStatus } from '@prisma/client'

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
      <div className='flex flex-col text-start ml-12 w-56 rounded-lg font-semibold'>
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
      <div className='p-4 ml-10 -mt-8 w-full mr-20'>
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default function Subscription() {
  const [status, setStatus] = useState('')

  const { yesPlan, setYesPlan, absolutelyPlan, setAbsolutelyPlan } =
    useSubscriptionStore()
  const [isOpen, setIsOpen] = useState(false)
  const [endSubscription, setEndSubscription] = useState()
  const [price, setPrice] = useState()
  const [last4, setLast4] = useState()
  const [expMonth, setExpMonth] = useState()
  const [expYear, setExpYear] = useState()
  const [brand, setBrand] = useState()
  const [billingInterval, setBillingInterval] = useState()
  const [subscriptionType, setSubscriptionType] = useState()
  const [showCancelAlert, setShowCancelAlert] = useState(false)

  useEffect(() => {
    async function getSubscription() {
      try {
        const response = await fetch('/api/subscriptions')

        if (!response.ok) {
          throw new Error('Failed to get subscription')
        }
        const data = await response.json()

        setEndSubscription(data.subscription.currentPeriodEnd)
        setPrice(data.price)
        setLast4(data.last4)
        setExpMonth(data.expMonth)
        setExpYear(data.expYear)
        setBrand(data.brand)
        setBillingInterval(data.billingInterval)

        setStatus(data.subscription.status)

        setSubscriptionType(data.subscriptionType)
      } catch {
        console.error('Error fetching subscription:')
      }
    }
    getSubscription()
  }, [status, setStatus])

  const date = new Date(endSubscription!)
  const handleYesPayment = async () => {
    if (status === 'ACTIVE') {
      setShowCancelAlert(true)
      return
    }

    if (yesPlan) {
      await checkout({
        lineItems: [
          {
            price: yesPlan,
            quantity: 1,
          },
        ],
      })
    }
  }
  const handleAbsolutelyPayment = async () => {
    if (status === 'ACTIVE') {
      setShowCancelAlert(true)
      return
    }

    if (absolutelyPlan) {
      await checkout({
        lineItems: [
          {
            price: absolutelyPlan,
            quantity: 1,
          },
        ],
      })
    }
  }
  const handleCancelSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel subscription.')
      }
      setStatus('CANCELED')
      closeModal()
      return data
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const tabs = [
    {
      label: 'Your plan',
      content: (
        <div>
          <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Profile Settings</h1>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
                save
              </button>
            </div>
            <div className='divider'></div>
            <div className='flex flex-row items-center justify-between p-10'>
              <div className='flex flex-row items-center justify-between p-10'>
                {status === EnumSubscriptionStatus.CANCELED ? (
                  <span className='font-bold'>
                    Your subscription is canceled. 🚫
                  </span>
                ) : subscriptionType !== 'CANCELED' ? (
                  <span className='font-bold'>
                    Your current plan is {subscriptionType} 🥥
                  </span>
                ) : (
                  <span className='font-bold'>
                    {'You don&apos;t have any plan yet'}.
                  </span>
                )}
              </div>

              {subscriptionType !== 'ABSOLUTELY' ? (
                <a
                  href='#plans'
                  className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50 mr-80 '>
                  upgrade
                </a>
              ) : null}

              <div className=''>
                <span className={`${ptMono.className}`}>
                  {status === 'ACTIVE' ? `$${price}/${billingInterval}` : null}
                </span>
              </div>
            </div>
            <div className='divider -mt-5'></div>
            <div className='p-10'>
              <span className='font-semibold'></span>

              {status === 'ACTIVE' && (
                <div className='flex flex-row gap-10 mt-5'>
                  {subscriptionType !== 'ABSOLUTELY' ? (
                    <a id='' className='underline'>
                      Update your payment plan
                    </a>
                  ) : null}

                  <button className='underline' onClick={openModal}>
                    Cancel your subscription
                  </button>
                  <Transition appear show={isOpen}>
                    <Dialog
                      as='div'
                      className='fixed inset-0 z-50 overflow-y-auto'
                      onClose={closeModal}>
                      <div className='flex items-center justify-center min-h-screen px-4 z-50 text-center'>
                        <Transition.Child
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'>
                          <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
                        </Transition.Child>

                        <Transition.Child
                          enter='ease-out duration-300'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'>
                          <Dialog.Panel className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <Dialog.Title
                              as='h3'
                              className='text-lg font-medium leading-6 text-gray-900'>
                              Cancel Subscription
                            </Dialog.Title>
                            <div className='mt-4'>
                              <p className='text-sm text-gray-600'>
                                Are you sure you want to cancel your
                                subscription?
                              </p>
                            </div>
                            <div className='mt-6 flex gap-5'>
                              <button
                                type='button'
                                className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                onClick={handleCancelSubscription}>
                                Yes, Cancel Subscrption!
                              </button>
                              <button
                                type='button'
                                className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                onClick={closeModal}>
                                No, Bring me back to Subscriptions!
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition>
                  <Transition appear show={showCancelAlert}>
                    <Dialog
                      as='div'
                      className='fixed inset-0 z-50 overflow-y-auto'
                      onClose={() => setShowCancelAlert(false)}>
                      <div className='flex items-center justify-center min-h-screen px-4 text-center'>
                        <Transition.Child
                          as='div'
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'>
                          <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
                        </Transition.Child>
                        <Transition.Child
                          as='div'
                          enter='ease-out duration-300'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'>
                          <Dialog.Panel className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <Dialog.Title
                              as='h3'
                              className='text-lg font-medium leading-6 text-gray-900'>
                              Plan Change Alert
                            </Dialog.Title>
                            <div className='mt-4'>
                              <p className='text-sm text-gray-600'>
                                You currently have an active subscription.
                                Please cancel your current plan before
                                purchasing a new one.
                              </p>
                            </div>
                            <div className='mt-6 flex gap-5'>
                              <button
                                type='button'
                                className='inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                onClick={() => setShowCancelAlert(false)}>
                                Close
                              </button>
                              <button
                                type='button'
                                className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                onClick={handleCancelSubscription}>
                                Cancel Current Subscription
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition>

                  {subscriptionType !== 'ABSOLUTELY' ? (
                    <span>
                      Save 25% by{' '}
                      <a href='' className='underline'>
                        switching to a yearly plan
                      </a>
                    </span>
                  ) : null}
                </div>
              )}
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
                      <input
                        type='radio'
                        name='Yes Subscription'
                        id=''
                        onChange={() =>
                          setYesPlan('price_1OAF90Dud2nVdnbnxAgbOyXq')
                        }
                      />
                      <div>
                        <div className='flex flex-row items-center'>
                          <div className='mr-4'>
                            <p className='text-sm font-medium'>$8.99/month</p>
                            <p className='text-xs opacity-50'>
                              billed monthly
                            </p>
                          </div>

                          {price === 8.99 && status === 'ACTIVE' ? (
                            <span className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              Purchased
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* <p className='bg-active text-black text-xs px-4 py-2 rounded-lg'>save 30%</p> */}
                  </div>

                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <input
                        type='radio'
                        name='Yes Subscription'
                        id=''
                        defaultChecked
                        onChange={() =>
                          setYesPlan('price_1OAFFmDud2nVdnbnrrdKcgTK')
                        }
                      />
                      <div>
                        <div className='flex flex-row items-center'>
                          <div className='mr-4'>
                            <p className='text-sm font-medium'>$6/month</p>
                            <p className='text-xs opacity-50'>
                              billed annually ($132)
                            </p>
                          </div>

                          {price === 132 && status === 'ACTIVE' ? (
                            <span className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              Purchased
                            </span>
                          ) : (
                            <button className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              save 30%
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {subscriptionType === 'YES' ? (
                <div className='mt-8 flex justify-between'>
                  <h4 className='text-base font-bold'>Due today</h4>
                  <p className='text-base font-bold'>${price}</p>
                </div>
              ) : null}
              <div className='divider'></div>
              {subscriptionType === 'YES' ? (
                <p className='text-xs font-medium opacity-50'>
                  This is your current plan renewing {date.toLocaleDateString()}
                </p>
              ) : null}

              <div className='mt-8 flex flex-col gap-2'></div>
              <button
                className='mt-6 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '
                onClick={() => handleYesPayment()}>
                {' '}
                Save 30% with annual
              </button>
            </div>

            <div className='w-96 rounded-t-lg bg-greenPlan p-8 ' id='plans'>
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
                      <input
                        type='radio'
                        name='Absolutely Subscription'
                        id=''
                        onChange={() =>
                          setAbsolutelyPlan('price_1OAFIGDud2nVdnbnIIm7tio2')
                        }
                      />
                      <div>
                        <div className='flex flex-row items-center'>
                          <div className='mr-4'>
                            <p className='text-sm font-medium'>$14.99/month</p>
                            <p className='text-xs opacity-50'>
                              billed monthly
                            </p>
                          </div>

                          {price === 14.99 && status === 'ACTIVE' ? (
                            <span className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              Purchased
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between rounded-lg bg-white px-5 py-4'>
                    <div className='flex gap-4'>
                      <input
                        type='radio'
                        name='Absolutely Subscription'
                        id=''
                        defaultChecked
                        onChange={() =>
                          setAbsolutelyPlan('price_1OAFKVDud2nVdnbn7WTBDc5U')
                        }
                      />

                      <div>
                        <div className='flex flex-row items-center'>
                          <div className='mr-4'>
                            <p className='text-sm font-medium'>$11/month</p>
                            <p className='text-xs opacity-50'>
                              billed annually ($1428)
                            </p>
                          </div>

                          {price === 1428 && status === 'ACTIVE' ? (
                            <span className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              Purchased
                            </span>
                          ) : (
                            <button className='rounded-lg bg-active px-4 py-2 text-xs text-black'>
                              save 30%
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {subscriptionType === 'ABSOLUTELY' ? (
                <div className='mt-8 flex justify-between'>
                  <h4 className='text-base font-bold'>Due today</h4>
                  <p className='text-base font-bold'>${price}</p>
                </div>
              ) : null}

              <div className='divider'></div>
              {subscriptionType === 'ABSOLUTELY' ? (
                <p className='text-xs font-medium opacity-50'>
                  This is your current plan renewing {date.toLocaleDateString()}
                </p>
              ) : null}
              <button
                className='mt-9 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '
                onClick={() => handleAbsolutelyPayment()}>
                Buy Plan
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
          <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Payment Methods</h1>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
                save
              </button>
            </div>
            <div className='divider'></div>
            <div className='bg-beigePlan m-10 rounded-lg'>
              <a href='' className='flex gap-2 p-4'>
                <span className='font-semibold capitalize'>
                  {brand} {last4}
                </span>
                <span className='italic'>
                  Exp. {expMonth}/{expYear}
                </span>
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
