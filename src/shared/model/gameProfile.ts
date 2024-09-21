export class GameProfile {
  id: number;
  name: string;
  details: string;
  gameURL: string;

  constructor(id: number, name: string, details: string, gameURL: string) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.gameURL = gameURL;
  }
}
