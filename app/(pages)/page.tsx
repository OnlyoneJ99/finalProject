import Button from "../components/button/button";
import TransferWidget from "../components/exchangeratewidget/exchangeratewidget";
import {fetchExchangeRate} from "../utils/fetch";
import Link from "next/link";

const currencies = {
  basecurrency: "USD",
  secondarycurrency: "GHS",
}

export default async function Home() {
  console.log(currencies.secondarycurrency)
  const exchangerate = await fetchExchangeRate(currencies.basecurrency,currencies.secondarycurrency);
  return (
    <div className="h-full flex flex-col ">
      <main className="w-full h-full text-gray-600 bg-cover bg-center relative bg-slate-100">
        <div className="h-full w-[80%] mt-20 md:mt-0 mx-auto flex justify-center items-center relative gap-8 flex-col md:flex-row md:justify-center">
          <div className="flex flex-col gap-y-3 justify-center grow">
            <h1 className="text-slate-500 font-extrabold text-2xl md:text-3xl lg:text-4xl">SEND MONEY ANYWHERE</h1>
            <p className="w-[25ch] font-[16px]">Quickly and easily send, receive and request money online with <span className="font-bold text-slate-500">JeffPay</span></p>
            <Link className=" max-w-[20rem] focus:outline-blue-600 focus:outline-2" href="/signup"><Button className="bg-blue-700/80 shadow-md px-4 hover:shadow-xl mt-7 w-full text-white">Open an account</Button></Link>
          </div>
          <TransferWidget initexchangerate={exchangerate} />
        </div>
      </main>
    </div>
  )
}
