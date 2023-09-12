

export default function FormHeader({title}:{title:string}){
    return(
        <div className="text-slate-600 text-center mb-3 grow flex flex-col justify-center">
            <h2 className="text-[1.2rem] text-slate-500 font-medium mb-1">Welcome Back</h2>
            <h3 className="text-[14px]">{title}</h3>
        </div>
    )
}