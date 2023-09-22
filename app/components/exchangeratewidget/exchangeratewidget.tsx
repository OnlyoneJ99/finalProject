'use client'
import {useState } from "react";
import ExchangeRateDisplay from "../exchangeratedisplay/exhangeratedisplay";
import CurrencyInput from "../currencyinput/currencyinput";
import Button from "../button/button";
import {fetchExchangeRate } from "@/app/utils/fetch";
import TelephoneInput from "../telephoneInput/telephoneinput";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import ErrorDisplay from "../error/errordisplay";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner";

const INIT_VALUE = 100;
enum transfermethods {MOBILE_MONEY="mobile_money",BANK_TRANSFER="bank_transfer"};

interface CurrentUser{
  username:string,
  id:string,
  firstname:string
  ,lastname:string
};
const currency_codes = ["USD","GHS",];

export default function ExchangeRateWidget({initexchangerate}:{initexchangerate:number}){
    const[currencies,setCurrencies] = useState({from:"USD",to:"GHS"});
    const[transfermethod,setTransferMethod] = useState(transfermethods.BANK_TRANSFER)
    const[loading,setLoading] = useState(false);
    const [transferloading,setTransferloading] = useState(false);
    const[exchangerate,setExchangeRate] = useState(initexchangerate);
    const[convertedAmount,setConvertedAmount] = useState({from:INIT_VALUE,to:initexchangerate * INIT_VALUE});
    const[recipientphonenumber,setRecipientPhoneNumber] = useState("");
    const[errorMessage,setErrorMessage] = useState("");
    const{data,status} = useSession();
    const router = useRouter();
    const currentuser = data?.user as CurrentUser;

    async function selectBaseCurrencyAndFetchExchangeRate(e:React.ChangeEvent<HTMLSelectElement>){
      const selectedcurrency = e.target.value;
      setCurrencies({...currencies,from:selectedcurrency});
      setLoading(true);
      const exchangerate = await fetchExchangeRate(selectedcurrency,currencies.to);
      setLoading(false);
      setExchangeRate(exchangerate);
      const convertedamount = parseFloat((convertedAmount.from * exchangerate).toFixed(4));
      setConvertedAmount({...convertedAmount,to:convertedamount});
      
    }
    async function selectSecondaryCurrencyAndFetchExchangeRate(e:React.ChangeEvent<HTMLSelectElement>){
      const selectedcurrency = e.target.value;
      setCurrencies({...currencies,to:selectedcurrency});
      setLoading(true);
      const exchangerate = await fetchExchangeRate(currencies.from,selectedcurrency);
      setLoading(false);
      setExchangeRate(exchangerate);
      const convertedamount = parseFloat((convertedAmount.to / exchangerate).toFixed(4));
      setConvertedAmount({...convertedAmount,from:convertedamount});
    }
    function convertBaseCurrencyToSecondaryCurrency(e:React.ChangeEvent<HTMLInputElement>){    
        if(e.target.value !== ""){
          const basecurrencyvalue = parseFloat(e.target.value);
          const convertedamount = parseFloat((basecurrencyvalue * exchangerate).toFixed(4));
          setConvertedAmount({from:basecurrencyvalue,to:convertedamount});
        }else{
          setConvertedAmount({...convertedAmount,from:parseFloat(e.target.value)});
        }
    }
    function convertSecondaryCurrencyToBaseCurrency(e:React.ChangeEvent<HTMLInputElement>){   
        if(e.target.value !== ""){
          const secondarycurrencyvalue = parseFloat(e.target.value);
          const convertedamount = parseFloat((secondarycurrencyvalue / exchangerate).toFixed(4));
          setConvertedAmount({from:convertedamount,to:secondarycurrencyvalue});
        }else{
          setConvertedAmount({...convertedAmount,to:parseFloat(e.target.value)});
        }
    }
    async function selectTransferMethod(e:React.ChangeEvent<HTMLSelectElement>){
      const transfermethod = e.target.value;
      console.log(transfermethod);
      if(transfermethod === transfermethods.BANK_TRANSFER){
        setTransferMethod(transfermethods.BANK_TRANSFER)
      }
      else if(transfermethod === transfermethods.MOBILE_MONEY){
        setTransferMethod(transfermethods.MOBILE_MONEY);
      }
    }
    async function completeMoneyTransfer(){
      if(recipientphonenumber !== "" && errorMessage === ""){
        if(status === "authenticated"){
            setTransferloading(true)
            try{
              const response = await fetch("/api/verifyuser",{method:"POST",body:JSON.stringify({recipientphonenumber})});
              const {userexists} = await response.json();
              if(userexists){
                const response = await fetch("/api/checkamount",{method:"POST",body:JSON.stringify({username:currentuser.username})});
                let {balance,country} = await response.json();
                if(country === "Ghana" && currencies.to === "USD"){
                    balance = balance / exchangerate; 
                }else if(country === "USA" && currencies.to === "GHS"){
                    balance = balance * exchangerate;
                }
                const remainingBalance = balance - convertedAmount.to;
                const transfervalid = (remainingBalance > 0.0)
                if(transfervalid){
                  const response = await fetch("/api/deductamount",{method:"POST",body:JSON.stringify({username:currentuser.username,amount:remainingBalance})});
                  const {status} = await response.json();
                  if(status === "success"){
                    const response = await fetch("/api/transfermoney",{method:"POST",body:JSON.stringify({recipientphonenumber,amount:convertedAmount.to})});
                    const {recipient,status} = await response.json();
                    if(status === "success"){     
                      const recipient_name = `${recipient.firstname} ${recipient.lastname}`;            
                      const transferdetails = {
                        recipient_name,
                        amount:convertedAmount.to,
                        status:"success",
                        date:new Date().toLocaleDateString(),
                        senderId:currentuser.id,
                        recipientId:recipient.id,
                        sender_name:`${currentuser.firstname} ${currentuser.lastname}`,
                      }
                      const response = await fetch("/api/receipt",{method:"POST",body:JSON.stringify({transferdetails})});
                      const {status,created} = await response.json();
                      if(status === "success" && created){
                        toast.success(`Transfer to ${recipient_name} completed successfully`,{position:"bottom-right"});
                      } 
                      
                    }
                  }
                  return;
                }
                setErrorMessage("You have insufficient funds");
              }else{
                toast.error("User does not exist",{position:"bottom-right"});
              }
            }catch(error){
              console.log(error);
            }finally{
              setTransferloading(false);
            }
            
        }else if(status === "unauthenticated"){
            router.push("/login")
        }
      }else{
        setErrorMessage("This field cannot be empty");
      }
    }
    function getReceipientPhoneNumber(value:string){
      const receipientphonenumber = value;
      if(receipientphonenumber !== "" && errorMessage !== ""){
        setErrorMessage("")
      }
      setRecipientPhoneNumber(receipientphonenumber);
    }
    return (
        <div className="
         bg-white text-gray-600 md:min-w-[24.5rem]
          shadow-[-10px_-10px_25px_0,10px_10px_25px_0]
          shadow-slate-300/30 rounded-lg
           py-6 px-4"
        >
          <CurrencyInput 
            amount={convertedAmount.from}
            onConvertCurrency={convertBaseCurrencyToSecondaryCurrency}
            defaultcurrency={currencies.from}
            onFetchExchangeRate={selectBaseCurrencyAndFetchExchangeRate} 
            label="you send"
            currency_codes={currency_codes}
          />
          <ExchangeRateDisplay 
            loading={loading} 
            currencies={currencies} 
            rate={exchangerate}
          />
          <CurrencyInput
            amount={convertedAmount.to}
            onConvertCurrency={convertSecondaryCurrencyToBaseCurrency}
            defaultcurrency={currencies.to} 
            onFetchExchangeRate={selectSecondaryCurrencyAndFetchExchangeRate} 
            label="they receive"
            currency_codes={currency_codes}
          />
          <div className="w-full mt-6 flex justify-between items-center">
            <label className="text-gray-500" htmlFor="">Receive method</label>
            <select onChange={selectTransferMethod} className="
              cursor-pointer py-3 px-4
              rounded-[5px] text-[14px]
              border border-gray-300
            focus-visible:outline-blue-500 
              focus-visible:outline-2"
            >
              <option value={transfermethods.BANK_TRANSFER}>Bank Transfer</option>
              <option value={transfermethods.MOBILE_MONEY}>Mobile Money</option>
            </select>
          </div>
          {(transfermethod === transfermethods.MOBILE_MONEY) && <>
              <div className="mt-6">
                <TelephoneInput currency={currencies.to} onchange={getReceipientPhoneNumber}/>
              </div>
              {errorMessage !== "" && <ErrorDisplay message={errorMessage} />}
            </>
          }
          <ToastContainer />
          <Button disabled={transferloading} onClick={completeMoneyTransfer} className={`flex justify-center items-center w-full py-3 text-white mt-8 bg-blue-800/70 rounded-[5px] ${transferloading &&` cursor-not-allowed `}`}>
          {
            transferloading ? 
              <>
                  <RotatingLines strokeColor="white" 
                      strokeWidth="4"
                      animationDuration="0.8"
                      width="25"
                      visible={true}
                  /> 
                  <span className="ml-2">Transferring...</span>
              </>:
              "Get Started"
            }
          </Button>
         </div>    
    )
}