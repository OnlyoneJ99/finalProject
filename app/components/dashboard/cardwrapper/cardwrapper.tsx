import { twMerge } from "tailwind-merge"

export default function CardWrapper({children,className}:{children:React.ReactNode,className?:string}){
    return(
        <div className={twMerge("px-6 bg-white shadow-sm shadow-slate-400/40",className)}>
            {children}
        </div>
    )
}