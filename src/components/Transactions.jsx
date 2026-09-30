const transactions = [
  {
    id: "tx-1",
    type: "Received",
    asset: "BTC",
    logo: "🟠",
    amount: "+0.1200 BTC",
    value: "$11,621.10",
    counterparty: "0x9a2F...B31c",
    date: "Sep 28, 2026",
    status: "Completed",
  },
  {
    id: "tx-2",
    type: "Swapped",
    asset: "ETH → SOL",
    logo: "🔵",
    amount: "-2.0000 ETH / +28.900 SOL",
    value: "$5,570.20",
    counterparty: "Uniswap v3",
    date: "Sep 28, 2026",
    status: "Completed",
  },
  {
    id: "tx-3",
    type: "Sent",
    asset: "ETH",
    logo: "🔵",
    amount: "-0.5000 ETH",
    value: "$1,392.55",
    counterparty: "0x5BdA...9F02",
    date: "Sep 27, 2026",
    status: "Completed",
  },
  {
    id: "tx-4",
    type: "Received",
    asset: "SOL",
    logo: "🟣",
    amount: "+15.0000 SOL",
    value: "$2,223.75",
    counterparty: "0x7A10...C8e4",
    date: "Sep 27, 2026",
    status: "Completed",
  },
  {
    id: "tx-5",
    type: "Bought",
    asset: "BTC",
    logo: "🟠",
    amount: "+0.0500 BTC",
    value: "$4,842.13",
    counterparty: "Credit Card",
    date: "Sep 26, 2026",
    status: "Completed",
  },
  {
    id: "tx-6",
    type: "Sent",
    asset: "SOL",
    logo: "🟣",
    amount: "-8.2500 SOL",
    value: "$1,223.06",
    counterparty: "0x1F8c...A53b",
    date: "Sep 25, 2026",
    status: "Pending",
  },
];

const typeClass = {
  Received: "type-received",
  Sent: "type-sent",
  Swapped: "type-swapped",
  Bought: "type-bought",
};

export default function Transactions() {
  return (
    <section className="tx-view">
      <div className="view-header">
        <div>
          <h2 className="view-title">Transaction History</h2>
          <span className="view-subtitle">A record of your recent activity</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="assets-table">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Asset / Amount</th>
              <th scope="col" className="col-right">
                Value
              </th>
              <th scope="col">Counterparty</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="asset-row">
                <td>
                  <span
                    className={`tx-badge ${typeClass[tx.type] || ""}`}
                  >
                    {tx.logo} {tx.type}
                  </span>
                </td>
                <td className="asset-amount">{tx.amount}</td>
                <td className="asset-price col-right">{tx.value}</td>
                <td className="asset-symbol">{tx.counterparty}</td>
                <td className="asset-symbol">{tx.date}</td>
                <td>
                  <span
                    className={`status-badge ${
                      tx.status === "Completed" ? "status-done" : "status-pending"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
