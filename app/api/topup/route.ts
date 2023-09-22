import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {userId,amount} = await req.json();
    
    try{
        const result = await prisma.user.update({
            where:{
                id:userId,
            },
            data:{
                balance:{increment:amount}
            },
            select:{
                balance:true
            }
        });
        if(result){
            return NextResponse.json({status:"success",toppedup:true,balance:result.balance});
        }
        return NextResponse.json({status: "fail",toppedup:false});
    }catch(error){console.log(error);}
}