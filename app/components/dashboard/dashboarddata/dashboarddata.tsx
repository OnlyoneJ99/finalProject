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

interface TransferData{
    transferID: string,
    customername:string,
    date:string,
    amount:number,
    status:string
}

interface DashBoardDataProps{
    transfersbycountries:{name:string,transfers:number}[]
    transferdata:TransferData[]
}
export default function DashBoardData({transfersbycountries,transferdata}:DashBoardDataProps){
    const [visible,setVisible] = useState(false);
    const [totalamount,setTotalAmount] = useState(0);
    const topupvalue = useRef(0);
    const topupinputoverlay = useRef(null);
    function showTopupInput(){
        setVisible(true);
    }
    function closeTopupInput(e:React.MouseEvent){
        if(e.target === topupinputoverlay.current)
            setVisible(false)
    }
    function getTopup(e:React.ChangeEvent<HTMLInputElement>){
        const value = parseFloat(e.target.value);
        topupvalue.current = value
    }
    function setBalance(){
        setTotalAmount(topupvalue.current)
    }
    return(
        <div className="h-full relative">
            <div className="w-full flex h-full bg-blue-100/20">
                <Sidebar showTopupInput={showTopupInput} />
                <div className="grow">
                    <div className="w-[95%] mx-auto grid gap-x-4 grid-rows-5 md:grid-rows-2 md:grid-cols-2 gap-y-4 lg:grid-cols-3 mt-8">
                        <SummaryCard />
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
                                        <h3 className="text-[14px]">Total balance in your account</h3>
                                        <h3>{totalamount}Ghs</h3>
                                    </div>
                                    <div className="flex gap-x-3 mb-2">
                                        <CiCreditCard2 className="border rounded-sm border-white " size={40} />
                                        <span className="border rounded-sm border-white text-[20px] px-3 flex justify-center items-center">+</span>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                        
                        <MoneyCard label="Total Amount of money sent" amount={800} />
                        <MoneyCard label="Total Amount of money Received" amount={500} />
                        <div ref={topupinputoverlay} onClick={closeTopupInput} className={`${visible? 'flex':'hidden'} absolute top-0 left-0 h-full w-full justify-center bg-slate-500/80`}>
                            <div className="max-w-[90%] h-fit w-[30rem] mt-20">
                                <TextInput onChange={getTopup}  className="w-full text-white text-[18px]" isSignup={false} label="" placeholder="Enter amount to top up with" type="number"/>
                                <Button onClick={(e)=>{setVisible(false) ,setBalance()}} className="bg-blue-500 mt-4 w-full text-center">top up</Button>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[95%] mx-auto h-full">
                        <div id="table-ctn" className="grid gap-y-5 lg:gap-y-0 lg:grid-cols-2 gap-x-10 ">
                            <Table className="col-span-1" heading="Recent Tranfers" transferdata={transferdata} />
                            <Table heading="Recent Receptions" transferdata={transferdata} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}