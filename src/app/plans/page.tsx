'use client'
import CheckboxGreen from 'public/assets/register/falseCheckboxGreen.svg'
import Checkbox from 'public/assets/register/falseCheckbox.svg'
import Banner from 'public/assets/register/BannerPlans.jpg'
import Radio from 'public/assets/register/falseRadio.svg'
import logo from 'public/assets/register/LogoSVG.svg'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import { checkoutTrial } from '../api/subscriptions/checkout/checkoutTrial'
import { useSubscriptionStore } from '@/components/settings/store/subscriptionStore'

export default function Plans() {
  const { yesPlan, setYesPlan, absolutelyPlan, setAbsolutelyPlan } =
    useSubscriptionStore()

  const handleYesFreeTrial = async () => {
    await checkoutTrial({
      lineItems: [
        {
          price: yesPlan,
          quantity: 1,
        },
      ],
    })
  }
  const handleAbsolutelyFreeTrial = async () => {
    await checkoutTrial({
      lineItems: [
        {
          price: absolutelyPlan,
          quantity: 1,
        },
      ],
    })
  }

  return (
    <>
      <div className=' absolute flex h-full w-full flex-col justify-between '>
        <div className='mx-5 my-5 mb-11 flex items-center justify-between'>
          <Image className={`w-40`} src={logo} alt={''} />
          <p className='flex h-11 items-center rounded-full bg-sidebarBackground  px-6 text-sm'>
            {' '}
            Sophia 🥥
          </p>
        </div>
        <div className='flex justify-around '>
          <div className='mt-20 flex flex-col'>
            <h3 className={`text-xl ${ptMono.className}`}>
              Start your 7-day free trial 🥥
            </h3>
            <p className={`mb-9 mt-3 text-sm font-medium`}>
              Everything you need to track your campaigns and present their
              value.
              <br />
              Nothing you don’t need.
            </p>

            <div className='flex flex-col gap-3 text-sm font-medium'>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Create
                campaigns and client profiles
              </span>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Live, dynamic
                tracking of all campaign data
              </span>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Embed your
                campaigns elsewhere
              </span>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Share your
                campaigns with responsive links
              </span>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Create your own
                branded landing pages for campaigns
              </span>
              <span className='flex gap-4'>
                <Image className={``} src={Checkbox} alt={''} /> Make your
                campaign links private to clients only
              </span>
            </div>
          </div>

          <div className='w-96 rounded-t-lg bg-beigePlan  p-8 '>
            <div className=''>
              <h2 className={`mb-5 text-2xl ${ptMono.className}`}>Yes 🥥</h2>
              <div className='mb-5 flex flex-col gap-3 text-sm font-medium'>
                <span className='flex gap-4'>
                  <Image className={``} src={Checkbox} alt={''} /> up to 25
                  active campaigns
                </span>
                <span className='flex gap-4'>
                  <Image className={``} src={Checkbox} alt={''} /> up to 50
                  posts per campaign
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
                      <p className='text-sm font-medium'>$59/month</p>
                      <p className='text-xs opacity-50'>billed monthly</p>
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
                      <p className='text-sm font-medium'>$41/month</p>
                      <p className='text-xs opacity-50'>
                        billed annually ($540)
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
              <p className='text-base font-bold'>$0.00</p>
            </div>
            <div className='divider'></div>
            <p className='text-xs font-medium opacity-50'>
              7 days free, when your free trial ends <br /> you’ll be charged
              $59/month.
            </p>
            <div className='mt-8 flex flex-col gap-2'>
              <div className='flex w-full rounded-full bg-white p-4 pl-6 lowercase text-black opacity-50'>
                <input
                  className='text-black outline-none'
                  placeholder='Sophia Ellis s'
                  type='text'
                />
              </div>
              <div className='flex w-full rounded-full bg-white p-4 pl-6 lowercase text-black opacity-50 '>
                <input
                  className='w-2/4 text-black outline-none'
                  placeholder='Card Number'
                  type='text'
                />
                <input
                  className='w-1/4 text-black outline-none'
                  placeholder='YY'
                  type='text'
                />
                <input
                  className='w-1/4 text-black outline-none'
                  placeholder='MM'
                  type='text'
                />
              </div>
            </div>
            <button
              onClick={handleYesFreeTrial}
              className='mt-6 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '>
              {' '}
              start free trial
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
                  unlimited active campaigns
                </span>
                <span className='flex gap-4'>
                  <Image className={``} src={CheckboxGreen} alt={''} />{' '}
                  unlimited posts per campaign
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
                      <p className='text-sm font-medium'>$149/month</p>
                      <p className='text-xs opacity-50'>billed monthly</p>
                    </div>
                  </div>
                  {/* <p className='bg-active text-black text-xs px-4 py-2 rounded-lg'>save 30%</p> */}
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
                      <p className='text-sm font-medium'>$119/month</p>
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
              <p className='text-base font-bold'>$0.00</p>
            </div>

            <div className='divider'></div>
            <p className='text-xs font-medium opacity-50'>
              7 days free, when your free trial ends <br /> you’ll be charged
              $59/month.
            </p>
            <div className='mt-8 flex flex-col gap-2'>
              <div className='flex w-full rounded-full bg-white p-4 pl-6 lowercase text-black opacity-50'>
                <input
                  className='text-black outline-none'
                  placeholder='Sophia Ellis s'
                  type='text'
                />
              </div>
              <div className='flex w-full rounded-full bg-white p-4 pl-6 lowercase text-black opacity-50 '>
                <input
                  className='w-2/4 text-black outline-none'
                  placeholder='Card Number'
                  type='text'
                />
                <input
                  className='w-1/4 text-black outline-none'
                  placeholder='YY'
                  type='text'
                />
                <input
                  className='w-1/4 text-black outline-none'
                  placeholder='MM'
                  type='text'
                />
              </div>
            </div>
            <button
              onClick={handleAbsolutelyFreeTrial}
              className='mt-6 w-full rounded-full bg-active p-4 pl-6 text-center text-base font-medium lowercase text-black '>
              {' '}
              start free trial
            </button>
          </div>
        </div>
      </div>

      <div className='flex h-screen w-full flex-col-reverse'>
        <Image className={`w-full`} src={Banner} alt={''} />
      </div>
    </>
  )
}
