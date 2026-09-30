import { useState, useEffect } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";

export default function Toast() {
  const { toast, hideToast } = useDashboard();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast.visible) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(hideToast, 300);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible && !visible) return null;

  return (
    <div className={`toast ${visible ? "show" : ""}`} role="status">
      <span className="toast-icon" aria-hidden="true">
        ✓
      </span>
      <span className="toast-text">{toast.message}</span>
    </div>
  );
}
