'use client'

import imageCover from 'public/assets/register/creatorImg.jpg'
import React, { useState } from 'react'
import { Story } from '@prisma/client'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div
      className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
      <Image
        priority
        className={`h-[222px] md:h-[482px] rounded-2xl object-cover`}
        src={story.imageUrl || imageCover}
        alt='background'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%' }}
        unoptimized={true}
      />
    </div>
  )
}
