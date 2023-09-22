import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {username,amount} = await req.json();

    try{
        await prisma.user.update({
            where:{
                username
            },
            data:{
                balance:amount
            }
        });        
        return NextResponse.json({status:"success"});
    }catch(error){
        console.log(error);
        NextResponse.json({status:"fail"});
    }
}