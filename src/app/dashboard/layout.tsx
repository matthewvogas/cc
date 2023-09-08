import Sidebar from '@/components/ui/sidebar'
import AuthProvider from '@/providers/AuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { SingInButton, SingOutButton } from '@/components/auth/AuthButtons'

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
          <p>Pagina de creador</p>
          {/* <Sidebar />
          <main className='flex-1 w-full  overflow-hidden'>{children}</main> */}
        </div>
          <SingInButton />
          <SingOutButton />
      </AuthProvider>
    )
  }
}
