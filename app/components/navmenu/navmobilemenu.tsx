import Link from "next/link"

export default function NavMobileMenu({visible}:{visible:boolean}){
    
    return(
        <div id="menu" role="menu" className={`
            flex justify-evenly gap-x-3
            absolute right-2 shadow-lg rounded-[5px]
            shadow-slate-400/30 pt-6 pb-2 px-3
            mt-5 max-w-[20rem] w-[90%] z-10 bg-white
            tranform transition duration-300
            scale-0 opacity-0 ${visible && `scale-100 opacity-100`}`}
        >
            
            <Link href="/login" className=" 
                px-5 py-2 w-1/2 bg-blue-600/80 border-2 text-white
                rounded-[4px] text-[14px] hover:text-slate-600
                hover:outline-blue-500 hover:outline-2 hover:outline
                text-center hover:bg-blue-500/40 hover:-outline-offset-2 duration-300"
                role="menuitem">
                Login
            </Link>
            <Link href="/signup" className="
                px-5 py-2 border text-center
                rounded-[4px] border-gray-400/80
                text-[14px] hover:bg-blue-500/40 hover:-outline-offset-2
                hover:outline-blue-500 hover:outline-2 hover:outline
                hover:text-slate-600 w-1/2 duration-300" 
                role="menuitem">
                Signup
            </Link>
        </div>
    )
    
}