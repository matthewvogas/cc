import SidebarCreators from '@/components/dashboards/influencer/sidebarCreators'
import { SingInButton, SingOutButton } from '@/components/auth/AuthButtons'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AuthProvider from '@/providers/AuthProvider'
import Sidebar from '@/components/menus/sidebar'
import { getServerSession } from 'next-auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user.role === 'AGENCY') {
    return (
      <AuthProvider>
        <div className='flex'>
          <Sidebar />
          <main className='flex-1 w-full  overflow-hidden'>{children}</main>
        </div>
      </AuthProvider>
    )
  } else if (session?.user.role === 'CREATOR') {
    return (
      <AuthProvider>
        <div className='flex'>
          <SidebarCreators/>
          <main className='flex-1 w-full  overflow-hidden'>{children}</main>
        </div>
          <SingInButton />
          <SingOutButton />
      </AuthProvider>
    )
  } else if (session?.user.role === 'TESTER') {
    return (
      <AuthProvider>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 w-full  overflow-hidden'>{children}</main>
      </div>
    </AuthProvider>
    )
  }
}
