"use server"

import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";

const saltround=10;
export async function register(formdata:FormData){
    "use server"
    const username = formdata.get("username");
    const password = formdata.get("password");
    let phonenumber = formdata.get("phonenumber");
    const firstname = formdata.get("firstname");
    const lastname = formdata.get("lastname");
    console.log(username, password, phonenumber, firstname, lastname);
    const existinguser = await prisma.users.findUnique({where: {username: username as string}});
    if(existinguser) {
        return;
    }
    const hashedpassword = await hash(password as string,saltround);
    phonenumber = phonenumber as string;
    const user = await prisma.users.create({
        data:{
            username: username as string,
            password: hashedpassword,
            phonenumber: phonenumber.replaceAll(" ","").replace("+",""),
            firstname: firstname as string,
            lastname: lastname as string
        }
    });
}