import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {username} = await req.json();
    const balance = await prisma.user.findUnique({
        where:{
            username
        },
        select:{
            balance:true,
            country:true
        }
    });
    
    return NextResponse.json(balance);
}