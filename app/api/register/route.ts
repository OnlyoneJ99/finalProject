import { prisma } from "@/app/lib/prisma";
import { hash } from "bcrypt";

const saltround = 10;
export async function POST(request:Request, response:Response){
    const formdata = await request.formData();
    const username  = formdata.get("username") as string;
    const password = formdata.get("password") as string;
    const phonenumber = formdata.get("phone") as string;
    const hashedpassword = await hash(password,saltround);
   
    const user = await prisma.users.create({
        data:{
            username,
            password:hashedpassword,
            phonenumber
        }
    });
    console.log(user)
    // response.json({message:"You have successfully created an account",status:"success"});
}