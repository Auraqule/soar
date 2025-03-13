export interface CardType {
  id: number;
  cardNumber: string;
  cardHolder: string;
  balance: number;
  validThru: string;
  network: "visa" | "mastercard";
}

export interface TransactionType {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: "deposit" | "payment" | "transfer";
  action: "debit" | "credit";
}

export interface ContactType {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  dateOfBirth: string | Date;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
  password: string;
}
