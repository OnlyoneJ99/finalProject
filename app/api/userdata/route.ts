import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {userid} = await req.json();
    try{
        const totalamountsentPromise = prisma.transfer.findMany({
            where:{
                senderId:userid
            },
            select:{
                amount:true,
            }
        });
        const totalamountreceivedPromise = prisma.reception.findMany({
            where:{
                recipientId:userid
            },
            select:{
                amount:true,
            }
        });
        const balancePromise = prisma.user.findUnique({
            where:{
                id:userid
            },
            select:{
                balance:true,
            }
        });
        const transfersPromise = await prisma.transfer.findMany({
            where:{
                senderId:userid
            },
            select:{
                amount:true,
                date:true,
                recipient_name:true,
                id:true,
                status:true,
            }
        });
        const country = await prisma.user.findUnique({
            where:{
                id:userid,
            },
            select:{
                country:true,
            }
        })
        const receptionsPromise = await prisma.reception.findMany({
            where:{
                recipientId:userid
            },
            select:{
                amount:true,
                date:true,
                sender_name:true,
                id:true,
                status:true,
            }
        });
        const [totalamountreceived,totalamountsent,balance,transfers,receptions] = await Promise.all([totalamountreceivedPromise,totalamountsentPromise,balancePromise,transfersPromise,receptionsPromise]);
        const totalamountsent_ = totalamountsent.reduce(function(prev,currentvalue){
            return prev + currentvalue.amount;
        },0)
        const totalamountreceived_ = totalamountreceived.reduce(function(prev,currentvalue){
            return prev + currentvalue.amount;
        },0)
        console.log(totalamountreceived_,totalamountsent_)
        return NextResponse.json({totalamountreceived_,totalamountsent_,...balance,transfers,receptions,...country});
    }catch(error){console.log(error);}
}