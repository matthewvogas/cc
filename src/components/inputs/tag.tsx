'use client'

type Props = {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  required?: boolean
}

function TagsInput({ tags, setTags, required }: Props) {
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
    <div className=' w-full  rounded-3xl border border-[#d1d1d1]  pl-2 py-[6px] text-sm text-gray-900 flex gap-2 outline-none overflow-auto flex-wrap'>
      {tags?.map((tag, index) => (
        <div
          className='flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1'
          key={index}>
          <span className='text-gray-800 min-h-max w-max'>{tag}</span>
          <span
            onClick={() => removeTag(index)}
            className=' flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white'>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type='text'
        className='flex-grow bg-transparent px-2 py-1 outline-none'
        placeholder='#tag'
        required={required ? true : false}
      />
    </div>
  )
}

export default TagsInput
