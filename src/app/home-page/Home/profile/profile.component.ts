import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Doctor} from "../../../model/doctor";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Doctor;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
    this.user.firstName=localStorage.getItem("firstName");
    this.user.lastName=localStorage.getItem("lastName");
    this.user.email=localStorage.getItem("email");
    this.user.phoneNumber=localStorage.getItem("phone");
    this.user.address=localStorage.getItem("address");
    console.log("vl"+this.user.firstName);
  }

  ngOnInit(): void {

  }

  exit() {
    this.authService.setIsAuthenticated(false);
    console.log("token",localStorage.getItem("token"))
    this.toastr.success("Đăng xuất thành công!"," THÔNG BÁO");
    this.router.navigateByUrl("");
  }
  check() {
    console.log("roleHome",localStorage.getItem("role"));
    if (localStorage.getItem("role")=="admin"){
      // this.authService.setIsAuthenticated(true);
      this.toastr.success('Truy cập vào trang quản trị thành công!', 'THÔNG BÁO');
      this.router.navigateByUrl('/listSchedule');
    }else{
      this.toastr.error('Bạn không có quyền truy cập vào trang này!', 'THÔNG BÁO');
      this.router.navigateByUrl('/home');
    }
  }

}
