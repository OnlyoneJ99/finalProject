export default function AuthLayout({children}:{children:React.ReactNode}){
    return(
        <main className="h-full flex justify-center items-center">
            <div className="h-full pt-3 w-full max-w-[27rem] mx-auto flex flex-col">
                {children}
            </div>
        </main>
    )
}
//md:shadow-zinc-900/800 sm:shadow-lg sm:shadow-slate-500/30