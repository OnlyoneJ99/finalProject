'use client'
import { CiCreditCard2 } from "react-icons/ci";
import { DonutChart} from "@tremor/react";
import SummaryCard from "@/app/components/summarycard/summarycard";
import CardWrapper from "@/app/components/dashboard/cardwrapper/cardwrapper";
import Sidebar from "@/app/components/dashboard/sidebar/sidebar";
import Table from "@/app/components/table/table";
import MoneyCard from "../moneycard/moneycard";
import TextInput from "../../textinput/textinput";
import React, { useRef, useState } from "react";
import Button from "../../button/button";
import { useSession } from "next-auth/react";

interface GeneralData{
    date:string,
    amount:number,
    status:string,
    id:string
}
interface TransferData extends GeneralData{
    recipient_name:string,
}
interface ReceptionData extends GeneralData{
    sender_name:string,
}

interface DashBoardDataProps{
    transfersbycountries:{name:string,transfers:number}[]
    transferdata:TransferData[]
    receptiondata:ReceptionData[],
    balance:number,
    totalamountreceived:number,
    totalamountsent:number,
    numberofreceptions:number,
    numberoftransfers:number
}
interface CurrentUser{
    username:string,
    id:string,
    firstname:string
    ,lastname:string
  };
export default function DashBoardData({totalamountreceived,numberofreceptions,numberoftransfers,totalamountsent,transfersbycountries,receptiondata,transferdata,balance}:DashBoardDataProps){
    console.log(balance)
    const [visible,setVisible] = useState(false);
    const [totalbalance,setTotalBalance] = useState(()=>balance);
    console.log(totalbalance)
    const topupvalue = useRef(0);
    const topupinputoverlay = useRef(null);
    const{data} = useSession();
    const currentuser = data?.user as CurrentUser;

    function showTopupInput(){
        setVisible(true);
    }
    function closeTopupInput(e:React.MouseEvent){
        if(e.target === topupinputoverlay.current)
            setVisible(false)
    }
    async function getTopupAmount(e:React.ChangeEvent<HTMLInputElement>){
        const value = parseFloat(e.target.value);
        topupvalue.current = value;
    }
    async function setBalance(){
        const response = await fetch("/api/topup",{method:"POST",body:JSON.stringify({amount:topupvalue.current,userId:currentuser.id})});
        const data = await response.json();
        if(data.status === "success" && data.toppedup){
            setTotalBalance(data.balance);
        }   
    }
    return(
        <div className="h-full relative">
            <div className="w-full flex h-full bg-blue-100/20">
                <Sidebar showTopupInput={showTopupInput} />
                <div className="grow">
                    <div className="w-[95%] mx-auto grid gap-x-4 grid-rows-5 md:grid-rows-3 md:grid-cols-2 gap-y-4 lg:grid-rows-2 lg:grid-cols-3 mt-8">
                        <SummaryCard
                            numberofreceptions={numberofreceptions}
                            numberoftransfers={numberoftransfers}                         
                        />
                        <CardWrapper>
                            <div className="py-6">
                                <h3 className="text-[14px] text-slate-500">Transfers by country</h3>
                                <div>
                                    <DonutChart 
                                        data={transfersbycountries} 
                                        colors={["sky","amber"]}
                                        index="name"
                                        variant="donut"
                                        category="transfers"
                                        className="text-slate-700 mt-6 border-white" 
                                    />
                                </div>
                            </div>
                        </CardWrapper>
                        <CardWrapper className="px-0">
                            <div className="w-full h-full bg-blue-600">
                                <div className="w-[95%] mx-auto h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-center py-6">
                                        <h3 className="text-[14px]">Total balance</h3>
                                        <h3>{totalbalance}Ghs</h3>
                                    </div>
                                    <div className="flex gap-x-3 mb-2">
                                        <CiCreditCard2 className="border rounded-sm border-white " size={40} />
                                        <span className="border rounded-sm border-white text-[20px] px-3 flex justify-center items-center">+</span>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                        
                        <MoneyCard label="Total money sent" amount={totalamountsent} />
                        <MoneyCard label="Total money Received" amount={totalamountreceived} />
                        <div ref={topupinputoverlay} onClick={closeTopupInput} className={`${visible? 'flex':'hidden'} absolute top-0 left-0 h-full w-full justify-center bg-slate-500/80`}>
                            <div className="max-w-[90%] h-fit w-[30rem] mt-20">
                                <TextInput onChange={getTopupAmount}  className="w-full text-white text-[18px]" isSignup={false} label="" placeholder="Enter amount to top up with" type="number"/>
                                <Button onClick={(e)=>{setVisible(false) ,setBalance()}} className="bg-blue-500 mt-4 w-full text-center">top up</Button>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[95%] mx-auto h-full">
                        <div id="table-ctn" className="grid gap-y-5 lg:gap-y-0 lg:grid-cols-2 gap-x-10 ">
                            <Table className="col-span-1" heading="Recent Tranfers" data={transferdata} />
                            <Table heading="Recent Receptions" data={receptiondata} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}