import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  // name = new FormControl('');
  private fb = inject(FormBuilder);

  editUserForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    age: ['', [Validators.required, Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    gender: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private userServices: UserService,
    private activeRouter: ActivatedRoute,
    private router: Router,
  ) {}
  get name() {
    return this.editUserForm.get('name');
  }

  get age() {
    return this.editUserForm.get('age');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get phone() {
    return this.editUserForm.get('phone');
  }

  get gender() {
    return this.editUserForm.get('gender');
  }

  get country() {
    return this.editUserForm.get('country');
  }

  get address() {
    return this.editUserForm.get('address');
  }

  // this.name.setValue(data.name);
  ngOnInit() {
    const id = this.activeRouter.snapshot.paramMap.get('id');

    if (id) {
      this.userServices.getSingleUser(id).subscribe((data) => {
        this.editUserForm.patchValue({
          name: data.name,
          age: data.age.toString(),
          email: data.email,
          phone: data.phone.toString(),
          gender: data.gender,
          country: data.country,
          address: data.address,
        });
      });
    }
  }

  updateData() {
    let id = this.activeRouter.snapshot.paramMap.get('id');

    // let name = this.name.value;

    if (this.editUserForm.valid && id) {
      const formValue = this.editUserForm.value;

      const data = {
        name: formValue.name!,
        age: Number(formValue.age),
        email: formValue.email!,
        phone: Number(formValue.phone),
        gender: formValue.gender!,
        country: formValue.country!,
        address: formValue.address!,
      };

      this.userServices.updateUser(data, id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
