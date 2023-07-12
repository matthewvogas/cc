'use client'

type Props = {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

function TagsInput({ tags, setTags }: Props) {
  function handleKeyDown(e: any) {
    // If user did not press enter key, return
    if (e.key !== 'Enter') return
    // Get the value of the input
    const value = e.target.value
    // If the value is empty, return
    if (!value.trim()) return
    // Add the value to the tags array
    setTags([...tags, '#' + value])
    // Clear the input
    e.target.value = ''
    e.preventDefault()
  }

  function removeTag(index: any) {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
    <div className='w-full mt-4 rounded-xl border border-gray-300 bg-gray-50 pl-4 py-2 text-sm text-gray-900 flex flex-wrap gap-2 bg-transparent outline-none'>
      {tags?.map((tag, index) => (
        <div
          className='flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1'
          key={index}>
          {/* One hardcoded tag for test */}
          <span className='text-gray-800'>{tag}</span>
          <span
            onClick={() => removeTag(index)}
            className='close flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white'>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type='text'
        className='flex-grow bg-transparent px-2 py-1 outline-none'
        placeholder='#tag'
      />
    </div>
  )
}

export default TagsInput
