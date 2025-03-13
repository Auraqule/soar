import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  fetchMockCards,
  fetchMockTransactions,
  fetchMockChartData,
  fetchMockUser,
} from "../api/mockData";
import { CardType, TransactionType, ContactType, UserType } from "../types";

// 🟢 initial state
interface StoreState {
  cards: CardType[];
  transactions: TransactionType[];
  weeklyActivity: { day: string; deposit: number; withdraw: number }[];
  expenseStats: { category: string; percentage: number }[];
  balanceHistory: { month: string; amount: number }[];
  contacts: ContactType[];
  user: UserType | null;
}

const initialState: StoreState = {
  cards: [],
  transactions: [],
  weeklyActivity: [],
  expenseStats: [],
  balanceHistory: [],
  contacts: [],
  user: null,
};

// 🟢 Async Thunks for Fetching Data
export const fetchCards = createAsyncThunk("store/fetchCards", async () => {
  return await fetchMockCards();
});

export const fetchTransactions = createAsyncThunk(
  "store/fetchTransactions",
  async () => {
    return await fetchMockTransactions();
  }
);

export const fetchChartData = createAsyncThunk(
  "store/fetchChartData",
  async () => {
    return await fetchMockChartData();
  }
);

export const fetchUser = createAsyncThunk(
  "store/fetchUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state.store.user) {
      console.log("User already exists, skipping fetch.");
      return state.store.user;
    }
    return await fetchMockUser();
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.weeklyActivity = action.payload.weeklyActivity;
        state.expenseStats = action.payload.expenseStats;
        state.balanceHistory = action.payload.balanceHistory;
        state.contacts = action.payload.contacts;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

// 🟢 Configure Persist
const persistConfig = {
  key: "store",
  storage,
};

export const { updateUser } = storeSlice.actions;
export const storeReducer = persistReducer(persistConfig, storeSlice.reducer);
