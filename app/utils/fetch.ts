const CURRENCY_API_KEY="0cef3af4ff-f49b766f73-rzxcbp";

export async function fetchExchangeRate(basecurrency:string,secondarycurrency:string){
  console.log(basecurrency,secondarycurrency)
    try{
      const url = `https://exchange-rates.abstractapi.com/v1/live/?api_key=d8a9fe4bef834a97be53b5733d6fd088&base=${basecurrency}&target=${secondarycurrency}`;
      const response = await fetch(url);
      const data = await response.json();
      const exchangeRate = parseFloat(data.result[secondarycurrency]);
      return exchangeRate;
    }catch(error){
      console.log(error);
    }
    return 0;
}