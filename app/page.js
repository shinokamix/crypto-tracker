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
          <PriceTable />
        </section>
      </SmoothLayout>
    </main>
  );
}
