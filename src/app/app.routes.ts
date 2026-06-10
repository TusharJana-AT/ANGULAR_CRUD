import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { AddUser } from './add-user/add-user';
import { EditUser } from './edit-user/edit-user';

export const routes: Routes = [
    {
        path:"",
        component:UserList
    },{
        path:"add",
        component:AddUser
    },{
        path:"edit/:id",
        component:EditUser
    }
];
