import { useDashboard } from "../context/DashboardContext.jsx";
import Spinner from "./Spinner.jsx";

export default function AssetsView() {
  const { assets, isRefreshing, refreshData, portfolioValue, openModal } =
    useDashboard();

  const total = portfolioValue;

  const formatValue = (v) =>
    v.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <section className="assets-view">
      <div className="view-header">
        <div>
          <h2 className="view-title">Your Assets</h2>
          <span className="view-subtitle">
            Total value:{" "}
            <span className="view-total">{formatValue(total)}</span>
          </span>
        </div>
        <button
          type="button"
          className={`btn-refresh ${isRefreshing ? "loading" : ""}`}
          onClick={refreshData}
          disabled={isRefreshing}
          aria-label="Refresh prices"
        >
          {isRefreshing ? <Spinner size={16} /> : "↻"} Refresh
        </button>
      </div>

      <div className="table-wrapper">
        <table className="assets-table assets-table-full">
          <thead>
            <tr>
              <th scope="col">Asset</th>
              <th scope="col" className="col-right">
                Price
              </th>
              <th scope="col" className="col-right">
                Holdings
              </th>
              <th scope="col" className="col-right">
                Value
              </th>
              <th scope="col">24h Change</th>
              <th scope="col" className="col-right">
                Allocation
              </th>
              <th scope="col" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const value = asset.priceUsd * Number(asset.amount);
              const alloc = total > 0 ? (value / total) * 100 : 0;
              return (
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
                  <td className="asset-price col-right">{asset.price}</td>
                  <td className="asset-amount col-right">{asset.amount}</td>
                  <td className="asset-price col-right">{formatValue(value)}</td>
                  <td className="asset-change">
                    <span
                      className={`change-badge change-${asset.changeType}`}
                    >
                      {asset.change}
                    </span>
                  </td>
                  <td className="asset-price col-right">
                    {alloc.toFixed(2)}%
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
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
