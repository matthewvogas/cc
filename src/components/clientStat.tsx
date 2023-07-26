import Image from 'next/image'

// Style
const statStyle = 'px-6 py-4 bg-green-50 rounded-lg w-44'

// Show Arrays
export default function ClientStat(props: {
  icon: any
  value: number
  text: string
}) {
  return (
    <>
      <p className={`flex rounded-lg bg-green-50 px-6 py-4`}>
        <Image src={props.icon} alt={'icon'} className='pr-1' />
        <span className='ml-2'>{props.text}</span>
        <span className='ml-1 mr-3 md:mr-0'>{props.value}</span>
      </p>
    </>
  )
}
