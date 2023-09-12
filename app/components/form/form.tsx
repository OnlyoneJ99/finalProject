"use client"
import React from "react";
import { twMerge } from "tailwind-merge";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>{
    onsubmit?:(e:React.FormEvent<HTMLFormElement>)=>void;
    children:React.ReactNode,
    className?:string
}
export default function Form({action,onsubmit,className,children}:FormProps){
    return(
        <div className="flex grow-[2]">
            <form action={action} onSubmit={onsubmit} className={twMerge("flex flex-col gap-y-6 mx-auto items-center",className)}>
                {children}
            </form>
        </div>
    )
}