"use client";

import Image from "next/image";

import Header from "@/components/Header";
import PriceTable from "@/components/PriceTable";

export default function Home() {
  return (
    <div className="bg-background font-sans font-semibold">
      <Header/>
      <div className="text-center">
        <h1 className="text-9xl font-mono my-30">Crypto Prices</h1>
      </div>
      <PriceTable />
    </div>
  );
}
