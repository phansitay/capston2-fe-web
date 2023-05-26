import { Component, OnInit } from '@angular/core';
import {UserDetail} from "../../model/user-detail";
import {Baby} from "../../model/baby";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userListDetail: UserDetail;
  babyList: Baby[];
  idBaby:number
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
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.userListDetail = this.userService.getUserByIdDetail(id).subscribe(next => {
          this.userListDetail = next;
          this.idBaby=next.id;
          console.log("id"+this.idBaby)
          this.babyList = next.babies;
          console.log("baby",this.babyList)
          console.log("chuoi ",this.userListDetail);
        });
      }
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
  }


  sendData() {
    const data = this.idBaby
    this.userService.setData(data);
  }
}
