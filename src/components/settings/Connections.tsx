import React from 'react'
import Spinner from '../loading/spinner'

type Props = {
  InstagramConnection: any
}

export default function Connections({ InstagramConnection }: Props) {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch('/api/socialConnections', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: InstagramConnection.id,
      }),
    })
    if (res.ok) {
      setLoading(false)
    }
  }
  const handleAccept = async () => {
    setLoading(true)

    // Abre una nueva pestaña o ventana
    const oauthWindow = window.open('/api/oauth/connect/facebook', '_blank')

    try {
      const res = await fetch('/api/oauth/connect/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: InstagramConnection.id,
        }),
      })

      if (res.ok) {
        setLoading(false)
        window.location.reload()
        // Puedes cerrar la ventana después de obtener una respuesta exitosa si lo deseas
        // oauthWindow.close();
      } else {
        throw new Error('La solicitud no se completó con éxito.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='bg-[#FBFAF9]'>
      <div className='flex justify-between items-center text-sm font-medium px-8 py-8'>
        <h3>Connections</h3>
        <button className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
          save
        </button>
      </div>
      <div className=' border-t-2 flex flex-col gap-6 px-8 py-8'>
        <div>
          <div className='flex mb-4'>Instagram</div>
          <div className='flex gap-4 '>
            {InstagramConnection == null ? (
              <button
                onClick={handleAccept}
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </button>
            ) : (
              <div className='flex gap-4'>
                <label className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                  Connected
                </label>
                {loading ? (
                  <Spinner width='w-4' height='h-4' border='border-2' />
                ) : (
                  <button
                    onClick={handleDelete}
                    className='underline flex text-sm items-center'>
                    Disconnect
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
