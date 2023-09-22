"use server"

import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";

const saltround=10;

export async function registerUser(formdata:FormData){
    "use server"
    const username = formdata.get("username") as string;
    const password = formdata.get("password") as string;
    const phonenumber = formdata.get("phonenumber") as string;
    const country = formdata.get("country") as string;
    const firstname = formdata.get("firstname") as string;
    const lastname = formdata.get("lastname") as string;

    const existinguser = await prisma.user.findUnique(
    {
        where:{
            username,
        },
    });
    if(existinguser) {
        return {registered:false,message:"User already exists"};
    }
    const hashedpassword = await hash(password as string,saltround);
    await prisma.user.create({
        data:{
            username,
            password:hashedpassword,
            phonenumber: phonenumber.replaceAll(" ","").replace("+",""),
            firstname,
            lastname,
            country,
            balance:1.0,
        }
    });
    return {registered:true,message:"registration successful"};
}