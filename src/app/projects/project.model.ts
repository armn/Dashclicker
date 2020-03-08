export class Project {
  constructor(
    public id: number,
    public visits: number,
    public views: number,
    public reads: number,
    public shares: number,
    public downloads: number,
    public money: number,
    public crypto: number,
    public visitsGiven: number = 0,
    public viewsGiven: number = 0,
    public readsGiven: number = 0,
    public sharesGiven: number = 0,
    public downloadsGiven: number = 0,
    public completed: boolean = false
  ) {}
}
