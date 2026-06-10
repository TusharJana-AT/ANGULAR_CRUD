import { Component, signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { user } from '../services/user-interface';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userData=signal<user[]|undefined>(undefined)
  constructor(private userServices:UserService){}

  ngOnInit(){
    this.userServices.getUsers().subscribe((data)=>{
      console.log(data);

      this.userData.set(data)
      
    })
  }
}
