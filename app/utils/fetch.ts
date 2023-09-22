
export async function fetchExchangeRate(basecurrency:string,secondarycurrency:string){
  console.log(basecurrency,secondarycurrency)
    try{
      console.log(process.env.NEXT_PUBLIC_CURRENCY_API_KEY);
      const url = `https://api.fastforex.io/fetch-one?api_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&from=${basecurrency}&to=${secondarycurrency}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("response:",data)
      const exchangeRate = parseFloat(data.result[secondarycurrency]);
      return exchangeRate;
    }catch(error){
      console.log(error);
    }
    return 0;
}