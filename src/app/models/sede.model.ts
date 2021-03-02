import { City } from './city.model';

export class Sede {
  private id: number;
  name: string;
  city?: number | City;
  userCounter?: number;

  constructor(initial?: Partial<Sede>) {
    Object.assign(this, initial);
  }
}
