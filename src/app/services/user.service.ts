import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userServiceAPIBaseURL: string = environment.userServiceAPIBaseURL;
  
  constructor(private http: HttpClient) { }

  createUser(userData) {
    return this.http.post(`${this.userServiceAPIBaseURL}/user`, userData);
  }
}