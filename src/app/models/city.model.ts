export class City {
  name: string;
  id: number;
  constructor(initial?: Partial<City>) {
    Object.assign(this, initial);
  }
}
