import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiList} from "../../model/api-list";
import {DoctorCreate} from "../../model/doctor-create";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private URL_API ="http://localhost:3210/api/v1/admin/users?filter=role%7C%7C%24eq%7C%7Cdoctor";
  private URL_API_CRETAE ="http://localhost:3210/api/v1/admin/users";
  constructor(private  httpClient: HttpClient) {}

  save(doctorCreate: DoctorCreate[]): Observable<DoctorCreate>{
    return this.httpClient.post<DoctorCreate>(this.URL_API_CRETAE,doctorCreate)
  }
  getAll(): Observable <ApiList> {
    return this.httpClient.get<ApiList>(this.URL_API);
  }
  //
  // getDoctorById(id: number): Observable<Doctor> {
  //   return this.httpClient.get<Doctor>(this.URL_API+'/'+id);
  // }
  //
  // deleteById(id: number | undefined): Observable<any> {
  //   return this.httpClient.delete(this.URL_API+'/'+id);
  // }
}
