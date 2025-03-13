import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CardType, TransactionType, ContactType, UserType } from "../types";
import {
  fetchMockCards,
  fetchMockTransactions,
  fetchMockChartData,
  fetchMockUser,
} from "../api/mockData";

interface StoreState {
  cards: CardType[];
  transactions: TransactionType[];
  weeklyActivity: { day: string; deposit: number; withdraw: number }[];
  expenseStats: { category: string; percentage: number }[];
  balanceHistory: { month: string; amount: number }[];
  contacts: ContactType[];
  user: UserType | null;

  fetchCards: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchChartData: () => Promise<void>;
  fetchUser: () => Promise<void>;
  updateUser: (userData: Partial<UserType>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cards: [],
      transactions: [],
      weeklyActivity: [],
      expenseStats: [],
      balanceHistory: [],
      contacts: [],
      user: null,

      fetchCards: async () => {
        try {
          const cards = await fetchMockCards();
          set({ cards });
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      },

      fetchTransactions: async () => {
        try {
          const transactions = await fetchMockTransactions();
          set({ transactions });
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      },

      fetchChartData: async () => {
        try {
          const { weeklyActivity, expenseStats, balanceHistory, contacts } =
            await fetchMockChartData();
          set({ weeklyActivity, expenseStats, balanceHistory, contacts });
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      },

      fetchUser: async () => {
        try {
          set((state) => {
            if (state.user) {
              console.log("User already exists, skipping fetch.");
              return {};
            }

            fetchMockUser().then((user) => {
              set({ user });
            });

            return {};
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: "app-storage",
    }
  )
);
