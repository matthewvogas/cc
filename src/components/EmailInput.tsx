import React, { useState } from 'react'

type Props = {
  emails: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  required?: boolean
}

function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

function EmailsInput({ emails, setEmails, required }: Props) {
  const [isImail, setIsEmail] = useState(false)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const value = e.currentTarget.value

    if (!value.trim()) {
      setIsEmail(false) // Oculta el mensaje de error si no hay nada escrito
      return
    }

    if (!isValidEmail(value)) {
      setIsEmail(true)
      return
    }

    setEmails([...emails, value])
    e.currentTarget.value = ''
    e.preventDefault()
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    setIsEmail(false) // Oculta el mensaje de error al empezar a escribir
  }

  function removeTag(index: number) {
    setEmails(emails.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className='w-full overflow-x-auto rounded-xl border border-gra y-300 bg-gray-50 pl-2 py-2 pr-2 text-sm text-gray-900 flex gap-2 bg-transparent outline-none'>
        {emails?.map((email, index) => (
          <div
            className='flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1'
            key={index}>
            <span className='text-gray-800'>{email}</span>
            <span
              onClick={() => removeTag(index)}
              className='close flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white'>
              &times;
            </span>
          </div>
        ))}
        {isImail && (
          <p className='text-xs flex items-center text-red-600'>
            Invalid email.
          </p>
        )}
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type='text'
          className='flex items-center bg-transparent px-2 py-1 outline-none'
          placeholder='sophia@codecoco.co'
          required={required ? true : false}
        />
      </div>
    </>
  )
}

export default EmailsInput
