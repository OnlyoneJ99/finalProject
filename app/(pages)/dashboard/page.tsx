"use client"
import DashBoardData from "@/app/components/dashboard/dashboarddata/dashboarddata";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface GeneralData{
    date:string,
    amount:number,
    status:string,
    id:string
}
interface TransferData extends GeneralData{
    recipient_name:string,
    senderId:string
}
interface ReceptionData extends GeneralData{
    sender_name:string,
    recipientId:string
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

interface CurrentUser{
    username:string,
    id:string,
    firstname:string,
    lastname:string
  };
type Country = "Ghana" | "USA";
const DashBoard = ()=>{
    const [transferdata,setTransferData] = useState<TransferData[]>([]);
    const [receptiondata,setReceptionData] = useState<ReceptionData[]>([]);
    const [totalamount,setTotalAmount] = useState({sent:0,received:0});
    const [balance,setBalance] = useState(0);
    const [country,setCountry] = useState<Country>("Ghana")

    const {data,status} = useSession({required: true,
        onUnauthenticated(){
            redirect("/login");
        }
    });
    const currentuser = data?.user as CurrentUser;
    useEffect(()=>{
        async function fetchTransfers()
        {
            let response = await fetch("/api/userdata",{method:"POST",body:JSON.stringify({userid:currentuser.id})});
            let {totalamountreceived_,totalamountsent_,balance,transfers,receptions,country} = await response.json();
            let recentreceptionsdata = receptions as ReceptionData[];
            let recenttransfersdata  = transfers as TransferData[]; 
            setReceptionData(recentreceptionsdata);
            setTransferData(recenttransfersdata);
            setBalance(balance);
            setTotalAmount({sent:totalamountsent_,received:totalamountreceived_});
            setCountry(country);
        }
        if(status === "authenticated")
            fetchTransfers();
    },[status]);
    return(
        <>
            <DashBoardData
             transferdata={transferdata}
             receptiondata={receptiondata}
             totalamountreceived={totalamount.received}
             totalamountsent={totalamount.sent}
             transfersbycountries={transfersbycountries}
             balance={balance}
             numberofreceptions={receptiondata.length}
             numberoftransfers={transferdata.length}
             country={country}
             setBalance={setBalance}
            />
        </>
    )
}
export default DashBoard;