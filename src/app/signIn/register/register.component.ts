import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { LoginService } from 'src/app/services/login.service';
import { NotficationService } from 'src/app/services/notfication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Register: UserModel = new UserModel();

  constructor(
    private _fb: FormBuilder,
    private loginService:LoginService,
    private NotificationService: NotficationService,
    private router:Router
      )
   {}

  ngOnInit(): void {
    this.initForm();
  }
  xxx=new Date("12/17/2022")
  







  private initForm() {
    this.form = this._fb.group({
      email: [null, [Validators.email,Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: [0, [Validators.required]],
      userType: [1, [Validators.required]],
      isFirstBooking: [true, [Validators.required]],
      name: ['', [Validators.required]],
    });
  }
  onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.loginService.register(this.form.value).subscribe((a) => {
        console.log(a);
        localStorage.setItem("token",a.theToken)
        localStorage.setItem("userName",a.userName)
        localStorage.setItem("userId",a.userId)
        localStorage.setItem("isFirstBooking",a.isFirstBooking)
       this.NotificationService.setNotification({ message:"registration Done successfully !",type: "success" })
        this.router.navigateByUrl("/booking")


      },
      (err) => {
        console.log(err);
        this.NotificationService.setNotification({ message: err.error, type: "error" })
      

        // alert(r.error)
      })
    }else{
      this.NotificationService.setNotification({ message: "validation Error,please try again", type: "error" })
    }
    
  }


  goToSignIn(){
    this.router.navigateByUrl("")
  }
}
