'use client'
import Header from '@/components/home/mainComponentes/header'
import Home from '@/components/home/pages/homeCreator'
import Footer from '@/components/home/mainComponentes/footer'

export default function Page({}) {
  return (
    <>
      <Header frome={'landingCreator'} />
      <Home />
      <Footer />
    </>
  )
}
