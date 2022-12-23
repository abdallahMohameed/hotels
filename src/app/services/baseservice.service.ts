// import { Injectable } from '@angular/core';
// import { EtihadApiUrl } from './../models/EtihadApiUrl';
// import { AmthalApiUrl } from './../models/AmthalApiUrl';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { APIsUrls } from '../models/apis-urls';
// import { IHttpResponse } from '../interfaces/http-response';
// import { Client } from '../enums/client';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {


  private http: HttpClient;
  private readonly baseUrl;
  private options: any;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.baseUrl = environment.baseUrl;    
  }

  protected get<T>(url: string): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    this.options = { headers: headers };
    return this.http.get<any>(`${this.baseUrl}/${url}`, this.options)
  }

  protected post<T>(url: string, data?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    this.options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}/${url}`, data, this.options)
  }

  protected put<T>(url: string, data?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    this.options = { headers: headers };
    return this.http.put<any>(`${this.baseUrl}/${url}`, data, this.options)
  }

  protected getUrlConfigurations() {
      return new APIsUrls();

  }
}
