import { IconType } from "react-icons"
import Button from "../button/button"

interface ProfileMenuItemProps{
    onclick?:()=>void,
    Icon:IconType,
    label:string
}

export default function ProfileMenuItem({onclick,Icon,label}:ProfileMenuItemProps){
    return(
        <Button onClick={onclick} className="py-2 hover:bg-blue-300/30 rounded-md w-full flex">
            <Icon className="ml-2 mr-8 text-slate-500" size={25} />
            <span className="text-start grow text-[14px]">{label}</span>
        </Button>
    )
}