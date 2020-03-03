export class Task {
  public id: number;
  public title: string;
  public requirements: {
    evaluate: string;
    description: string;
  };
  public reward: string;
  public completed: boolean;
}
