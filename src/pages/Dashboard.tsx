import { useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  BalanceHistory,
  CardSection,
  ExpenseStatistics,
  QuickTransfer,
  RecentTransactions,
  WeeklyActivity,
} from "../components/dashboard";
import { useAppDispatch } from "../store";
import {
  fetchCards,
  fetchChartData,
  fetchTransactions,
  fetchUser,
} from "../slices/storeSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCards());
    dispatch(fetchTransactions());
    dispatch(fetchChartData());
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
