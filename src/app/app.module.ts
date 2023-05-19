import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import {DoctorService} from "./service/doctor/doctor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./auth/TokenInterceptor";
import { UserListComponent } from './user/user-list/user-list.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';
import { DoctorCretaeComponent } from './doctor/doctor-cretae/doctor-cretae.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ScheduleDetailComponent } from './schedule/schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule/schedule-edit/schedule-edit.component';
import { HeaderComponent } from './header/header/header.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    DoctorListComponent,
    LoginComponent,
    UserListComponent,
    ScheduleListComponent,
    DoctorCretaeComponent,
    UserDetailComponent,
    ScheduleDetailComponent,
    ScheduleEditComponent,
    HeaderComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(({
      positionClass: 'toast-top-right',
    })),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
