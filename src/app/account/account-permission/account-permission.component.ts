import { Component, OnInit } from '@angular/core';
import {ScheduleList} from "../../model/schedule-list";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../service/schedule/schedule.service";
import {Account} from "../../model/account/account";
import {AccountService} from "../../service/account/account.service";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-permission',
  templateUrl: './account-permission.component.html',
  styleUrls: ['./account-permission.component.css']
})
export class AccountPermissionComponent implements OnInit {
  accountDetailList: Account;
  id:string;
  data: any;
  accountFormEdit: FormGroup = new FormGroup(
    {
      password: new FormControl(),
      username: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      image: new FormControl(),
      role: new FormControl(),
    }
  )

  constructor(private router: Router,
              private accountService: AccountService,
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
      this.accountService.getAccountByIdEdit(id).subscribe(value1 =>
      {
        this.accountDetailList=value1;
        this.accountFormEdit = new FormGroup(
          {
            password: new FormControl(value1.password),
            username: new FormControl(value1.username),
            firstName: new FormControl(value1.firstName),
            lastName: new FormControl(value1.lastName),
            phoneNumber: new FormControl(value1.phoneNumber),
            email: new FormControl(value1.email),
            address: new FormControl(value1.address),
            image: new FormControl(value1.image),
            role: new FormControl(value1.role),
          }
        )
      })
    })
  }

  submit() {
    this.accountService.updateAccount(this.id,this.accountFormEdit.value).subscribe(value =>
    {
      console.log("Cập nhật thành công");
      this.router.navigateByUrl("/listAccount");
    })

  }

}
