import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  async login() {
    const email = this.email;
    const password = this.password;
    try {
      const response = await this.authService.login(email, password).toPromise();
      const token = response.accessToken;
      const firstName = response.data.firstName;
      const lastName = response.data.lastName;
      const role = response.data.role;
      // lưu token vào localStorage
      localStorage.setItem('token', token);
      console.log("token ",token)
      console.log("firstName",firstName)
      console.log("role",role)
      console.log("login thành công")
      localStorage.setItem("role",role);
      localStorage.setItem("name",firstName);
      this.authService.setIsAuthenticated(true);

      this.router.navigateByUrl('/home');
      this.toastr.success('Đăng nhập thành công!', 'Success: ');
    } catch (error) {
      console.log("Lỗi login")
    }
  }
  ngOnInit(): void {
  }

  onSubmit() {

  }
}