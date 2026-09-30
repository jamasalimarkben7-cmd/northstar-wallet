import { createContext, useContext, useState, useCallback } from "react";

const DashboardContext = createContext();

const MOCK_ADDRESS = "0x71C8dF9aE3b2cA4F5E6d3B7a9c1D2E3f4A5b6C34F";

const initialAssets = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "🟠",
    amount: "0.8421",
    priceUsd: 96842.5,
    price: "$96,842.50",
    change: "+2.41%",
    changeType: "positive",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    logo: "🔵",
    amount: "12.3420",
    priceUsd: 2785.1,
    price: "$2,785.10",
    change: "-1.87%",
    changeType: "negative",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    logo: "🟣",
    amount: "142.875",
    priceUsd: 148.25,
    price: "$148.25",
    change: "+5.23%",
    changeType: "positive",
  },
];

const formatPrice = (v) =>
  "$" +
  v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function DashboardProvider({ children }) {
  // ---- Wallet connection ----
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(() => {
    if (isConnecting) return;
    setIsConnecting(true);
    setTimeout(() => {
      setAddress(MOCK_ADDRESS);
      setIsConnecting(false);
    }, 800);
  }, [isConnecting]);

  const disconnectWallet = useCallback(() => setAddress(null), []);
  const isConnected = !!address;

  const [activeTab, setActiveTab] = useState("dashboard");

  // ---- Modal ----
  const [modal, setModal] = useState({ open: false, type: null, asset: null });
  const openModal = useCallback((type, asset = null) => {
    setModal({ open: true, type, asset });
  }, []);
  const closeModal = useCallback(() => {
    setModal({ open: false, type: null, asset: null });
  }, []);

  // ---- Toast ----
  const [toast, setToast] = useState({ visible: false, message: "" });
  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);
  const hideToast = useCallback(() => setToast({ visible: false, message: "" }), []);

  // ---- Assets / portfolio ----
  const [assets, setAssets] = useState(initialAssets);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [portfolioChange, setPortfolioChange] = useState({
    value: 2.43,
    type: "positive",
  });

  const portfolioValue = assets.reduce(
    (sum, a) => sum + a.priceUsd * Number(a.amount),
    0
  );

  const refreshData = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setAssets((prev) =>
        prev.map((a) => {
          const changeNum = parseFloat((Math.random() * 8 - 4).toFixed(2));
          const up = changeNum >= 0;
          const nextPrice = a.priceUsd * (1 + changeNum / 100);
          return {
            ...a,
            change: `${up ? "+" : ""}${changeNum.toFixed(2)}%`,
            changeType: up ? "positive" : "negative",
            priceUsd: nextPrice,
            price: formatPrice(nextPrice),
          };
        })
      );
      const p = parseFloat((Math.random() * 6 - 2).toFixed(2));
      setPortfolioChange({
        value: p,
        type: p >= 0 ? "positive" : "negative",
      });
      setIsRefreshing(false);
      showToast("Portfolio refreshed successfully");
    }, 1200);
  }, [isRefreshing, showToast]);

  return (
    <DashboardContext.Provider
      value={{
        address,
        isConnecting,
        isConnected,
        activeTab,
        setActiveTab,
        connectWallet,
        disconnectWallet,
        modal,
        openModal,
        closeModal,
        toast,
        showToast,
        hideToast,
        assets,
        portfolioValue,
        portfolioChange,
        isRefreshing,
        refreshData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
