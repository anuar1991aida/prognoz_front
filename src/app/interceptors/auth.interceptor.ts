import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../dirs/login/login.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(loginService);
  const router = inject(Router);
  const token = 'Bearer ' + localStorage.getItem('auth_token');

  const excludedUrls = ['/login'];
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
          router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};

