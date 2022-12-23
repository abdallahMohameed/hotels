import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotficationService {

  constructor() { }
  notfication =new BehaviorSubject({message:"",type:""});

  setNotification(Notification: any){
    this.notfication.next(Notification);
  }
}
