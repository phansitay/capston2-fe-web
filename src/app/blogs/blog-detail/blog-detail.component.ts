import { Component, OnInit } from '@angular/core';
import {BlogList} from "../../model/Blogs/blog-list";
import {Blog} from "../../model/Blogs/blog";
import {User} from "../../model/Blogs/user";
import {Account} from "../../model/account/account";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../service/blog/blog.service";
import {ScheduleDetail} from "../../model/schedule-detail";
import {ScheduleList} from "../../model/schedule-list";
import {ScheduleService} from "../../service/schedule/schedule.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogsListDetail: Blog;
  user: User;

  private subsctiption: Subscription;

  constructor(private blogService: BlogService,
              private router: Router,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      console.log("id111111111111111111111111111",id)
      if (id != null) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.blogsListDetail = this.blogService.getBlogByIdDetail(id).subscribe(next => {
          this.blogsListDetail = next;
          console.log("99999999999999999999999",this.blogsListDetail)
          this.user = next.user;
          console.log("user",this.user.firstName)
        });
      }
    }, error => {
    }, () => {
    });
  }

  ngOnInit(): void {
  }

}
