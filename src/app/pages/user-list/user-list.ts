import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { user } from '../../services/user-interface';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userData=signal<user[]|undefined>(undefined)
  constructor(private userServices:UserService,private router:Router,private http:HttpClient){}

  ngOnInit(){
    this.getUsers()
  }

  // getUsers(){
  //   this.userServices.getUsers().subscribe((data)=>{
  //     console.log(data);
      
  //     this.userData.set(data)
      
  //   })

  // }
  url = 'http://localhost:3000/usersData';
    getUsers() {
  this.http.get<user[]>(this.url).subscribe((data) => {
    this.userData.set(data);
  });
}
  deleteUser(id: number | undefined ){
      console.log(id);

      this.userServices.deleteUser(id).subscribe((resp)=>{
        if(resp){
          this.getUsers()
        }
      })
    }

    editUser(id:number|undefined){
      console.log(id);
      this.router.navigate([`edit/${id}`])
    }
}
