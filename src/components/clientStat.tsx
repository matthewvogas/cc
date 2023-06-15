// Style
const statStyle = 'px-6 py-4 bg-green-50 rounded-lg w-44'

// Arrays
const buttons = [
  {
    icon: '👤',
    value: '1',
    label: 'creators',
  },
]

// Show Arrays

export default function ClientStat() {
  return (
    <>
      <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
        {buttons[0].icon} {buttons[0].value} {buttons[0].label}
      </p>
    </>
  )
}
