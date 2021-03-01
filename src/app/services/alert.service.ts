import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../models';

type AlertPartial = Partial<Alert>;

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  onAlert(id = this.defaultId) {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  error(message: string, options?: AlertPartial) {
    console.log(message);
    this.alert(new Alert({ ...options, type: AlertType.ERROR, message }));
  }

  warning(message: string, options?: AlertPartial) {
    this.alert(new Alert({ ...options, type: AlertType.WARNING, message }));
  }

  success(message: string, options?: AlertPartial) {
    this.alert(new Alert({ ...options, type: AlertType.SUCCESS, message }));
  }

  info(message: string, options?: AlertPartial) {
    this.alert(new Alert({ ...options, type: AlertType.INFO, message }));
  }
}
