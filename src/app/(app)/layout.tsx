import Sidebar from '@/components/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <section className='w-mainsection xl:ml-72'>{children}</section>
    </>
  )
}
