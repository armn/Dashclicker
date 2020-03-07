export class Task {
  constructor(
    public id: number,
    public title: string,
    public evaluate: string,
    public description: string,
    public reward: string,
    public completed: boolean = false,
    public status?: string
  ) {}
}
