import { useDashboard } from "../context/DashboardContext.jsx";
import Spinner from "./Spinner.jsx";

export default function AssetsTable() {
  const { assets, isRefreshing, refreshData, openModal } = useDashboard();

  return (
    <section className="assets-section">
      <div className="assets-header">
        <h2 className="assets-title">Your Assets</h2>
        <div className="assets-header-actions">
          <button
            type="button"
            className={`btn-refresh ${isRefreshing ? "loading" : ""}`}
            onClick={refreshData}
            disabled={isRefreshing}
            aria-label="Refresh prices"
          >
            {isRefreshing ? <Spinner size={16} /> : "↻"} Refresh
          </button>
          <button type="button" className="btn-view-all">
            View all
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="assets-table">
          <thead>
            <tr>
              <th scope="col">Asset</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col">24h Change</th>
              <th scope="col" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="asset-row">
                <td className="asset-cell">
                  <span className="asset-logo" aria-hidden="true">
                    {asset.logo}
                  </span>
                  <div className="asset-info">
                    <span className="asset-name">{asset.name}</span>
                    <span className="asset-symbol">{asset.symbol}</span>
                  </div>
                </td>
                <td className="asset-amount">{asset.amount}</td>
                <td className="asset-price">{asset.price}</td>
                <td className="asset-change">
                  <span
                    className={`change-badge change-${asset.changeType}`}
                  >
                    {asset.change}
                  </span>
                </td>
                <td className="asset-actions">
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label={`Send ${asset.symbol}`}
                    onClick={() => openModal("send-asset", asset)}
                    title={`Send ${asset.symbol}`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label={`Receive ${asset.symbol}`}
                    onClick={() => openModal("receive-asset", asset)}
                    title={`Receive ${asset.symbol}`}
                  >
                    ↓
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
