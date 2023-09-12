"use client"
import { twMerge } from "tailwind-merge"

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode,
    authbutton?:boolean
}
const authproviderbuttonstyles = "text-slate-600 border border-slate-400 py-2 text-[14px] hover:text-white hover:bg-slate-700";
function Button({children,className,authbutton,...attributes}:IButton){
    return(
        <button {...attributes} className={twMerge("focus-visible:outline-2 py-3 duration-300 focus-visible:outline-offset-[3px] focus-visible:outline-blue-400 rounded-[5px]",authbutton && authproviderbuttonstyles,className)}>
            {children}
        </button>
    )
}
export default Button;