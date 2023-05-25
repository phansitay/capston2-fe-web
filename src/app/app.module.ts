import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
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
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountPermissionComponent } from './account/account-permission/account-permission.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {NgxPaginationModule} from "ngx-pagination";
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChatjptComponent } from './chatjpt/chatjpt.component';
import {BlogDetailComponent} from "./blogs/blog-detail/blog-detail.component";
import { HomeBlogComponent } from './home-page/Home/home-blog/home-blog.component';
import { HomeComponent } from './home-page/Home/home/home.component';
import { ProfileComponent } from './home-page/Home/profile/profile.component';

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
    BlogDetailComponent,
    HeaderComponent,
    HomePageComponent,
    AccountListComponent,
    AccountPermissionComponent,
    BlogListComponent,
    ChatjptComponent,
    HomeBlogComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
