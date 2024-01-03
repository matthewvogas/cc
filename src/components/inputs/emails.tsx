'use client'

type Props = {
  email: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  required?: boolean
}

function InputEmails({ email, setEmails, required }: Props) {
  function removeEmail(index: any) {
    setEmails(email.filter((el, i) => i !== index))
  }

  function handleKeyDown(e: any) {
    if (e.key !== 'Enter') return
    const value = e.target.value;

    value.split(',').map((item: string) => {
      const exist = email.filter((el) => el === item.trim());
      if (!exist.length) {
        email.push(item.trim());
      }
    });

    setEmails([...email])
    e.target.value = ''
    e.preventDefault()
  }

  return (
    <div className='w-full rounded-3xl pl-2 py-[6px] text-sm text-gray-900 flex gap-2 outline-none overflow-auto flex-wrap'>
      {/* {email?.map((tag, index) => (
        <div
          className='flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1'
          key={index}>
          <span className='text-gray-800 min-h-max w-max'>{tag}</span>
          <span
            onClick={() => removeEmail(index)}
            className=' flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white'>
            &times;
          </span>
        </div>
      ))} */}
      <input
        onKeyDown={handleKeyDown}
        type='text'
        className='flex-grow bg-transparent px-2 py-1 outline-none'
        placeholder='matthew@codecoco.co or codecoco username'
        required={required ? true : false}
      />
    </div>
  )
}

export default InputEmails
