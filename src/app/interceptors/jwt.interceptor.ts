import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const acccount = this.accountService.accountValue;
    const isLoggedIn = acccount && acccount.token;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${acccount.token}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
