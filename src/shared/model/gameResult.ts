export class gameResult {
  lastUpdateDate = new Date();

  constructor(
    public id: string,
    public categoryID: string,
    public gameID: number,
    public date: Date,
    public pointsNumber: number
  ) {}
}
