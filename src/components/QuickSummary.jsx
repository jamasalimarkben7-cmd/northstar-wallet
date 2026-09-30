import { useState } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";

const ACTION_TYPES = [
  { type: "receive", label: "Receive", icon: "↓" },
  { type: "send", label: "Send", icon: "↑" },
  { type: "swap", label: "Swap", icon: "⇄" },
  { type: "buy", label: "Buy", icon: "+" },
];

export default function QuickSummary() {
  const { portfolioValue, portfolioChange, openModal } = useDashboard();
  const [visible, setVisible] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const formattedValue = `$${portfolioValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <section className="quick-summary">
      <div className="summary-card">
        <div className="summary-header">
          <span className="summary-label">Total Portfolio Value</span>
          <button
            type="button"
            className="visibility-toggle"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide balance" : "Show balance"}
            aria-pressed={visible}
          >
            {visible ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="summary-value">
          {visible ? formattedValue : "••••••••"}
        </div>

        <div className="summary-change">
          <span
            className={`change-badge change-${
              portfolioChange.type === "negative" ? "negative" : "positive"
            }`}
          >
            {portfolioChange.value >= 0 ? "▲ +" : "▼ "}
            {Math.abs(portfolioChange.value).toFixed(2)}% (24h)
          </span>
        </div>

        <div className="summary-actions">
          {ACTION_TYPES.map((action) => (
            <button
              key={action.type}
              type="button"
              className={`action-btn ${activeAction === action.type ? "active" : ""}`}
              onClick={() => {
                setActiveAction(action.type);
                openModal(action.type);
              }}
            >
              <span className="action-icon" aria-hidden="true">
                {action.icon}
              </span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s7-7 11-7 11 7 11 7-7 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeSlashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M8.55 8.55A6.7 6.7 0 0 0 12 9.73m-4.22 4.22L3 16m6 0h.01M15.45 15.45A6.7 6.7 0 0 0 12 14.27m4.55 4.55L21 16m-6 0l4 4" />
      <path d="M1 12s7-7 11-7 11 7 11 7-7 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
