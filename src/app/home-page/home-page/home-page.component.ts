import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  doctorList: ApiList;
  doctors: Doctor[];
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private doctorService: DoctorService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
    console.log("aaaaaaaa")
    console.log("ss",this.doctorService.getAll())
    this.subsctiption= this.doctorService.getAll().subscribe(
      value => {

        this.doctorList= value;
        this.doctors= this.doctorList.data;
        console.log("doctor",this.doctors)
        console.log(value)
      },error => {
        console.log("lỗi ",this.subsctiption)
        console.log("looi")
        alert("lỗi không hiển thị");
      }
    )
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

  exit() {
    this.authService.setIsAuthenticated(false);
    console.log("token",localStorage.getItem("token"))
    this.toastr.success("Đăng xuất thành công!"," THÔNG BÁO");
    this.router.navigateByUrl("");
  }

}
