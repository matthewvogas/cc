import Sidebar from '@/components/ui/sidebar'
import AuthProvider from '@/providers/AuthProvider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 w-full  overflow-hidden'>{children}</main>
      </div>
    </AuthProvider>
  )
}
