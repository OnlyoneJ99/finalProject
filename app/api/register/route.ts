import { prisma } from "@/app/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

const saltround = 10;
export async function POST(request:Request){
    const formdata = await request.formData();
    const username  = formdata.get("username") as string;
    const password = formdata.get("password") as string;
    const phonenumber = formdata.get("phone") as string;
    const hashedpassword = await hash(password,saltround);
    const firstname = formdata.get("firstname") as string;
    const lastname = formdata.get("lastname") as string;
   
    const user = await prisma.users.create({
        data:{
            username,
            password:hashedpassword,
            phonenumber,
            firstname,
            lastname
        }
    });
    console.log(user)
    return NextResponse.json({message:"You have successfully created an account",status:"success"});
}