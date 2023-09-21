import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const recipient = await req.json();
    const phonenumber = recipient.recipientphonenumber as string;
    const user = await prisma.users.findUnique({
        where:{
            phonenumber
        },
        select:{
            
        }
    })
    return NextResponse.json({user:user});
}