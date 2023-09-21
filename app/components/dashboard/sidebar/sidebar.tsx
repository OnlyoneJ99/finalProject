import { IoReloadCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export default function  Sidebar({showTopupInput}:{showTopupInput:()=>void}){
    return(
        <div className="hidden md:block border-r h-full md:sticky w-[12rem] top-0 left-0 ">
            <div className="w-full flex hover:bg-blue-400/20 cursor-pointer mt-10 duration-300">
                <div className="flex ml-6 gap-x-2 w-fit py-3 ">
                    <RxDashboard className="text-slate-500" size={25} />
                    <span className="text-[14px] text-slate-600">Dashboard</span>
                </div>
            </div>
            <div onClick={showTopupInput} className="w-full flex hover:bg-blue-400/20 cursor-pointer mt-4 duration-300">
                <div className="flex ml-6 w-fit gap-x-2 py-3 ">
                    <IoReloadCircleOutline className="text-slate-500" size={25}/>
                    <span className="text-[14px] text-slate-600">Top up Account</span>
                </div>
            </div>
        </div>
    )
}