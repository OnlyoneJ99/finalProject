'use client'
import {useRef, useState } from "react";
import ExchangeRateDisplay from "../exchangeratedisplay/exhangeratedisplay";
import CurrencyInput from "../currencyinput/currencyinput";
import Button from "../button/button";
import {fetchExchangeRate } from "@/app/utils/fetch";
import TelephoneInput from "../telephoneInput/telephoneinput";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import ErrorDisplay from "../error/errordisplay";
import { PAYSTACK_ORIGIN, TELCOS_URL } from "../../config/config";
import TextInput from "../textinput/textinput";


async function fetchTelcos(currency:string){
  const url = new URL(TELCOS_URL,PAYSTACK_ORIGIN);
  url.searchParams.append("currency",currency);
  url.searchParams.append("type","mobile_money");
  try{
    const response = await fetch(url.href);
    const telcos = await response.json();
    return telcos;
  }catch(error){
    console.log(error);
  }
}

const INIT_VALUE = 100;
enum transfermethods {MOBILE_MONEY="mobile_money",BANK_TRANSFER="bank_transfer"};

const currency_codes = ["GHS","KES",];

export default function ExchangeRateWidget({initexchangerate}:{initexchangerate:number}){
    const[currencies,setCurrencies] = useState({from:"GHS",to:"KES"});
    const[transfermethod,setTransferMethod] = useState(transfermethods.BANK_TRANSFER)
    const[loading,setLoading] = useState(false);
    const[exchangerate,setExchangeRate] = useState(initexchangerate);
    const[convertedAmount,setConvertedAmount] = useState({from:INIT_VALUE,to:initexchangerate * INIT_VALUE});
    const[recipientphonenumber,setRecipientPhoneNumber] = useState("");
    const[errorMessage,setErrorMessage] = useState("");
    const{status} = useSession();
    const router = useRouter();

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
      const response = await Promise.allSettled([fetchTelcos(selectedcurrency),fetchExchangeRate(currencies.from,selectedcurrency)]);
      const exchangerate = 32;
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
            await fetch("/transferdetails",{method:"POST"});
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
          <Button onClick={completeMoneyTransfer} className="w-full py-3 text-white mt-8 bg-blue-800/70 rounded-[5px]">Get Started</Button>
         </div>    
    )
}