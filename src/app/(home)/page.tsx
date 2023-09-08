import Header from '@/components/home/mainComponentes/header'
import Home from '@/components/home/pages/home'
import Footer from '@/components/home/mainComponentes/footer'

export default function Page({}) {
  return (
    <>
      <Header frome={'landing'} />
      <Home />
      <Footer />
    </>
  )
}
