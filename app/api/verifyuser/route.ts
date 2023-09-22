import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {recipientphonenumber} = await req.json();
    console.log(recipientphonenumber)
    try{
        const userexists = await prisma.user.findUnique({
            where:{
                phonenumber:recipientphonenumber
            },
        });
        if(userexists){
            return NextResponse.json({userexists: true});
        }
        return NextResponse.json({userexists: false});
    }catch(error){console.log(error);}
}