import {FcCurrencyExchange} from "react-icons/fc";
import { ThreeDots } from  'react-loader-spinner'

interface IExchangeRateDisplay{
  rate:number
  currencies:{to:string,from:string},
  loading:boolean
}
export default function ExchangeRateDisplay({rate,currencies,loading}:IExchangeRateDisplay) {
    return(
        <div className="text-center my-6 text-slate-500">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-2">
                <h3 className="text-indigo-700">Exchange Rate</h3>
                <span><FcCurrencyExchange size={25} /></span>
              </div>
              <div className="text-start">
                <div className="flex items-center gap-x-1 h-[40px]">
                  <span><em>1</em> {currencies.from} = </span>
                  <span> 
                    {
                      loading ?
                      <div className="flex">
                        <ThreeDots 
                          height="40" 
                          width="40" 
                          radius="9"
                          color="grey" 
                          ariaLabel="loading exchange rate"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </div> 
                      : ` ${rate} ${currencies.to}`
                    } 
                  </span>
                </div>
              </div>
            </div>
          </div>
    )
}