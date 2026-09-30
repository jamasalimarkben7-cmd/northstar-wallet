import { useState } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-knob" />
    </button>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="setting-row">
      <div className="setting-text">
        <span className="setting-label">{label}</span>
        {description && (
          <span className="setting-description">{description}</span>
        )}
      </div>
      <div className="setting-control">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { showToast } = useDashboard();
  const [currency, setCurrency] = useState("USD");
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [alerts, setAlerts] = useState(true);

  const save = () => showToast("Settings saved successfully");

  return (
    <section className="settings-view">
      <div className="view-header">
        <div>
          <h2 className="view-title">Settings</h2>
          <span className="view-subtitle">
            Manage your wallet preferences and security
          </span>
        </div>
        <button type="button" className="btn-save" onClick={save}>
          Save Changes
        </button>
      </div>

      <div className="settings-card">
        <h3 className="settings-section-title">Wallet Preferences</h3>
        <SettingRow
          label="Display Currency"
          description="Currency used to show portfolio values"
        >
          <select
            className="modal-select settings-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
          </select>
        </SettingRow>
        <SettingRow
          label="Hide Balance by Default"
          description="Mask your portfolio value on open"
        >
          <Toggle
            checked={hideBalance}
            onChange={setHideBalance}
            label="Hide Balance by Default"
          />
        </SettingRow>
        <SettingRow
          label="Price Alerts"
          description="Get notified on significant price movements"
        >
          <Toggle
            checked={alerts}
            onChange={setAlerts}
            label="Price Alerts"
          />
        </SettingRow>
      </div>

      <div className="settings-card">
        <h3 className="settings-section-title">Security</h3>
        <SettingRow
          label="Two-Factor Authentication"
          description="Require a second factor when signing transactions"
        >
          <Toggle
            checked={twoFactor}
            onChange={setTwoFactor}
            label="Two-Factor Authentication"
          />
        </SettingRow>
        <SettingRow
          label="Biometric Unlock"
          description="Use Face ID / fingerprint to unlock the wallet"
        >
          <Toggle
            checked={biometric}
            onChange={setBiometric}
            label="Biometric Unlock"
          />
        </SettingRow>
        <SettingRow
          label="Change Password"
          description="Update your Northstar account password"
        >
          <button
            type="button"
            className="btn-outline"
            onClick={() => showToast("Password reset flow opened")}
          >
            Update
          </button>
        </SettingRow>
      </div>
    </section>
  );
}
