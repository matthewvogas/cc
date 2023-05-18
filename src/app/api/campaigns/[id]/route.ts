import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(Request: Request, { params }: { params: { id: string } } ) {

    //Get id from url
    try{
        const campaign = await prisma.campaign.findUniqueOrThrow({
            where: {
                id: parseInt(params.id)
            },
            include: {
                posts: {
                    orderBy: {
                        created_at: 'desc'
                    }
                }
            }
        })

        return NextResponse.json(campaign)
    }
    catch(err: any){
        return NextResponse.json(err.message, {
            status: 500,
        })
    }
  }