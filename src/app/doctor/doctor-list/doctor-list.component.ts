import { Component, OnInit } from '@angular/core';
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorList: ApiList;
  doctors: Doctor[];
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private doctorService: DoctorService,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {
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

}
