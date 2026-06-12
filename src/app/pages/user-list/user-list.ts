import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { user } from '../../models/user-interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userData = signal<user[] | undefined>(undefined);

  allUsers = signal<user[]>([]);
  countries = signal<string[]>([]);

  constructor(
    private userServices: UserService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getUsers();
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
      this.allUsers.set(data);

      const uniqueCountries = [...new Set(data.map((u) => u.country))];
      this.countries.set(uniqueCountries);
    });
  }
  filterByCountry(event: Event) {
    const country = (event.target as HTMLSelectElement).value;

    if (!country) {
      this.userData.set(this.allUsers());
      return;
    }

    const filteredUsers = this.allUsers().filter((user) => user.country === country);

    this.userData.set(filteredUsers);
  }
  deleteUser(id: number | undefined) {
    console.log(id);

    this.userServices.deleteUser(id).subscribe((resp) => {
      if (resp) {
        this.getUsers();
      }
    });
  }

  editUser(id: number | undefined) {
    console.log(id);
    this.router.navigate([`edit/${id}`]);
  }
}
