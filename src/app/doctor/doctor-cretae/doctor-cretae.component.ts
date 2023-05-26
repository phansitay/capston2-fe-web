import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-doctor-cretae',
  templateUrl: './doctor-cretae.component.html',
  styleUrls: ['./doctor-cretae.component.css']
})
export class DoctorCretaeComponent implements OnInit {
  doctorFormCreate: FormGroup;
  uploadedAvatar = null;
  loading = false;
  oldAvatarLink = 'https://firebasestorage.googleapis.com/v0/b/capston2-project.appspot.com/o/b%C3%A1c%20s%C4%A9.jpg?alt=media&token=61a2b17a-5951-47ac-92b7-b84c3f6303c7';

  constructor(private doctorService: DoctorService,
              private toastr: ToastrService,
              private router: Router,
              private fireStorage: AngularFireStorage,
              private authService: AuthService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {
    this.doctorFormCreate = new FormGroup(
      {
        password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")]),
        username: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[A-z_](\\w|\\.|_){5,45}$")]),
        confirmPassword: new FormControl('',[Validators.required]),
        firstName: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        lastName: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(45),Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
        email: new FormControl('',[Validators.required, Validators.email,Validators.maxLength(256)]),
        address: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        image: new FormControl(''),
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
    // Upload img & download url
    console.log("bắt đầu")
    if (this.uploadedAvatar !== null) {
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.fireStorage.ref(avatarName);
      this.fireStorage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.doctorFormCreate.controls.image.setValue(url);
            console.log("url", url)
            console.log("mật khẩu",this.doctorFormCreate.value)
            this.doctorService.save(this.doctorFormCreate.value).subscribe(() => {
            }, (error: HttpErrorResponse) => {
              this.toastr.error('Thêm bác sĩ thất bại!', 'THÔNG BÁO: ');
            }, () => {
              this.toastr.success('Thêm bác sĩ thành công!', 'THÔNG BÁO');
              console.log("bắt")
              this.router.navigateByUrl("/listDoctor")
              console.log("hêt")
            });
          });
        })
      ).subscribe();
    } else {
      console.log('OK');
      // tslint:disable-next-line:max-line-length
      this.doctorFormCreate.controls.image.setValue('https://firebasestorage.googleapis.com/v0/b/capston2-project.appspot.com/o/b%C3%A1c%20s%C4%A9.jpg?alt=media&token=61a2b17a-5951-47ac-92b7-b84c3f6303c7');

      this.doctorService.save(this.doctorFormCreate.value).subscribe(
        () => {
          this.toastr.success('Thêm mới bác sĩ thành công!', 'Thông báo: ');
          this.router.navigateByUrl("/listDoctor")
        }, (error: HttpErrorResponse) => {
          this.toastr.error('Thêm bác sĩ thất bại!', 'THÔNG BÁO: ');
        }
      );
    }
  }
  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    if (this.uploadedAvatar) {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedAvatar);
      reader.onload = (e: any) => {
        this.oldAvatarLink = e.target.result;
      };
    }
    console.log("file0",this.uploadedAvatar)
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

}
