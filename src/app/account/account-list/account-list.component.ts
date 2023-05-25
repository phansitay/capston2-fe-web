import { Component, OnInit } from '@angular/core';
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user/user.service";
import {AccountList} from "../../model/account/account-list";
import {Account} from "../../model/account/account";
import {AccountService} from "../../service/account/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accountList: AccountList;
  account: Account[];
  id: string;
  firstName:string;
  lastName: string
  accountDelete: Account;
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {

    console.log("aaaaaaaa")
    console.log("ss",this.accountService.getAll())
    this.subsctiption= this.accountService.getAll().subscribe(
      value => {

        this.accountList= value;
        this.account= this.accountList.data;
        console.log("account",this.account)
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
