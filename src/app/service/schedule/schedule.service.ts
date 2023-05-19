import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DoctorCreate} from "../../model/doctor-create";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiList} from "../../model/api-list";
import {ApiScheduleList} from "../../model/api-schedule-list";
import {UserDetail} from "../../model/user-detail";
import {ScheduleDetail} from "../../model/schedule-detail";
import {ScheduleList} from "../../model/schedule-list";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private URL_API ="http://localhost:3210/api/v1/admin/suggest-scheduke-category";
  private URL_API_EDIT ="http://localhost:3210/api/v1/admin/suggest-schedule";
  private URL_API_EDIT_SCHEDULE ="http://localhost:3210/api/v1/admin/suggest-schedule";
  private DETAIL = "?fields=id&join=suggestSchedules";

  // private DELETE = "?fields=id%2CbeginTime%2CendTime%2Ccontent";
  constructor(private  httpClient: HttpClient) {}

  getAll(): Observable <ApiScheduleList> {
    return this.httpClient.get<ApiScheduleList>(this.URL_API);
  }

  //get id detail
  getScheduleByIdDetail(id: number):Observable<ScheduleDetail>{
    return this.httpClient.get<ScheduleDetail>(this.URL_API+'/'+id+this.DETAIL);
  }

  getScheduleByIdEdit(id: string):Observable<ScheduleList>{
    return this.httpClient.get<ScheduleList>(this.URL_API_EDIT+'/'+id);
  }
  updateSchedule(id:string,schedule: ScheduleList): Observable<ScheduleList> {
    return this.httpClient.patch<ScheduleList>(this.URL_API_EDIT_SCHEDULE+'/'+id,schedule);
  }

  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
