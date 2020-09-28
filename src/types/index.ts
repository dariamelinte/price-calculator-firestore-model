export type FeritilizerProp = {
  id: string;
  name: string;
  cash: number;
  finance: number;
  location?: string;
}

export type OptionProp = {
  value: string;
  label: string;
}

export type ShippingProp = {
  download: string;
  loading: string;
  price: number;
}

export type PriceCalculatorType = {
  downloadPlace: string;
  loadingPlace: string;
  paymentType: 'cash' | 'finance';
  fertilizer: FeritilizerProp;
}