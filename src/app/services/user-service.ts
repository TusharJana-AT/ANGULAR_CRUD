import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url="http://localhost:3000/users"
  constructor(private http:HttpClient){}

  getUsers(){
    return this.http.get<user[]>(this.url)
  }
}
