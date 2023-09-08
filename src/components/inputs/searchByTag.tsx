'use client'

import { ptMono } from '@/app/fonts'

export default function SearchByTag(props: {
  tagSelected: string
  setSearchTags: any
  searchTags: any
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSearchTags(event.target.value)
  }

  // Extract unique tags from the searchTags array
  const uniqueTags: string[] = []
  props.searchTags.forEach((tag: any) => {
    tag.tags?.forEach((t: any) => {
      if (!uniqueTags.includes(t.name)) {
        uniqueTags.push(t.name)
      }
    })
  })

  return (
    <div className=''>
      <div
        className={`h-[42px] flex cursor-pointer content-center items-center justify-center gap-5 rounded-full bg-transparent border border-gray-400 px-6 py-2 text-gray-500 ${ptMono.className}`}>
        <select
          value={props.tagSelected}
          onChange={handleChange}
          className='bg-transparent outline-none cursor-pointer'>
          <option value={''}>search by tag</option>
          {uniqueTags.map((tag: string, index: number) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
