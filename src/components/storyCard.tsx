'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import React, { useState } from 'react'
import UseThisPost from './useThisPost'
import { Dialog } from '@headlessui/react'
import { Post } from '@/types/campaign/campaignRes'
import imageCover from 'public/assets/register/creatorImg.jpg'
import InstagramLogo from 'public/assets/creatorRegister/instagram-black-share-icon.svg'
import TikToksLogo from 'public/assets/creatorRegister/tiktok-black-share-icon.svg'
import { Story } from '@prisma/client'

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div
      className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
      <Image
        priority
        className={`h-60 md:h-80 rounded-2xl object-cover`}
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
