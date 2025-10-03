export default function PriceTableSceleton() {

  const table_rows = [];

  for(var i = 0; i < 100; i++) {
    table_rows.push(
      <tr key={i} className="h-12 bg-[var(--background)]">
        <td className=""></td>

        <td className=""></td>

        <td className=""></td>

        <td className=""></td>
      </tr>
    )
  }


  return (
    <div>
      <div className="my-30 h-32 bg-[var(--tableColor)] w-5xl mx-auto">

      </div>
      <div className="animate-pulse flex justify-center">
        <div className="w-5xl h-screen bg-[var(--tableColor)]">
        </div>
      </div>
    </div>
  );
}