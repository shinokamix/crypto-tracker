import { NextResponse } from "next/server";

const BASE_URL = 'https://api.coingecko.com/api/v3'

export async function GET(_req, {params}) {
  const coin = await params
  console.log(coin.id)
  const res = await fetch(
    `${BASE_URL}/coins/${coin.id}?sparkline=true`,
    { headers: { "x_cg_demo_api_key": process.env.COINGECKO_API_KEY } }
  );

  if (!res.ok) return NextResponse.json({ error: "coingecko failed" }, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}