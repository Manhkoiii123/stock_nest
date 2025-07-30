export class CreateStockDto {
  companyName: string;
  symbol: string;
  currentPrice?: number;
  percentChange?: number;

  constructor(data: {
    companyName: string;
    symbol: string;
    currentPrice?: number;
    percentChange?: number;
  }) {
    if (!data.companyName || !data.symbol) {
      throw new Error('companyName and symbol are required');
    }

    this.companyName = data.companyName;
    this.symbol = data.symbol;
    this.currentPrice = data.currentPrice;
    this.percentChange = data.percentChange;
  }
}
