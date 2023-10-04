import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function DELETE(req: Request, res: Response) {
    const { id } = await req.json()  
    try {
      
      const deleteRecord = await db.socialConnection.delete({
        where: {
         id: id,
        },
      })
  
      return NextResponse.json({ success: true, deleteRecord })
    } catch (err: any) {
      console.log(err)
      return NextResponse.json(
        { error: err.message },
        {
          status: 500,
        },
      )
    }
  }