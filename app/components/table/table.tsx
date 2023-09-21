'use client'

import { twMerge } from "tailwind-merge"
import {CiCalendarDate} from "react-icons/ci";
interface TransferData{
    transferID: string,
    customername:string,
    date:string,
    amount:number,
    status:string
}
interface TableProps{
    transferdata:TransferData[],
    heading:string,
    className?:string
}
export default function Table({transferdata,heading,className}:TableProps){
    const tdata = [
        {
            transferID:123,
            customername:"steve ansah",
            date:"12 JAN 2023",
            amount:"100Ghs",
            status:"success"
        },
        {
            transferID:123,
            customername:"chris bosh",
            date:"2 DEC 2022",
            amount:"400Ghs",
            status:"success"
        },
        {
            transferID:123,
            customername:"mark stun",
            date:"15 SEP 2017",
            amount:"2000Ghs",
            status:"failure"
        }

    ]
    return(
        <div className={twMerge("px-6 shadow-md shadow-slate-400/20 py-6 bg-white mt-8",className)}>
            <h2 className="text-slate-500 mb-6">{heading}</h2>
            <table className="text-slate-500 text-[14px] w-full">
                <thead>
                    <tr className="bg-blue-300/20 rounded-md text-left">
                        <th className="pl-5 py-2 font-normal">ID</th>
                        <th className="pl-5 py-2 font-normal">Customer</th>
                        <th className="pl-5 py-2 font-normal">Date</th>
                        <th className="pl-5 py-2 font-normal">Amount</th>
                        <th className="pl-5 py-2 font-normal">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tdata.map(data=>(
                            <tr className="text-left py-4">
                                <td className="pl-5 py-3">{data.transferID}</td>
                                <td className="pl-5 py-3">{data.customername}</td>
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