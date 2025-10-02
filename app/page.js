"use client";

import PriceTable from "@/components/PriceTable";
import ScrumbleText from "@/components/ScrumleText";
import SmoothLayout from "@/components/SmoothLayout";
import Header from "@/components/Header";

export default function Home() {


  return (
    <main className="bg-background font-sans font-semibold">
      <Header />
      <SmoothLayout>
        <section className="flex flex-col">
          <div className="text-center my-30">
            <ScrumbleText text={"Crypto Prices"} className={"justify-center"}/>
          </div>
          <PriceTable />
        </section>
      </SmoothLayout>
    </main>
  );
}
