import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import SuspenseFallback from "./components/SuspenseFallback";
import { Dashboard, NotFound, Settings } from "./pages";

const Transactions = lazy(() => import("./pages/Transactions"));
const Accounts = lazy(() => import("./pages/Accounts"));
const Investments = lazy(() => import("./pages/Investments"));
const CreditCards = lazy(() => import("./pages/CreditCards"));
const Loans = lazy(() => import("./pages/Loans"));
const Services = lazy(() => import("./pages/Services"));
const Privileges = lazy(() => import("./pages/Privileges"));

function App() {
  return (
    <Router>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="investments" element={<Investments />} />
            <Route path="credit-cards" element={<CreditCards />} />
            <Route path="loans" element={<Loans />} />
            <Route path="services" element={<Services />} />
            <Route path="privileges" element={<Privileges />} />
            <Route path="*" element={<NotFound />} />{" "}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
