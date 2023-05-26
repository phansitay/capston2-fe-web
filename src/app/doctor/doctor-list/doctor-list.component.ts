import { Component, OnInit } from '@angular/core';
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../../service/doctor/doctor.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorList: ApiList;
  doctors: Doctor[];
  doctorDelete: Doctor;
  id: number;
  firstName: string;
  lastName: string
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private doctorService: DoctorService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.doctorDelete = this.doctorService.getDoctorById(id).subscribe(next => {
          this.doctorDelete = next;
          console.log("1111"+id);
          console.log("2222"+this.doctorDelete.id)
          this.doctorService.deleteDoctorById(this.doctorDelete.id).subscribe(next => {
            this.toastr.success("Xóa bác sĩ thành công!", "Thông báo");''
            this.router.navigateByUrl('/listDoctor');
          });
        });
      }
      return this.doctorDelete;
    }, error => {
      this.toastr.error("Xóa thất bại","Thông báo")
      console.log("lỗi xóa")
    }, () => {
    });
  }

  ngOnInit(): void {
    console.log("aaaaaaaa")
    console.log("ss",this.doctorService.getAll())
    this.subsctiption= this.doctorService.getAll().subscribe(
      value => {

        this.doctorList= value;
        this.doctors= this.doctorList.data;
        console.log("doctor",this.doctors)
        console.log(value)
      },error => {
        console.log("lỗi ",this.subsctiption)
        console.log("looi")
        alert("lỗi không hiển thị");
      }
    )
  }

  showId(id: number, firstName: string, lastName: string) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
  }
}
