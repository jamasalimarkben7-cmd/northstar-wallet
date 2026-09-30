import { useState } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";
import Spinner from "./Spinner.jsx";
import NorthstarLogo from "./NorthstarLogo.jsx";

const navLinks = [
  { id: "dashboard", label: "Dashboard" },
  { id: "assets", label: "Assets" },
  { id: "transactions", label: "Transactions" },
  { id: "settings", label: "Settings" },
];

const networks = ["Ethereum", "Polygon", "Solana", "Base"];

function NetworkSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Ethereum");

  return (
    <div className="network-selector">
      <button
        type="button"
        className="network-trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="status-dot" aria-hidden="true" />
        {selected}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <menu className="network-menu" role="menu">
          {networks.map((net) => (
            <button
              key={net}
              role="menuitemradio"
              aria-checked={net === selected}
              className={`network-option ${net === selected ? "selected" : ""}`}
              onClick={() => {
                setSelected(net);
                setOpen(false);
              }}
            >
              {net}
            </button>
          ))}
        </menu>
      )}
    </div>
  );
}

function ConnectedWallet({ address, onDisconnect }) {
  const [open, setOpen] = useState(false);
  const shortAddr = `0x${address.slice(2, 6)}...${address.slice(-4)}`;

  return (
    <div className="network-selector">
      <button
        type="button"
        className="wallet-trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="wallet-address">{shortAddr}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <menu className="wallet-menu" role="menu">
          <li className="wallet-menu-header" role="presentation">
            <span className="wallet-network">Ethereum</span>
          </li>
          <button
            type="button"
            className="network-option"
            style={{ pointerEvents: "none", opacity: 0.7 }}
          >
            {shortAddr}
          </button>
          <button
            type="button"
            className="network-option disconnect"
            onClick={() => {
              onDisconnect();
              setOpen(false);
            }}
          >
            Disconnect
          </button>
        </menu>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`chevron ${open ? "open" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Navbar() {
  const {
    address,
    isConnecting,
    isConnected,
    connectWallet,
    disconnectWallet,
    activeTab,
    setActiveTab,
  } = useDashboard();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo">
            <NorthstarLogo />
            <span className="navbar-title">Northstar Wallet</span>
          </span>
        </div>

        <div className="navbar-links" role="menubar">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              role="menuitem"
              aria-current={activeTab === link.id ? "page" : undefined}
              className={`nav-link ${activeTab === link.id ? "active" : ""}`}
              onClick={() => setActiveTab(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="navbar-actions">
          <NetworkSelector />
          {isConnected ? (
            <ConnectedWallet address={address} onDisconnect={disconnectWallet} />
          ) : (
            <button
              type="button"
              className="btn-connect"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Spinner size={16} /> Connecting
                </>
              ) : (
                <>🔗 Connect Wallet</>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
