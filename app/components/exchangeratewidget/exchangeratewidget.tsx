'use client'
import {useState } from "react";
import ExchangeRateDisplay from "../exchangeratedisplay/exhangeratedisplay";
import CurrencyInput from "../currencyinput/currencyinput";
import Button from "../button/button";
import { fetchExchangeRate } from "@/app/utils/fetch";

const INIT_VALUE = 100;
export default function ExchangeRateWidget({initexchangerate}:{initexchangerate:number}){
    const[currencies,setCurrencies] = useState({from:"USD",to:"EUR"});
    const[loading,setLoading] = useState(false);
    const[exchangerate,setExchangeRate] = useState(initexchangerate);
    const[convertedAmount,setConvertedAmount] = useState({from:INIT_VALUE,to:initexchangerate * INIT_VALUE});

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
    return (
        <div className="
         bg-white
          text-gray-600 md:min-w-[24.5rem]
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
          />
          <div className="w-full mt-6 flex justify-between items-center">
            <label className="text-gray-500" htmlFor="">Receive method</label>
            <select className="cursor-pointer py-3 px-4 rounded-[5px] text-[14px] border border-gray-300 focus-visible:outline-blue-500 focus-visible:outline-2">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>
          <Button className="w-full py-3 text-white mt-8 bg-blue-800/70 rounded-[5px]">Get Started</Button>
         </div>    
    )
}