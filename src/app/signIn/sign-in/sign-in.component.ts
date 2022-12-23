import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { LoginModel } from 'src/app/models/login-model';
// import jwtDecode from 'jwt-decode';
import { LoginService } from 'src/app/services/login.service';
import { NotficationService } from 'src/app/services/notfication.service';
;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  login: LoginModel = new LoginModel();
  constructor(private loginService: LoginService,
    private router:Router,
    private NotificationService: NotficationService,
    ) {}

  ngOnInit(): void {


    
  }
  signIn() {
    this.loginService.login(this.login).subscribe(
      (a) => {
        console.log(a);
        localStorage.setItem("token",a.theToken)
        localStorage.setItem("userName",a.userName)
        localStorage.setItem("userId",a.userId)
        localStorage.setItem("isFirstBooking",a.isFirstBooking)
        this.router.navigateByUrl("/booking")

      },
      (err) => {
        console.log(err);
        this.NotificationService.setNotification({ message: err.error??"Unexpexted Error !", type: "error" })
      }
    );
  }
  Register(){
        this.router.navigateByUrl("/register")
  }
}



