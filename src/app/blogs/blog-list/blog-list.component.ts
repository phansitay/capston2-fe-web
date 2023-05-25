import { Component, OnInit } from '@angular/core';
import {AccountList} from "../../model/account/account-list";
import {Account} from "../../model/account/account";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {BlogList} from "../../model/Blogs/blog-list";
import {Blog} from "../../model/Blogs/blog";
import {BlogService} from "../../service/blog/blog.service";
import {User} from "../../model/Blogs/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogList: BlogList;
  blogs: Blog[];
  user: User;
  blogDelete: Blog;
  id: string;
  firstName:string;
  lastName: string
  accountDelete: Account;
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang
  private subsctiption: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private blogsService: BlogService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('')
    }
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.blogDelete = this.blogsService.getBlogById(id).subscribe(next => {
          this.blogDelete = next;
          console.log("1111"+id);
          console.log("2222"+this.blogDelete.id)
          this.blogsService.deleteBlogById(this.blogDelete.id).subscribe(next => {
            this.toastr.success("Xóa người dùng thành công!", "Thông báo");''
            this.router.navigateByUrl('/listBlogs');
          });
        });
      }
      return this.blogDelete;
    }, error => {
      console.log("lỗi xóa")
    }, () => {
    });
  }

  ngOnInit(): void {

    console.log("aaaaaaaa")
    console.log("ss",this.blogsService.getAll())
    this.subsctiption= this.blogsService.getAll().subscribe(
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

  showId(id: any, firstName: any, lastName: any) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    console.log("id",id)
  }

}
