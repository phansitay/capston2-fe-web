import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../model/Blogs/blog";
import {User} from "../../../model/Blogs/user";
import {Subscription} from "rxjs";
import {BlogService} from "../../../service/blog/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {BlogList} from "../../../model/Blogs/blog-list";

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.css']
})
export class HomeBlogComponent implements OnInit {
  blogsListDetail: Blog;
  user: User;
  blogList: BlogList;
  blogs: Blog[];

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
    console.log("aaaaaaaa")
    console.log("ss",this.blogService.getAll())
    this.subsctiption= this.blogService.getAll().subscribe(
      value => {

        this.blogList= value;
        this.blogs= this.blogList.data;
        console.log("account",this.blogs)
        console.log(value)
      },error => {
        console.log("lỗi ",this.subsctiption)
        console.log("looi")
        alert("lỗi không hiển thị");
      }
    )
  }

  exit() {
    this.authService.setIsAuthenticated(false);
    console.log("token",localStorage.getItem("token"))
    this.toastr.success("Đăng xuất thành công!"," THÔNG BÁO");
    this.router.navigateByUrl("");
  }
  check() {
    console.log("roleHome",localStorage.getItem("role"));
    if (localStorage.getItem("role")=="admin"){
      // this.authService.setIsAuthenticated(true);
      this.toastr.success('Truy cập vào trang quản trị thành công!', 'THÔNG BÁO');
      this.router.navigateByUrl('/listSchedule');
    }else{
      this.toastr.error('Bạn không có quyền truy cập vào trang này!', 'THÔNG BÁO');
      this.router.navigateByUrl('/home');
    }
  }

}
