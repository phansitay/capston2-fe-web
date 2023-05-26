import { Component, OnInit } from '@angular/core';
import {Account} from "../../model/account/account";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Doctor} from "../../model/doctor";
import {DoctorService} from "../../service/doctor/doctor.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.css']
})
export class DoctorUpdateComponent implements OnInit {
  doctorDetailList: Doctor;
  id:string;
  data: any;
  uploadedAvatar = null;
  doctorFormEdit: FormGroup = new FormGroup(
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
      roomName: new FormControl(),
      businessHours: new FormControl()
    }
  )
  oldAvatarLink: any;
  constructor(private router: Router,
              private doctorService: DoctorService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService,
              private firebase: AngularFireStorage) {
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
      this.doctorService.getDoctorByIdEdit(id).subscribe(value1 =>
      {
        this.doctorDetailList=value1;
        this.oldAvatarLink=value1.image;
        this.doctorFormEdit = new FormGroup(
          {
            password: new FormControl(value1.password),
            username: new FormControl(value1.username,[Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[A-z_](\\w|\\.|_){5,45}$")]),
            firstName: new FormControl(value1.firstName, [Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[a-zA-Z]+$/")]),
            lastName: new FormControl(value1.lastName, [Validators.required,Validators.minLength(6),Validators.maxLength(45),Validators.pattern("^[a-zA-Z]+$/")]),
            phoneNumber: new FormControl(value1.phoneNumber, [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
            email: new FormControl(value1.email,[Validators.required, Validators.email,Validators.maxLength(256)]),
            address: new FormControl(value1.address,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            image: new FormControl(value1.image),
            role: new FormControl(value1.role),
            roomName: new FormControl(value1.roomName,),
            businessHours: new FormControl(value1.businessHours,[Validators.required, Validators.minLength(3), Validators.maxLength(100)])
          }
        )
      })
    })
  }

  submit() {
    console.log("bắt đầu")
    if (this.uploadedAvatar !== null) {
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.firebase.ref(avatarName);
      this.firebase.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.doctorFormEdit.controls.image.setValue(url);
            console.log("url", url)
            this.doctorService.updateDoctor(this.id,this.doctorFormEdit.value).subscribe(
              (data: Doctor) => {
                this.toastr.success('Cập nhật thông tin bác sĩ thành công!', 'Success: ');
                this.router.navigateByUrl("/listDoctor")
              },
              error => {
                this.toastr.error("Cập thật thất bại!","Thông báo");}
            );
          });
        })
      ).subscribe();
    } else {
      console.log('OK');
      this.doctorFormEdit.controls.image.setValue(this.oldAvatarLink);
      this.doctorService.updateDoctor(this.id,this.doctorFormEdit.value).subscribe(
        (data: Doctor) => {
          this.toastr.success('Cập nhật thông tin bác sĩ thành công!', 'Success: ');
          this.router.navigateByUrl("/listDoctor")
        },
        error => {
          this.toastr.error("Cập thật thất bại!","Thông báo");}
      );
  }}

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
