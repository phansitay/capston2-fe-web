import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {ScheduleList} from "../../model/schedule-list";
import {ScheduleService} from "../../service/schedule/schedule.service";
import {ScheduleDetail} from "../../model/schedule-detail";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  scheduleListDetail: ScheduleDetail;
  scheduleList: ScheduleList[];
  idSchedule:number
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang

  sendData() {
    const data = this.idSchedule
    this.scheduleService.setData(data);
  }

  private subsctiption: Subscription;

  constructor(private scheduleService: ScheduleService,
              private router: Router,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.scheduleListDetail = this.scheduleService.getScheduleByIdDetail(id).subscribe(next => {
          this.scheduleListDetail = next;
          this.idSchedule=next.id;
          this.scheduleList = next.suggestSchedules;
          console.log("baby",this.scheduleList)
          console.log("chuoi ",this.scheduleListDetail);
        });
      }
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa",this.idSchedule)
  }
}
