import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';
import { user } from '../services/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {

  name=new FormControl('')
  age=new FormControl('')
  email=new FormControl('')

  constructor(private userServices:UserService,private router:Router){}

  addUser(){
    let name=this.name.value
    let age=this.age.value
    let email=this.email.value
    

    if(name && age && email){
      let data:user={
        name:name,
        age:Number(age),
        email:email
      }

      this.userServices.saveUsers(data).subscribe((resp)=>{
        if(resp){
          this.router.navigate(['/'])
        }
      })
    }
  }
}
