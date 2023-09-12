const CURRENCY_API_KEY="0cef3af4ff-f49b766f73-rzxcbp";

export async function fetchExchangeRate(basecurrency:string,secondarycurrency:string){
  console.log(basecurrency,secondarycurrency)
    try{
      const response = await fetch(`https://api.fastforex.io/fetch-one?from=${basecurrency}&to=${secondarycurrency}&api_key=${CURRENCY_API_KEY}`);
      const data = await response.json();
      const exchangeRate = parseFloat(data.result[secondarycurrency]);
      return exchangeRate;
    }catch(error){
      console.log(error);
    }
    return 0;
}