import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/models/booking-model';
import { BookingService } from 'src/app/services/booking.service';
import { BranchesService } from 'src/app/services/branches.service';
import { NotficationService } from 'src/app/services/notfication.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  start?: Date;
  end?: Date;
  todayDate=new Date()
  numberOfguests: any;


  constructor(
    private router:Router
    ,private branchService:BranchesService,
    private NotificationService: NotficationService,
    private loc:Location,
    private bookingService:BookingService
  ) {
  }
  branches:any[]=[]
  rooms:any[]=[]
  bookedDates:any[]=[]
  selectedRoom:any
  ngOnInit(): void {

   
    this.branchService.getAllbranches().subscribe(res=>{
      console.log(res);
      this.branches=res
  })
}

  getRooms(event:any){
    var branchID=event.target.value;
    this.rooms=this.branches.find(a=>a.branchId==branchID).rooms

  }
  getprice(event:any){
    var RoomID=event.target.value;
    this.selectedRoom=this.rooms.find(a=>a.roomId==RoomID)
    console.log(this.selectedRoom);
    console.log(RoomID);
    
    this.getBookedDates(RoomID)
  }

  BookedDays: (date: Date | null) => boolean =
  (d: Date | null) => {
    return this.isInArray(this.bookedDates,d!);
  }

  validateCapacity(event:any){
    console.log(event.value);
    
     this.numberOfguests=event.value?event.value:this.numberOfguests
    if(this.selectedRoom){
      if(this.numberOfguests>1 && this.selectedRoom.roomType == "single"){
           this.NotificationService.setNotification({ message:"single Rooms can have only one Guest only",type: "error" })
           return false
      }
      return true
    }else{
    this.NotificationService.setNotification({ message:"Please select a room first",type: "warning" })
    return false
    }
    
  }
  getBookedDates(roomId:number){
    this.bookingService.getRoomBookedDates(roomId).subscribe(res=>{
      this.bookedDates=res
      this.bookedDates.forEach((date,i)=>{
        date=new Date(date).setHours(0,0,0,0)
        this.bookedDates[i]=date
        
      })
    })
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

  gotoConfirmReservation(){
    this.router.navigateByUrl("details")

  }
    isInArray(array:any[], value:Date) {
  var dateString=value?.setHours(0,0,0)
  return !array.find((item) => { return item == dateString})
   
}

changeDate(date: any, condition: number) {
 switch (condition) {
    case 1:
       this.start = date;
      break;
    case 2:
       this.end = date;
      break;
    }
}

addPending(){
  debugger
  if(this.selectedRoom&&this.start&&this.end && this.validateCapacity(this.numberOfguests)){
    var booking=new BookingModel()
    booking.roomId=this.selectedRoom.roomId
    booking.bookingTo=this.end!
    booking.bookingFrom=this.start!
    this.bookingService.addPending(booking)
    this.router.navigateByUrl("/",{skipLocationChange:true}).then(()=>{
      this.router.navigate([decodeURI(this.loc.path())])
    })
    
  }else{
    this.NotificationService.setNotification({ message:"Please select a room and a date range",type: "error" })

  }
}

}
