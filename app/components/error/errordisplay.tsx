export default function ErrorDisplay({message}:{message:string}){
    return (
        <div className="
            w-full py-2 rounded-[5px] 
            text-[14px] text-slate-600
           bg-red-300/30 border border-red-400
             text-center 
        ">
            {message}
        </div>
    )
}