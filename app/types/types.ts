export interface INumberInput{
    label:"you send"|"they receive",
    convertCurrency:(e:React.ChangeEvent<HTMLInputElement>)=>void
    amount:number
}