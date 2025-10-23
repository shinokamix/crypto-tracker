export default function fromMarkets(coin) {
    return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,

        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
    };
}
