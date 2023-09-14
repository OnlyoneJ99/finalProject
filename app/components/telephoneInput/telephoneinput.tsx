import React from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import { twMerge } from "tailwind-merge";

const countries = ["gh","ke"]
interface TelephoneInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    onchange:(value:string) => void,
    currency:string,
}
export default function TelephoneInput({className,onchange,currency}:TelephoneInputProps){
    let countrycode;
    if(currency === "GHS"){
        countrycode = "gh"
    }else{
        countrycode = "ke"
    }
    return(
        <>
            <PhoneInput
                inputProps={{name:"phonenumber"}}
                inputStyle={{paddingBlock:8}}
                inputClass={twMerge("!w-full text-slate-600",className)} 
                containerClass="w-full" 
                dropdownClass="text-slate-600" 
                onlyCountries={countries} value={""}  
                country={countrycode}
                onChange={onchange}
            />
        </>
    )
}