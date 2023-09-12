import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const countries = ["gh","ke","us"]
export default function TelephoneInput(){
    return(
        <>
            <PhoneInput
                inputProps={{name:"phonenumber"}}
                inputClass="!w-full text-slate-600 !py-[10px]" 
                containerClass="w-full" 
                dropdownClass="text-slate-600" 
                onlyCountries={countries} value={""}  
                country={countries[0]}
            />
        </>
    )
}