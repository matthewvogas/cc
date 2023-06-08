import NavBar from '@/components/ui/navBar'
import Sidebar from '@/components/ui/sidebar'
import AuthProvider from '@/providers/AuthProvider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavBar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 pt-12'>{children}</main>
      </div>
    </AuthProvider>
  )
}
