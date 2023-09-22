import {BiCard} from "react-icons/bi";
import {BiTransferAlt} from "react-icons/bi";
import CardWrapper from "../dashboard/cardwrapper/cardwrapper";
import { ProgressBar } from "@tremor/react";

interface SummaryCardProps{
    numberoftransfers:number,
    numberofreceptions:number,
}
export default function SummaryCard({numberofreceptions,numberoftransfers}:SummaryCardProps){
    return(
        <CardWrapper>
            <div className="w-[90%] mx-auto text-slate-600 py-6 text-[14px] flex flex-col gap-y-12">
                <h3 className="text-slate-500">Summary</h3>
                <div className="flex flex-col gap-y-6">
                    <div className="flex gap-x-2 items-center">
                        <div className="bg-blue-300/40 rounded-full h-[50px] w-[50px] flex justify-center items-center">
                            <BiTransferAlt size={35} className="text-blue-400" />
                        </div>
                        <div className="grow">
                            <div  className="grow flex justify-between">
                                <h4 className="text-[13px]">Transfers</h4>
                                <div id="totalamount">{100}</div>
                            </div>
                            <ProgressBar tooltip={`transfers: ${numberoftransfers}`} value={numberoftransfers} />
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="bg-orange-300/40 rounded-full h-[45px] w-[45px] flex justify-center items-center">
                            <BiCard size={35} className="text-orange-300/80" />
                        </div>
                        <div className="grow">
                            <div className="grow flex justify-between">
                                <h4 className="text-[13px]">Receptions</h4>
                                <div>{100}</div>
                            </div>
                            <ProgressBar tooltip={`receptions: ${numberofreceptions}`} value={numberofreceptions} color="orange" />
                        </div>
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}