"use client"
import { signIn } from "next-auth/react";
import { FC} from "react";
import { IconType } from "react-icons";

interface IAuthButton{
    buttonlabel:string,
    Icon:IconType,
    authprovider:"google"|"github"|"facebook",

}
const AuthButton:FC<IAuthButton> = ({Icon,buttonlabel,authprovider})=>{
    function handleclick(){
        signIn(authprovider)
    }
    return(
        <button  type="button" className="
          w-full flex
          focus-visible:outline-blue-400
          items-center justify-center
          border-slate-500 border
          text-slate-700 hover:text-white
          hover:bg-slate-700 py-[8px] rounded-[4px]
        "
        onClick={handleclick}
        >
            <span className=""><Icon size={24}/></span>
            <span className="text-[14px] ml-4">{buttonlabel}</span>
        </button>
    )

}
export default AuthButton