import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  toOnShowingList() {

  }

  toUpcomingList() {

  }

  check() {
    console.log("roleHome",localStorage.getItem("role"));
    if (localStorage.getItem("role")=="admin"){
      // this.authService.setIsAuthenticated(true);
      this.router.navigateByUrl('/listSchedule');
    }else{
      alert("Bạn không có quyền truy cập")
      this.router.navigateByUrl('/home');
    }
  }
}
