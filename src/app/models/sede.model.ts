export class Sede {
  private id: number;
  private name: string;
  constructor(initial?: Partial<Sede>) {
    Object.assign(this, initial);
  }
}
