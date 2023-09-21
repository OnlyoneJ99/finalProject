"use client"
import React from "react";
import { FC, useId } from "react";
import { twMerge } from "tailwind-merge";

interface ITextInput extends React.HTMLAttributes<HTMLInputElement>{
    type:"text"|"password"|"tel"|"number",
    label:string,
    isSignup:boolean,
    placeholder?:string,
    errorMessage?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    required?:boolean
    passwordpattern?:string
}

const TextInput:FC<ITextInput> = ({required=false,passwordpattern,errorMessage,type,label,isSignup,className,placeholder,onChange})=>{
    const id = useId();
    console.log(passwordpattern)
    return(
        <div className={twMerge("flex flex-col w-full",className)}>
            <label className={`text-gray-600 text-[14px] ${isSignup?`after:content-['*'] after:text-red-600 after:ml-[2px]`:``} `} htmlFor={id}>{label}</label>
            <input placeholder={placeholder} 
            onChange={onChange}
            className="
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
                required={required}
                pattern={passwordpattern}
            />
            {errorMessage !== "" && <span className="text-red-500">{errorMessage}</span>}
        </div>
    )
}
export default TextInput;