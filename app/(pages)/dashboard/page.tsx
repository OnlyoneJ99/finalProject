"use client"
import DashBoardData from "@/app/components/dashboard/dashboarddata/dashboarddata";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


interface TransferData{
    transferID: string,
    customername:string,
    date:string,
    amount:number,
    status:string
}

const transfersbycountries = [
    {
        name:"Ghana",
        transfers:10
    },
    {
        name:"Kenya",
        transfers:50
    }
];

const DashBoard = ()=>{
    const[transferdata,setTransferData] = useState<TransferData[]>([]);
    useSession({required: true,
        onUnauthenticated(){
            redirect("/login");
        }
    });
    
    useEffect(()=>{
        async function fetchTransfers()
        {
            let response = await fetch("/recenttransfers");
            const data = await response.json();
        }
        fetchTransfers();
    },[]);
    return(
        <>
            <DashBoardData transferdata={transferdata} transfersbycountries={transfersbycountries} />
        </>
    )
}
export default DashBoard;