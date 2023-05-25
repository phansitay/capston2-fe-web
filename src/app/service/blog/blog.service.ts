import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BlogList} from "../../model/Blogs/blog-list";
import {ScheduleDetail} from "../../model/schedule-detail";
import {Blog} from "../../model/Blogs/blog";
import {Doctor} from "../../model/doctor";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private URL_API ="http://localhost:3210/api/v1/admin/blogs?join=user";
  private URL_API_DETAIL ="http://localhost:3210/api/v1/admin/blogs";
  private DETAIL ="?join=user";
  constructor(private  httpClient: HttpClient) {}

  // save(doctorCreate: DoctorCreate[]): Observable<DoctorCreate>{
  //   return this.httpClient.post<DoctorCreate>(this.URL_API_CRETAE,doctorCreate)
  // }
  getAll(): Observable <BlogList> {
    return this.httpClient.get<BlogList>(this.URL_API);
  }

  //get id detail
  getBlogByIdDetail(id: number):Observable<Blog>{
    return this.httpClient.get<Blog>(this.URL_API_DETAIL+'/'+id+this.DETAIL);
  }
  //get id delete
  getBlogById(id: string): Observable<Blog> {
    return this.httpClient.get<Doctor>(this.URL_API_DETAIL+'/'+id);
  }

  deleteBlogById(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.URL_API_DETAIL+'/'+id);
  }

  // //get id detail
  // getUserByIdDetail(id: number):Observable<UserDetail>{
  //   return this.httpClient.get<UserDetail>(this.URL_API_DETAIL+'/'+id+this.DETAIL);
  // }
}
