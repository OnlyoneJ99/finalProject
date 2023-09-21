import { PiMoneyLight } from "react-icons/pi";
import CardWrapper from "@/app/components/dashboard/cardwrapper/cardwrapper";
export default function MoneyCard({label,amount}:{label:string,amount:number}){
    return(
        <CardWrapper>
            <div className="flex flex-col text-slate-500 h-full">
                <div className="flex justify-between items-center py-6 border-b border-b-slate-400/30">
                    <PiMoneyLight size={40} />
                    <h3 className="text-[14px]">{label}</h3>
                </div>
                <div className="grow-[2] text-[1.8rem] flex justify-center items-center">{amount}GHS</div>
            </div>
        </CardWrapper>
    )
}