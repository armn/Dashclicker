export class Boost {
  constructor(
    public name: string,
    public icon: string,
    public description: string,
    public moneyCost: number,
    public cryptoCost: number,
    public status: string = "success",
    public owned: number = 0
  ) {}
}
