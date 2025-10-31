import { getEMA, getMACD, getMidPrices } from "./indicators";
import { CandlestickApi, IsomorphicFetchHttpLibrary, ServerConfiguration } from "./lighter-sdk-ts/generated";
const BASE_URL = "https://mainnet.zklighter.elliot.ai"
const SOL_MARKET_ID = 2

async function getKlines(maeketId: number) {
    const klinesApi = new CandlestickApi({
        baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
        httpApi: new IsomorphicFetchHttpLibrary(),
        middleware: [],
        authMethods: {}
    });

    const klines = await klinesApi.candlesticks(SOL_MARKET_ID, '5m', Date.now() - 1000 * 60 * 60 * 1, Date.now(), 50, false);
    const midPrices = getMidPrices(klines.candlesticks);
    console.log(midPrices.slice(-10));
    const emas20s = getEMA(midPrices, 20);
    console.log(emas20s.slice(-10));
    const macd = getMACD(midPrices);
    console.log(macd.slice(-10));
}

getKlines(SOL_MARKET_ID);