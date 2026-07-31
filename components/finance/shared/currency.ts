export type CurrencyPosition = "prefix" | "suffix" | "none";

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  position: CurrencyPosition;
};

export const CURRENCIES: Currency[] = [
  { code: "EUR", symbol: "€", name: "Euro", position: "prefix" },
  { code: "USD", symbol: "$", name: "US Dollar", position: "prefix" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", position: "prefix" },
  { code: "GBP", symbol: "£", name: "British Pound", position: "prefix" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", position: "prefix" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", position: "prefix" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", position: "prefix" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", position: "prefix" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", position: "suffix" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", position: "suffix" },
  { code: "NONE", symbol: "", name: "None", position: "none" },
];

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0];
