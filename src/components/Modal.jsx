import { useState, useEffect, useRef, useCallback } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";

const ASSET_CHOICES = ["BTC", "ETH", "SOL", "ADA", "DOT", "AVAX"];
const MOCK_ADDRESS = "0x71C8dF9aE3b2cA4F5E6d3B7a9c1D2E3f4A5b6C34F";
const EXIT_MS = 220;

export default function Modal() {
  const { modal, closeModal, showToast } = useDashboard();
  const [amount, setAmount] = useState("");
  const [fromAsset, setFromAsset] = useState("BTC");
  const [toAsset, setToAsset] = useState("ETH");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("Credit Card");
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  const TITLE_MAP = {
    receive: "Receive",
    "receive-asset": "Receive",
    send: "Send",
    "send-asset": "Send",
    swap: "Swap",
    buy: "Buy",
  };

  const type = modal.type;
  const asset = modal.asset;
  const titleBase = TITLE_MAP[type] || "Action";
  const title = asset ? `${titleBase} ${asset.symbol}` : titleBase;

  const isReceiveLike = type === "receive" || type === "receive-asset";
  const isSendLike = type === "send" || type === "send-asset";

  // Play the exit animation, then unmount via context.
  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeModal();
      setClosing(false);
    }, EXIT_MS);
  }, [closing, closeModal]);

  // Reset close state whenever a modal opens.
  useEffect(() => {
    if (modal.open) setClosing(false);
  }, [modal.open]);

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden";
      setAmount("");
      setFromAsset(asset?.symbol || "BTC");
      setToAsset("ETH");
      setAddress("");
      setMethod("Credit Card");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal.open, modal.asset, asset]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const canConfirm =
    isReceiveLike || (!!amount && amount.trim() !== "" && Number(amount) > 0);

  const handleConfirm = () => {
    if (!canConfirm) return;
    if (isReceiveLike) {
      const done = () => {
        showToast(`Address copied${asset ? ` for ${asset.symbol}` : ""}`);
        requestClose();
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(MOCK_ADDRESS)
          .then(done)
          .catch(done);
      } else {
        done();
      }
      return;
    }
    let msg;
    if (isSendLike) {
      msg = `Sent ${amount} ${fromAsset}`;
    } else if (type === "swap") {
      msg = `Swapped ${amount} ${fromAsset} for ${toAsset}`;
    } else if (type === "buy") {
      msg = `Bought ${amount} USD of ${asset ? asset.symbol : fromAsset}`;
    } else {
      msg = "Action completed";
    }
    showToast(msg);
    requestClose();
  };

  const renderFields = () => {
    switch (type) {
      case "receive":
      case "receive-asset":
        return (
          <>
            <div className="modal-field">
              <label>Receiving Address</label>
              <div className="modal-address">
                <code className="address-text">{MOCK_ADDRESS}</code>
                <button
                  type="button"
                  className="btn-copy"
                  onClick={handleConfirm}
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="modal-note">
              Send funds to this address to {titleBase.toLowerCase()}.
            </p>
          </>
        );
      case "send":
      case "send-asset":
        return (
          <>
            <div className="modal-field">
              <label>From Asset</label>
              <select
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value)}
                className="modal-select"
              >
                {ASSET_CHOICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Amount</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="modal-input"
                step="any"
                min="0"
              />
            </div>
            <div className="modal-field">
              <label>Destination Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="modal-input"
              />
            </div>
          </>
        );
      case "swap":
        return (
          <>
            <div className="modal-field">
              <label>From</label>
              <select
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value)}
                className="modal-select"
              >
                {ASSET_CHOICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>To</label>
              <select
                value={toAsset}
                onChange={(e) => setToAsset(e.target.value)}
                className="modal-select"
              >
                {ASSET_CHOICES.filter((s) => s !== fromAsset).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Amount</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="modal-input"
                step="any"
                min="0"
              />
            </div>
          </>
        );
      case "buy":
        return (
          <>
            <div className="modal-field">
              <label>Asset</label>
              <select
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value)}
                className="modal-select"
              >
                {ASSET_CHOICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Amount (USD)</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="modal-input"
                step="any"
                min="0"
              />
            </div>
            <div className="modal-field">
              <label>Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="modal-select"
              >
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!modal.open) return null;

  return (
    <div
      className={`modal-backdrop ${closing ? "is-closing" : ""}`}
      onClick={requestClose}
    >
      <div
        className={`modal ${closing ? "is-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={requestClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="modal-body">{renderFields()}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal btn-modal-cancel"
            onClick={requestClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn-modal btn-modal-confirm ${!canConfirm ? "btn-disabled" : ""}`}
            onClick={handleConfirm}
            disabled={!canConfirm}
          >
            {titleBase}
          </button>
        </div>
      </div>
    </div>
  );
}
