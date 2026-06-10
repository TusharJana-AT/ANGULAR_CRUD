import { Component, signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { user } from '../services/user-interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userData=signal<user[]|undefined>(undefined)
  constructor(private userServices:UserService,private router:Router){}

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.userServices.getUsers().subscribe((data)=>{
      console.log(data);

      this.userData.set(data)
      
    })

  }
  deleteUser(id: number ){
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
