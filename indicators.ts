// @params{period} - The period for which th EMA is being calulated

import type { Candlestick } from "./lighter-sdk-ts/generated";

// [i,2,3,4]  \ ema
export function getEMA(prices: number[], period: number): number[] {
    const multiplier = 2 / (period + 1);

    if (prices.length < period) {
        throw new Error("Not enough prices provided");
    }
    //calculate initial SMA
    let sma = 0;
    for (let i = 0; i < period; i++) {
        sma += (prices[i] ?? 0)
    }
    sma /= period;
//sma until this code 
    const emas = [sma]
    for (let i = 0; i < period; i++) {
        const ema = (emas[emas.length - 1] ?? 0) * (1 - multiplier) + (prices[i] ?? 0) * multiplier;
        emas.push(ema);
    }
    return emas;
}

export function getMidPrices(candlesticks: Candlestick[]){
    return candlesticks.map(({open, close}) => Number(((open + close) / 2).toFixed(3)));
}

export function getMACD(prices: number[]) {
    const ema26 = getEMA(prices, 26);// [].length = 26
    let ema12 = getEMA(prices, 12);// [].length = 12

    ema12 = ema12.slice(-ema26.length);

    console.log(ema12.length, ema26.length);
    const macd = ema12.map((_, index) => (ema12[index] ?? 0) - (ema26[index] ?? 0));
    return macd

}