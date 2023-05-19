import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorListComponent} from "./doctor/doctor-list/doctor-list.component";
import {LoginComponent} from "./login/login/login.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {DoctorCretaeComponent} from "./doctor/doctor-cretae/doctor-cretae.component";
import {ScheduleListComponent} from "./schedule/schedule-list/schedule-list.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {ScheduleDetailComponent} from "./schedule/schedule-detail/schedule-detail.component";
import {ScheduleEditComponent} from "./schedule/schedule-edit/schedule-edit.component";
import {HeaderComponent} from "./header/header/header.component";
import {HomePageComponent} from "./home-page/home-page/home-page.component";


const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'listDoctor',component:DoctorListComponent},
  {path: 'doctorCreate',component:DoctorCretaeComponent},
  {path: 'listUser',component:UserListComponent},
  {path: 'detailUser/:id', component: UserDetailComponent},
  {path: 'userDelete/:id',component:UserListComponent},

  {path: 'listSchedule',component:ScheduleListComponent},
  {path: 'detailSchedule/:id', component: ScheduleDetailComponent},
  {path: 'editSchedule/:id', component: ScheduleEditComponent},
  {path: 'home', component: HomePageComponent},
  // {path: 'momAndKid', component: HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
