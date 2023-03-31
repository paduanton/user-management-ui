import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user.interface'
import { ProfilePhoto } from 'src/app/interfaces/profilePhoto.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userServiceAPIBaseURL: string = environment.userServiceAPIBaseURL;
  
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(`${this.userServiceAPIBaseURL}/user`);
  }

  createUser(userData) {
    return this.http.post<User>(`${this.userServiceAPIBaseURL}/user`, userData);
  }

  createUserPhoto(id: string, image) {
    return this.http.post<ProfilePhoto>(`${this.userServiceAPIBaseURL}/user/${id}/photo`, image);
  }
}