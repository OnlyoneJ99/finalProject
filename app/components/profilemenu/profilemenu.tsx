import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import {LuSettings2} from "react-icons/lu";
import Button from "../button/button";
import { signOut } from "next-auth/react";
import ProfileMenuItem from "../profilemenuitem/profilemenuitem";
import Link from "next/link";

interface ProfileMenuProps{
    visible:boolean,
    username:string
}
export default function ProfileMenu({visible,username}:ProfileMenuProps){
    function signout(){
        console.log("signout")
        signOut({callbackUrl:"/"});
    }
    return(
        <div className={`absolute opacity-0 scale-0 transition duration-300 ${visible && `opacity-100 scale-100`}  top-full py-3 w-full bg-white shadow-sm shadow-slate-600/30`}>
            <div className="w-[80%] flex flex-col gap-y-1 mx-auto">
                <Link href="/dashboard"><ProfileMenuItem Icon={FaUserCircle} label={username} /></Link>
                <ProfileMenuItem onclick={()=>{}} Icon={LuSettings2} label="settings" />
                <ProfileMenuItem onclick={signout} Icon={IoLogOutOutline} label="signout" />
            </div>
        </div>
    )
}