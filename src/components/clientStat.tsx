// Style
const statStyle = 'px-6 py-4 bg-green-50 rounded-lg w-44'

// Show Arrays
export default function ClientStat(props: {
  icon: string
  value: number
  text: string
}) {
  return (
    <>
      <p className={` flex items-center rounded-lg bg-green-50 px-6 py-4`}>
        {props.icon} {props.text} {props.value}
      </p>
    </>
  )
}
