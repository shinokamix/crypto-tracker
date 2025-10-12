import { NextResponse } from "next/server";

const BASE_URL = 'https://api.coingecko.com/api/v3'

export async function GET() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,24h,7d,30d&per_page=250`,
    { headers: { "x_cg_demo_api_key": process.env.COINGECKO_API_KEY } }
  );

  if (!res.ok) return NextResponse.json({ error: "coingecko failed" }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}