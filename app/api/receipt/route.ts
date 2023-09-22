import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {transferdetails} = await req.json();
    const {recipient_name,amount,date,status,senderId,sender_name,recipientId} = transferdetails;
    console.log(transferdetails);
    try{
        const transfer = prisma.transfer.create({
            data:{
                status,
                amount,
                recipient_name,
                date,
                senderId
            },
        });
        const reception = prisma.reception.create({
            data:{
                status,
                amount,
                sender_name,
                date,
                recipientId,
            },
        });
        
        await Promise.all([transfer,reception]);
        console.log("hello world!");
        return NextResponse.json({created:true,status:"success"});
    }catch(error){
        console.log(error);
        NextResponse.json({status:"fail"});
    }
}