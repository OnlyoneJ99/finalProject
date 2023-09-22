import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {recipientphonenumber,amount} = await req.json();

    try{
        const recipient = await prisma.user.update({
            where:{
                phonenumber:recipientphonenumber
            },
            data:{
                balance:{
                    increment:amount
                }
            },
            select:{
                id:true,
                firstname:true,
                lastname:true,
                country:true,                
            }
        }); 

        return NextResponse.json({recipient,status:"success"});
    }catch(error){
        console.log(error);
        NextResponse.json({status:"fail"});
    }
}