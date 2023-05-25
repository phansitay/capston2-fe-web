import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

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
