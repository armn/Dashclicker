export class Asset {
  constructor(
    public type: string,
    public name: string,
    public amount: number,
    public invested: boolean,
    public returns: number,
    public symbol: string
  ) {}
}
