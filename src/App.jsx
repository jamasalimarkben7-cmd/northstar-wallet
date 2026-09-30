import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AssetsView from "./components/AssetsView.jsx";
import Transactions from "./components/Transactions.jsx";
import Settings from "./components/Settings.jsx";
import Modal from "./components/Modal.jsx";
import Toast from "./components/Toast.jsx";
import { useDashboard } from "./context/DashboardContext.jsx";
import "./App.css";

export default function App() {
  const { activeTab } = useDashboard();

  const renderView = () => {
    switch (activeTab) {
      case "assets":
        return <AssetsView />;
      case "transactions":
        return <Transactions />;
      case "settings":
        return <Settings />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="dashboard-main" key={activeTab}>
        {renderView()}
      </main>
      <Modal />
      <Toast />
    </div>
  );
}
