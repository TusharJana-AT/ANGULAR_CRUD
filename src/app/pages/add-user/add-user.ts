import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { user } from '../../models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  private fb = inject(FormBuilder)

  loginForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    gender: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(10)]],
  });


  get name() {
    return this.loginForm.get('name');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get phone() {
    return this.loginForm.get('phone');
  }

  get age() {
    return this.loginForm.get('age');
  }

  get gender() {
    return this.loginForm.get('gender');
  }

  get country() {
    return this.loginForm.get('country');
  }

  get address() {
    return this.loginForm.get('address');
  }

  constructor(
    private userServices: UserService,
    private router: Router,
  ) {}

  addUser() {
    const formValue = this.loginForm.value;
    // let name=this.name.value
    // let age=this.age.value
    // let email=this.email.value
    // let phone=this.phone.value
    // let gender=this.gender.value
    // let country=this.country.value
    // let address=this.address.value

    if (this.loginForm.valid) {
      const data: user = {
        name: formValue.name!,
        age: Number(formValue.age),
        email: formValue.email!,
        phone: Number(formValue.phone),
        gender: formValue.gender!,
        country: formValue.country!,
        address: formValue.address!,
      };

      this.userServices.saveUsers(data).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
