'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface User{
    username: string;
}
const DashBoard = ()=>{
    useSession({required: true,
        onUnauthenticated(){
            redirect("/login");
        }
    });
    return(
        <div>
            <div></div>
        </div>
    )
}
export default DashBoard;