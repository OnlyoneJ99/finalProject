import Link from "next/link";
import Image from "next/image";
import Logo from "../logo/logo";

export default function Header(){
    return (
        <header>
            <Link href="/" className="flex gap-x-2">
             <Logo height={70} width={70}/>
              <h1 className="text-[1.3rem] font-extraboldtext-slate-500">
                Jeff
                <span className="
                  font-normal text-gray-500
                  after:content-['TM'] after:align-super
                  after:text-slate-600 after:text-[8px] 
                  after:font-bold">
                  Pay</span>
              </h1>
            </Link>
          </header>
    )
}