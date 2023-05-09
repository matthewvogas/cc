import { User } from '../user'

export default async function Dashboard() {
  return (
    <section className='flex flex-col items-center justify-center gap-4'>
      <h1>DashBoard</h1>
      <p>Pues si aca iria el dashboard</p>
      <User />
    </section>
  )
}
