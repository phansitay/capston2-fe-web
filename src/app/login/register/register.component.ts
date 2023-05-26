import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {AuthService} from "../../service/auth/auth.service";
import {finalize} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  doctorFormCreate: FormGroup;
  constructor(private userService: DoctorService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    // if (!isAuthenticated) {
    //   this.router.navigateByUrl('')
    // }
  }

  ngOnInit(): void {
    this.doctorFormCreate = new FormGroup(
      {
        password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")]),
        // username: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[A-z_](\\w|\\.|_){5,45}$")]),
        confirmPassword: new FormControl('',[Validators.required]),
        firstName: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        lastName: new FormControl('', [Validators.required,Validators.maxLength(45),Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
        email: new FormControl('',[Validators.required, Validators.email,Validators.maxLength(256)]),
        address: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        // image: new FormControl(''),
        role: new FormControl('mom')
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
      this.userService.save(this.doctorFormCreate.value).subscribe(
        () => {
          this.toastr.success('Đăng kí tài khoản thành công!', 'Thông báo: ');
          this.router.navigateByUrl("")
        }, (error: HttpErrorResponse) => {
          this.toastr.error('Đăng kí tài khoản thất bại!', 'THÔNG BÁO: ');
        }
      );
    }
}
