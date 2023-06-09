import { Component, OnInit } from '@angular/core';
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../../service/doctor/doctor.service";
import {UserService} from "../../service/user/user.service";
import {PaginationService} from "ngx-pagination";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: ApiList;
  users: Doctor[];
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang
  id: string;
  firstName:string;
  lastName: string
  userDelete: Doctor;
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private aa: PaginationService,
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
        this.userDelete = this.userService.getUserById(id).subscribe(next => {
          this.userDelete = next;
          console.log("1111"+id);
          console.log("2222"+this.userDelete.id)
          this.userService.deleteById(this.userDelete.id).subscribe(next => {
            this.toastr.success("Xóa người dùng thành công!", "Thông báo");''
            this.router.navigateByUrl('/listUser');
          });
        });
      }
      return this.userDelete;
    }, error => {
      console.log("lỗi xóa")
    }, () => {
    });
  }

  ngOnInit(): void {

    console.log("aaaaaaaa")
    console.log("ss",this.userService.getAll())
    this.subsctiption= this.userService.getAll().subscribe(
      value => {

        this.userList= value;
        this.users= this.userList.data;
        console.log("doctor",this.users)
        console.log(value)
      },error => {
        console.log("lỗi ",this.subsctiption)
        console.log("looi")
        alert("lỗi không hiển thị");
      }
    )
  }

  showId(id: any, firstName: any, lastName: any) {
      this.id=id;
      this.firstName=firstName;
      this.lastName=lastName;
      console.log("id",id)
  }

}
