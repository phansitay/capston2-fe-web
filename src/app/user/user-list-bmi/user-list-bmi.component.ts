import { Component, OnInit } from '@angular/core';
import {UserDetail} from "../../model/user-detail";
import {Baby} from "../../model/baby";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {ListBmi} from "../../model/bmi/list-bmi";
import {Bmikid} from "../../model/bmi/bmikid";

@Component({
  selector: 'app-user-list-bmi',
  templateUrl: './user-list-bmi.component.html',
  styleUrls: ['./user-list-bmi.component.css']
})
export class UserListBmiComponent implements OnInit {
  bmiListDetail: ListBmi;
  bmiKids: Bmikid[];
  data: any;
  private subsctiption: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      next => {
      const id = next.get('id');
      if (id != null) {
        console.log("vl" + id);
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.subsctiption = this.userService.getAllUserBmi(id).subscribe(
          value => {

            this.bmiListDetail = value;
            this.bmiKids = this.bmiListDetail.data;
            console.log("bmi", this.bmiKids)
            console.log(value)
          }, error => {
            console.log("lỗi ", this.subsctiption)
            console.log("looi")
            alert("lỗi không hiển thị");
          }
        )
      }
    }),this.userService.data$.subscribe(data => {
      this.data = data;
      console.log("data",this.data)})
  }
}
