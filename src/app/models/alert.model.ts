export class Alert {
  id: string;
  type: AlertType;
  message: string;
  keepAfterRouteChange: boolean;
  autoClose: boolean = true;
  fade: boolean;

  constructor(initial?: Partial<Alert>) {
    Object.assign(this, initial);
  }
}

export enum AlertType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING,
}
