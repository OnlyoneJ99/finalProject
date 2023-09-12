"use client"
import { FC, useId } from "react";

interface ITextInput{
    type:"text"|"password"|"tel",
    label:string,
    isSignup:boolean
}
const TextInput:FC<ITextInput> = ({type,label,isSignup})=>{
    const id = useId();
    return(
        <div className="flex flex-col w-full">
            <label className={`text-gray-600 text-[14px] ${isSignup?`after:content-['*'] after:text-red-600 after:ml-[2px]`:``} `} htmlFor={id}>{label}</label>
            <input placeholder={label} className="
                py-[8px] pl-3 w-full
                focus:outline
                focus:outline-blue-400
                focus:-outline-offset-2
                focus:outline-2
                border border-gray-300
                rounded-[5px]
                text-[14px]
              text-gray-700
                duration-200
                " 
                id={id} type={type}
                autoComplete="off"
                name={label.replaceAll(" ","")}
            />
        </div>
    )
}
export default TextInput;