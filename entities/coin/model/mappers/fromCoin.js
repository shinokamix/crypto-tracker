export default function fromCoin(coin) {
    console.log(coin);
    return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,

        homepage: coin.links.homepage,
        whitepaper: coin.links.whitepaper,

        description: coin.description.en,

        price: coin.market_data.current_price.usd,
        change24h: coin.market_data.price_change_percentage_24h,
        marketCap: coin.market_data.market_cap.usd,
        athChange: coin.market_data.ath_change_percentage.usd,
    };
}
