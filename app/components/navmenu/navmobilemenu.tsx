import Link from "next/link"

export default function NavMobileMenu({visible}:{visible:boolean}){
    
    return(
        <div id="menu" role="menu" className={`
            flex justify-evenly gap-x-3
            absolute right-2 shadow-lg rounded-[5px]
          shadow-slate-400/30 pt-6 pb-2 px-3
            mt-5 max-w-[20rem] w-[90%] z-10 bg-white
            tranform transition duration-300
            scale-0 opacity-0 pointer-events-none
            ${visible && `scale-100 opacity-100`}`}
        >
            <Link href="/login" className="
                px-5 py-2 border
                rounded-[4px] border-gray-400/80
                text-[14px] hover:bg-blue-700
                hover:text-white w-1/2 text-center" 
                role="menuitem">
                Login
            </Link>
            <Link href="/signup" className=" 
                px-5 py-2 border-none w-1/2
                bg-blue-500 text-white
                rounded-[4px] text-[14px]
                text-center hover:bg-blue-700"
                role="menuitem">
                Signup
            </Link>
        </div>
    )
    
}