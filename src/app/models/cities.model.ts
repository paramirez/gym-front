export class CityResponse {
  id: number;
  name: string;
  sedesCounter: number = 0;
  userCounter: number = 0;
  constructor(initial?: Partial<CityResponse>) {
    Object.assign(this, initial);
  }
}
