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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
    console.log("Ơ")
    this.firstName= localStorage.getItem("firstName");
    this.lastName=localStorage.getItem("lastName");
    this.email=localStorage.getItem("email");
    this.phone=localStorage.getItem("phone");
    this.address=localStorage.getItem("address");
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
