import "server-only";
import { NextResponse } from "next/server";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET() {
    const res = await fetch(`${BASE_URL}/ping`, {
        headers: { x_cg_demo_api_key: process.env.COINGECKO_API_KEY },
    });

    if (!res.ok)
        return NextResponse.json(
            { error: "coingecko failed" },
            { status: res.status }
        );
    const data = await res.json();
    return NextResponse.json(data);
}
