"use client";

import Image from "next/image";

import Header from "@/components/Header";
import PriceTable from "@/components/PriceTable";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="text-center">
        <h1 className="text-7xl">Crypto Prices</h1>
      </div>
      <PriceTable />
    </div>
  );
}
