import { Component, OnInit } from '@angular/core';
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {DoctorService} from "../../service/doctor/doctor.service";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorList: ApiList;
  doctors: Doctor[];
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login')
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
}
