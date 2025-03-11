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
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}
