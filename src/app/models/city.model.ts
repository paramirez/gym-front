export class City {
  private name: string;
  constructor(initial?: Partial<City>) {
    Object.assign(this, initial);
  }
}
