import { Token } from '@angular/compiler';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { BaseserviceService } from './baseservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseserviceService {

  constructor(inj: Injector) {
    super(inj);
  }



  login(loginModel:LoginModel) {
      const url = this.getUrlConfigurations().Login;
      
      return this.post<any>(url,loginModel);
  }

  register(registerModel:any) {
    const url = this.getUrlConfigurations().register;
    
    return this.post<any>(url,registerModel);
}
}
