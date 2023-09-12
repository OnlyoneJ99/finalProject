import Link from "next/link";
import Button from "../button/button";

export default function NavLargeMenu(){
    return(
        <div className="justify-evenly hidden sm:flex gap-x-3">
            <Link href="/signup">
              <Button className="duration-200 text-gray-500 py-2 border-0 px-8 hover:text-blue-600 transition">Sign up</Button>
            </Link>
            <Link href="/login">              
              <Button className="rounded-md bg-blue-700/80 border-2 py-2 px-8 transition hover:bg-blue-400/40 hover:text-gray-500 border-blue-400 text-white">Sign in</Button>
            </Link>
        </div>
    )
}