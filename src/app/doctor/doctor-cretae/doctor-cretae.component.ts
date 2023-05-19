import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-cretae',
  templateUrl: './doctor-cretae.component.html',
  styleUrls: ['./doctor-cretae.component.css']
})
export class DoctorCretaeComponent implements OnInit {
  doctorFormCreate: FormGroup;
  // oldAvatarLink: any;
  // uploadedAvatar = null;

  constructor(private doctorService: DoctorService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.doctorFormCreate = new FormGroup(
      {
        userName: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        role: new FormControl('doctor')
      }
    ),[this.comparePassword]
  }

  comparePassword(form: any) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;
    if (password === confirmPassword) {
      return null;
    }
    return {'not': true};
  }

  submit() {
    console.log("bắt đầu")
    console.log("aa",this.doctorFormCreate.value)
    this.doctorService.save(this.doctorFormCreate.value).subscribe(
      value => {
        this.toastr.success('Thêm mới bác sĩ thành công!', 'Success: ');
        this.router.navigateByUrl("/listDoctor");
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Thêm mới bác sĩ thất bại!', 'Error: ');
      }
    )

  }

  // getAvatar(event: any) {
  //   this.uploadedAvatar = event.target.files[0];
  //   if (this.uploadedAvatar) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.uploadedAvatar);
  //     reader.onload = (e: any) => {
  //       this.oldAvatarLink = e.target.result;
  //     };
  //   }
  //   console.log("file0",this.uploadedAvatar)
  // }
  //
  // private getCurrentDateTime() {
  //   return new Date().getTime();
  // }
}
