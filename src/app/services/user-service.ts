import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url="http://localhost:3000/usersData"
  constructor(private http:HttpClient){}

  getUsers(){
    return this.http.get<user[]>(this.url)
  }

  saveUsers(data:user){
    return this.http.post<user[]>(this.url,data)
  }

  deleteUser(id:number|undefined){
    return this.http.delete(`${this.url}/${id}`)
  }

  getSingleUser(id:string){
    return this.http.get<user>(`${this.url}/${id}`)
  }

  updateUser(data:user,id:string){
    return this.http.put<user>(`${this.url}/${id}`,data)
  }
}
