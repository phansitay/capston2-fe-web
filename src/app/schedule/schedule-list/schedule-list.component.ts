import { Component, OnInit } from '@angular/core';
import {ScheduleList} from "../../model/schedule-list";
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ApiScheduleList} from "../../model/api-schedule-list";
import {ScheduleService} from "../../service/schedule/schedule.service";
import {Schedule} from "../../model/schedule";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  schedules: Schedule[];
  apiScheduleList: ApiScheduleList;
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login')
    }
    console.log("aaaaaaaa")
    console.log("ss",this.scheduleService.getAll())
    this.subsctiption= this.scheduleService.getAll().subscribe(
      value => {

        this.apiScheduleList= value;
        this.schedules= this.apiScheduleList.data;
        console.log("schedule",this.schedules)
        console.log(value)
      },error => {
        console.log("lỗi ",this.subsctiption)
        console.log("looi")
        alert("lỗi không hiển thị");
      }
    )
  }
}
