import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../service/schedule/schedule.service";
import {ScheduleList} from "../../model/schedule-list";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  scheduleDetailList: ScheduleList;
  id:string;
  data: any;
  scheduleFormEdit: FormGroup = new FormGroup(
    {
      beginTime: new FormControl(),
      endTime: new FormControl(),
      content: new FormControl()
    }
  )

  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value =>
    {
      const id = value.get('id');
      this.id=id;
      console.log("id edit : ",id);
      console.log("id:",this.data)
      this.scheduleService.getScheduleByIdEdit(id).subscribe(value1 =>
      {
        this.scheduleDetailList=value1;
        this.scheduleFormEdit = new FormGroup(
          {
            beginTime: new FormControl(value1.beginTime),
            endTime: new FormControl(value1.endTime),
            content: new FormControl(value1.content)
          }
        )
      })
    }),
    this.scheduleService.data$.subscribe(data => {
      this.data = data;
    console.log("data",this.data)})
  }

  submit() {
    this.scheduleService.updateSchedule(this.id,this.scheduleFormEdit.value).subscribe(value =>
    {
        console.log("Cập nhật thành công")
    })

  }

}
