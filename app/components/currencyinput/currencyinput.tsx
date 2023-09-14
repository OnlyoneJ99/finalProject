'use client'

import NumberInput from "../numberinput/numberinput";

interface ICurrencyInput{
    label:"you send"|"they receive",
    defaultcurrency:string
    amount:number,
    currency_codes:string[],
    onConvertCurrency:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    onFetchExchangeRate:(e:React.ChangeEvent<HTMLSelectElement>)=>Promise<void>;
}
export default function CurrencyInput({label,defaultcurrency,amount,onConvertCurrency,onFetchExchangeRate,currency_codes}:ICurrencyInput){
    return(
        <div className="bg-indigo-400/20 rounded-lg py-4 grow">
            <div className="mx-4 flex gap-x-3 ">
              <NumberInput amount={amount} onConvertCurrency={onConvertCurrency} label={label} />
              <div className="bg-white rounded-md flex justify-center">
                <select defaultValue={defaultcurrency} onChange={onFetchExchangeRate} className="
                  w-full h-full block px-3
                  cursor-pointer outline-none
                focus-visible:outline-blue-500 text-[14px]">
                  {
                    currency_codes.map(currency_code=>(
                      <option key={currency_code} id={label} value={currency_code}>{currency_code}</option>
                      )
                    )
                  }
                </select>
              </div>
            </div>
          </div>
    )
}