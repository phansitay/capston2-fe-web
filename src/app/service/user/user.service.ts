import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiList} from "../../model/api-list";
import {Doctor} from "../../model/doctor";
import {DoctorCreate} from "../../model/doctor-create";
import {UserDetail} from "../../model/user-detail";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_API ="http://localhost:3210/api/v1/admin/users?filter=role%7C%7C%24eq%7C%7Cmom";
  private URL_API_DELETE ="http://localhost:3210/api/v1/admin/users";
  private URL_API_DETAIL ="http://localhost:3210/api/v1/admin/users";
  private DETAIL ="?fields=id&join=babies";
  constructor(private  httpClient: HttpClient) {}

  // save(doctorCreate: DoctorCreate[]): Observable<DoctorCreate>{
  //   return this.httpClient.post<DoctorCreate>(this.URL_API_CRETAE,doctorCreate)
  // }
  getAll(): Observable <ApiList> {
    return this.httpClient.get<ApiList>(this.URL_API);
  }
  //get id delete
  getUserById(id: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(this.URL_API_DELETE+'/'+id);
  }

  deleteById(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.URL_API_DELETE+'/'+id);
  }

  //get id detail
  getUserByIdDetail(id: number):Observable<UserDetail>{
    return this.httpClient.get<UserDetail>(this.URL_API_DETAIL+'/'+id+this.DETAIL);
  }
}
