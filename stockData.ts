import { getEMA, getMACD, getMidPrices } from "./indicators";
import { CandlestickApi, IsomorphicFetchHttpLibrary, ServerConfiguration } from "./lighter-sdk-ts/generated";
const BASE_URL = "https://testnet.zklighter.elliot.ai"
const SOL_MARKET_ID = 1

const klinesApi = new CandlestickApi({
    baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
    httpApi: new IsomorphicFetchHttpLibrary(),
    middleware: [],
    authMethods: {}
});

export async function getIndicators(duration: "5m" | "4h", marketId: number) {
    const klines = await klinesApi.candlesticks(marketId, duration, Date.now() - 1000 * 60 * 60 * (duration === "5m" ? 2 : 96), Date.now(), 50, false);
    const midPrices = getMidPrices(klines.candlesticks);
    const emas20s = getEMA(midPrices, 20);
    const macd = getMACD(midPrices);

    // console.log("midPrices:", midPrices);
    // console.log("emas20s:", emas20s);
    // console.log("macd:", macd);

    return {
        midPrices: midPrices.slice(-10),
        macd: macd.slice(-10),
        emas20s: emas20s.slice(-10)
    }
}

getIndicators("5m", SOL_MARKET_ID).catch(console.error);
