'use client'
import PostCard from '@/components/postCard'
import React from 'react'

export interface NewType {
  id: number
  post: any
}

export function SharedPost({ post }: NewType) {
  return (
    <>
      <PostCard post={post} />
    </>
  )
}
