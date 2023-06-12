import { SingOutButton, SingInButton } from '../auth/AuthButtons'

export default function NavBar() {
  return (
    <nav className='fixed inset-0 z-50  flex h-12 flex-row items-center justify-end gap-7  bg-gray-100 p-3'>
      <ul className='flex flex-row items-center gap-3 p-4'>
        <SingInButton />
        <SingOutButton />
      </ul>
    </nav>
  )
}
