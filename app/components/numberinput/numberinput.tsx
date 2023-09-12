import { useId } from "react"

interface INumberInput{
    label:"you send"|"they receive",
    onConvertCurrency:(e:React.ChangeEvent<HTMLInputElement>)=>void
    amount:number
}
export default function NumberInput({onConvertCurrency,label,amount}:INumberInput){
    const id = useId();
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-[14px] text-indigo-800/80 font-bold mb-2">{label}</label>
            <input type="number"  id={id} onChange={onConvertCurrency} min={0} value={amount} className="
                bg-transparent
                outline-none 
                font-bold 
                text-indigo-800/80 
                border-b-2 
                border-b-gray-400/60
                " 
            />
        </div>
    )
}