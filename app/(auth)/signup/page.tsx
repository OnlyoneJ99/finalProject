import SignupForm from "@/app/components/signupform/signupform";
import { prisma } from "@/app/lib/prisma";
import { hash } from "bcrypt";

const saltround = 10;
export default function Signup(){
    return(
        <>
            <SignupForm/>
        </>
    )
}