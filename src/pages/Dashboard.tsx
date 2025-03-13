import { useEffect } from "react";
import { useStore } from "../store";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  BalanceHistory,
  CardSection,
  ExpenseStatistics,
  QuickTransfer,
  RecentTransactions,
  WeeklyActivity,
} from "../components/dashboard";

const Dashboard = () => {
  const { fetchUser, fetchCards, fetchTransactions, fetchChartData } =
    useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchUser();
    fetchCards();
    fetchTransactions();
    fetchChartData();
  }, [fetchUser, fetchCards, fetchTransactions, fetchChartData]);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CardSection />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </div>

      {isMobile ? (
        // Mobile layout - stacked
        <div className="space-y-6">
          <WeeklyActivity />
          <ExpenseStatistics />
          <QuickTransfer />
          <BalanceHistory />
        </div>
      ) : (
        // Desktop layout - grid
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WeeklyActivity />
            </div>
            <div className="lg:col-span-1">
              <ExpenseStatistics />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <QuickTransfer />
            </div>
            <div className="lg:col-span-2">
              <BalanceHistory />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
