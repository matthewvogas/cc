import Sidebar from '@/components/sidebar'
import { User } from '../user'

export default async function clients() {
  return (
    <section className='flex flex-col items-center justify-center gap-4'>
      <Sidebar />
      <h2>Clients Page</h2>
    </section>
  )
}
