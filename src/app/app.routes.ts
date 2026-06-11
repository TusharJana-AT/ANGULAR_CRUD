import { Routes } from '@angular/router';
import { UserList } from './pages/user-list/user-list';
import { AddUser } from './pages/add-user/add-user';
import { EditUser } from './pages/edit-user/edit-user';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';
export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: UserList,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: AddUser,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: EditUser,
    canActivate: [authGuard]
  },
  {
    path:'**',
    component:PageNotFound
  }
];