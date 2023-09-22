'use client'

import { twMerge } from "tailwind-merge"
import {CiCalendarDate} from "react-icons/ci";

interface IData{
    date:string,
    amount:number,
    status:string
    id: string,
    recipient_name?:string,
    sender_name?:string,
}

interface TableProps{
    data:IData[],
    heading:string,
    className?:string
}
export default function Table({data,heading,className}:TableProps){

    return(
        <div className={twMerge("px-6 shadow-md shadow-slate-400/20 py-6 bg-white mt-8",className)}>
            <h2 className="text-slate-500 mb-6">{heading}</h2>
            <table className="text-slate-500 text-[14px] w-full">
                <thead>
                    <tr className="bg-blue-300/20 rounded-md text-left">
                        <th className="pl-5 py-2 font-normal">Customer</th>
                        <th className="pl-5 py-2 font-normal">Date</th>
                        <th className="pl-5 py-2 font-normal">Amount</th>
                        <th className="pl-5 py-2 font-normal">Status</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        data!.map(data=>(
                            <tr key={data.id} className="text-left py-4">
                                <td className="pl-5 py-3">{(data.recipient_name !== "" && data.recipient_name) || (data.sender_name !== "" && data.sender_name)}</td>
                                <td className="pl-5 py-3 flex items-center gap-x-2 justify-start"><CiCalendarDate className="text-blue-500" size={25}/> {data.date}</td>
                                <td className="pl-5 py-3">{data.amount}</td>
                                <td className="pl-5 py-3 ">{data.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}