import { useEffect } from "react";
import CardSection from "../components/dashboard/CardSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivity from "../components/dashboard/WeeklyActivity";
import ExpenseStatistics from "../components/dashboard/ExpenseStatistics";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import BalanceHistory from "../components/dashboard/BalanceHistory";
import { useStore } from "../store";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Dashboard = () => {
  const { fetchCards, fetchTransactions, fetchChartData } = useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchCards();
    fetchTransactions();
    fetchChartData();
  }, [fetchCards, fetchTransactions, fetchChartData]);

  return (
    <div className="space-y-6">
      <CardSection />

      {isMobile ? (
        // Mobile layout - stacked
        <div className="space-y-6">
          <RecentTransactions />
          <WeeklyActivity />
          <ExpenseStatistics />
          <QuickTransfer />
          <BalanceHistory />
        </div>
      ) : (
        // Desktop layout - grid
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactions />
            <ExpenseStatistics />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyActivity />
            <BalanceHistory />
          </div>

          <QuickTransfer />
        </>
      )}
    </div>
  );
};

export default Dashboard;
