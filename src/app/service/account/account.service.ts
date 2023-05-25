import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiList} from "../../model/api-list";
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../../model/doctor";
import {UserDetail} from "../../model/user-detail";
import {Account} from "../../model/account/account";
import {ScheduleList} from "../../model/schedule-list";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private URL_API ="http://localhost:3210/api/v1/admin/users";
  private URL_API_EDIT ="http://localhost:3210/api/v1/admin/users";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable <ApiList> {
    return this.httpClient.get<ApiList>(this.URL_API);
  }

  //get id delete
  getUserById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(this.URL_API+'/'+id);
  }

  deleteById(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.URL_API+'/'+id);
  }

  getAccountByIdEdit(id: string):Observable<Account>{
    return this.httpClient.get<Account>(this.URL_API_EDIT+'/'+id);
  }
  updateAccount(id:string,account: Account): Observable<Account> {
    return this.httpClient.patch<Account>(this.URL_API_EDIT+'/'+id,account);
  }

  // //get id detail
  // getUserByIdDetail(id: number):Observable<UserDetail>{
  //   return this.httpClient.get<UserDetail>(this.URL_API_DETAIL+'/'+id+this.DETAIL);
  // }
}
