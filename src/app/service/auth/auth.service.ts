import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3210/api/v1';
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
}
