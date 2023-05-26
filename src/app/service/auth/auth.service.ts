import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetail} from "../../model/user-detail";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3210/api/v1';
  private url="http://localhost:3210/api/v1/admin/users";
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string | undefined, password: string | undefined) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  //get id detail
  getUserByIdDetail(id: number):Observable<Account>{
    return this.http.get<Account>(this.url+'/'+id);
  }
}
