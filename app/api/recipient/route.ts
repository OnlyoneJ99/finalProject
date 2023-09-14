import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    console.log('next');
    const recipient = await req.json();
    console.log(recipient.recipientphonenumber);
    const phonenumber = recipient.recipientphonenumber as string;
    const user = await prisma.users.findFirst({
        where:{
            OR:[{phonenumber},{username:""}]
        }
    })
    console.log(user)
    return NextResponse.json({user:user});
}