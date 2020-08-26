export class Company {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public img: string,
    public sharePrice: number,
    public previousShareCost: number = sharePrice,
    public shares: number = 100000000,
    public forecast?: number,
    public sharesOwned: number = 0,
    public owned: boolean = false,
    public profit: number = 0,
    public periods?: number,
    public liquidated: boolean = false
  ) {}
}
