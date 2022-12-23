import { Component, OnInit } from '@angular/core';
import { NotficationService } from './services/notfication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  constructor(
    private NotificationService:NotficationService,
    private notifierService:NotifierService,


  ) {
    
  }
  ngOnInit(): void {
    this.NotificationService.notfication.subscribe(data=>{
      if(data.message !="" && data.message != null&& data.message != undefined){
        this.notifierService.notify(data.type, data.message)
      }
    }) 
  
  
  }
  title = 'hotels';

  
}
