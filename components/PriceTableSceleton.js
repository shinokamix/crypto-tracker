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
      <div className="my-30 h-32">

      </div>
      <div className="animate-pulse overflow-x-auto flex justify-center align-middle">
        <table className="bg-[var(--tableColor)] w-5xl table-auto border-separate text-left border-spacing-y-3">

          <colgroup>
            <col className="w-[70%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
          </colgroup>

          <thead className="h-16">
            <tr className="h-9">
              <th scope="col" className=""></th>
              <th scope="col" className="px-4 py-2"></th>
              <th scope="col" className="px-4 py-2"></th>
              <th scope="col" className="px-4 py-2"></th>
            </tr>
            <tr className="bg-[var(--background)] h-3">
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>
          </thead>

          <tbody className="">
            {table_rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}