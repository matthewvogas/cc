// components/DropdownCheckbox.tsx
import React, { useState, FC, ChangeEvent } from 'react'

interface CheckboxOption {
  id: string
  username: string
  checked: boolean
}

interface DropdownCheckboxProps {
  options: CheckboxOption[]
  onOptionChange: (id: string, checked: boolean) => void
}

const DropdownCheckbox: FC<DropdownCheckboxProps> = ({
  options,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    onOptionChange(id, checked)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const filteredOptions = options.filter(option =>
    option.username.toLowerCase().includes(searchText.toLowerCase()),
  )

  const selectedCount = options.filter(option => option.checked).length

  const buttonText =
    selectedCount > 0 ? `${selectedCount} selected(s)` : 'search @creators'

  return (
    <div className='relative  text-left'>
      <button
        onClick={toggleDropdown}
        type='button'
        className='w-full mt-4 rounded-xl border border-[#7F7F7F] bg-[#0000] pl-4 justify-between pr-4 py-2 text-sm text-gray-600 flex gap-2 outline-none'>
        {buttonText}
        <svg
          className='ml-2 -mr-1 w-4 h-4'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            fill='currentColor'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <input
            type='text'
            placeholder='Buscar...'
            value={searchText}
            onChange={handleSearchChange}
            className='w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-300 focus:outline-none'
          />
          <div
            className='py-1 max-h-40 overflow-y-auto'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'>
            {filteredOptions.map(option => (
              <div
                key={option.id}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center'
                role='menuitem'>
                <input
                  type='checkbox'
                  id={option.id}
                  checked={option.checked}
                  onChange={e =>
                    handleCheckboxChange(option.id, e.target.checked)
                  }
                  className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label htmlFor={option.id}>{option.username}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownCheckbox
