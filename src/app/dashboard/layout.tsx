import Sidebar from '@/components/ui/sidebar'
import AuthProvider from '@/providers/AuthProvider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className='flex overflow-clip'>
        <Sidebar />
        <main className='flex-1'>{children}</main>
      </div>
    </AuthProvider>
  )
}
