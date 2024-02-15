import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDataComponent } from './user-data/user-data.component';



const routes: Routes = [
  {
    path:'',
    component:SignUpComponent,
  },
  {
    path:'user-details',
    component:UserDetailsComponent
  },
  {
    path:'user-list',
    component:UserListComponent
  },
  {
    path:'user-data',
    component:UserDataComponent
  },
  
 
 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
