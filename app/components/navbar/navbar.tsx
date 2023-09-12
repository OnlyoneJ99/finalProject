'use client'
import {RxHamburgerMenu,RxCross1,} from "react-icons/rx";
import {useState } from "react";
import {LiaUserCircle} from "react-icons/lia";
import {PiCaretDownLight} from "react-icons/pi";
import NavMobileMenu from "../../components/navmenu/navmobilemenu";
import NavLargeMenu from "../../components/navmenu/navlargemenu";
import Header from "../header/header";
import Button from "../button/button";
import ProfileMenu from "../profilemenu/profilemenu";
import { useSession } from "next-auth/react";

export default function NavBar(){
    const [visible,setVisible] = useState(false);
    const {data} = useSession();
    
    const user = data?.user as {username:string}; 
    function showMenu(){
        setVisible(!visible);
    }
    function toggleMenu(){
      if(user && user.username !== "")
        return(
          <div className="flex items-center max-w-[15rem] w-[100%] z-50">
            <div className="relative w-full flex justify-end">
              <button className="flex items-center" onClick={showMenu}>
                <i><LiaUserCircle className="text-slate-500" size={30}/></i>
                <i><PiCaretDownLight size={13} className={`${visible && `rotate-180`} transition-transform duration-300 text-gray-600`} /></i>
              </button>
              <ProfileMenu username={user.username} visible={visible}/>
            </div>
          </div>
        );
      return(
        <>
          <div className="sm:hidden">
            <Button id="menu-btn" onClick={showMenu} aria-expanded={`${visible?`true`:`false`}`} aria-controls="menu" aria-haspopup="menu" className=" bg-blue-600/70 rounded-[4px] px-1 flex items-center justify-center py-1">
              {visible ? <RxCross1 size={25} color="white"/> :<RxHamburgerMenu size={25} color="white"/>}
            </Button>
            <NavMobileMenu visible={visible}/>
          </div>
          <NavLargeMenu />
         </>
      )
    }
    return(
        <nav className="text-gray-600 w-full shadow-sm shadow-slate-200">
        <div className="w-[90%] mx-auto flex justify-between py-3">
          <Header />
          {toggleMenu()}
        </div>
      </nav>
    )
}