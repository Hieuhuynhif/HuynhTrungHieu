export interface Currency {
  currency: string;
  price: number;
  date: string;
}

export interface FormValues {
  currencyInput: Currency | null;
  currencyOutput: Currency | null;
  input: number;
  output: number;
}
