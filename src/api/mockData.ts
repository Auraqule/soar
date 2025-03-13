import { assets } from "../constants";
import { CardType, TransactionType, ContactType, UserType } from "../types";

// 🟢 Mock data for cards
export const fetchMockCards = (): Promise<CardType[]> => {
  return Promise.resolve([
    {
      id: 1,
      cardNumber: "3778 **** **** 1234",
      cardHolder: "Eddy Cusuma",
      balance: 5756,
      validThru: "12/22",
      network: "mastercard",
    },
    {
      id: 2,
      cardNumber: "4539 **** **** 5678",
      cardHolder: "Eddy Cusuma",
      balance: 3400,
      validThru: "10/24",
      network: "visa",
    },
  ]);
};

// 🟢 Mock data for transactions
export const fetchMockTransactions = (): Promise<TransactionType[]> => {
  return Promise.resolve([
    {
      id: 1,
      title: "Deposit from my Card",
      date: "25 January 2021",
      amount: 850,
      type: "deposit",
      action: "debit",
    },
    {
      id: 2,
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: 2500,
      type: "payment",
      action: "credit",
    },
    {
      id: 3,
      title: "Jemi Wilson",
      date: "21 January 2021",
      amount: 5400,
      type: "transfer",
      action: "credit",
    },
  ]);
};

// 🟢 Mock data for charts
export const fetchMockChartData = (): Promise<{
  weeklyActivity: { day: string; deposit: number; withdraw: number }[];
  expenseStats: { category: string; percentage: number }[];
  balanceHistory: { month: string; amount: number }[];
  contacts: ContactType[];
}> => {
  return Promise.resolve({
    weeklyActivity: [
      { day: "Sat", deposit: 200, withdraw: 300 },
      { day: "Sun", deposit: 100, withdraw: 400 },
      { day: "Mon", deposit: 300, withdraw: 200 },
      { day: "Tue", deposit: 400, withdraw: 300 },
      { day: "Wed", deposit: 200, withdraw: 100 },
      { day: "Thu", deposit: 300, withdraw: 400 },
      { day: "Fri", deposit: 400, withdraw: 300 },
    ],
    expenseStats: [
      { category: "Entertainment", percentage: 30 },
      { category: "Bill Expenses", percentage: 15 },
      { category: "Investment", percentage: 20 },
      { category: "Others", percentage: 35 },
    ],
    balanceHistory: [
      { month: "Jul", amount: 200 },
      { month: "Aug", amount: 400 },
      { month: "Sep", amount: 600 },
      { month: "Oct", amount: 300 },
      { month: "Nov", amount: 500 },
      { month: "Dec", amount: 700 },
      { month: "Jan", amount: 600 },
    ],
    contacts: [
      {
        id: 1,
        name: "Livia Bator",
        role: "CEO",
        avatar: assets.transferPersonOne,
      },
      {
        id: 2,
        name: "Randy Press",
        role: "Director",
        avatar: assets.transferPersonTwo,
      },
      {
        id: 3,
        name: "Workman",
        role: "Designer",
        avatar: assets.transferPersonThree,
      },
      {
        id: 4,
        name: "Randy Press",
        role: "Director",
        avatar: assets.transferPersonTwo,
      },
      {
        id: 5,
        name: "Workman",
        role: "Designer",
        avatar: assets.transferPersonThree,
      },
      {
        id: 6,
        name: "Randy Press",
        role: "Director",
        avatar: assets.transferPersonTwo,
      },
      {
        id: 7,
        name: "Workman",
        role: "Designer",
        avatar: assets.transferPersonThree,
      },
    ],
  });
};

// 🟢 Mock data for user
export const fetchMockUser = (): Promise<UserType> => {
  return Promise.resolve({
    id: 1,
    name: "Charlene Reed",
    username: "charlenereed",
    email: "charlenereed@gmail.com",
    avatar: assets.user,
    dateOfBirth: "2025-03-10",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
    password: "Password123!",
  });
};
