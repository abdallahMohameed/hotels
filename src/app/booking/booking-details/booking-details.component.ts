import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/models/booking-model';
import { BookingService } from 'src/app/services/booking.service';
import { NotficationService } from 'src/app/services/notfication.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{
  pendingBookings:BookingModel[]=[]
  userName:string=""
  Discount:number=0
  isFirstBooking:boolean=true
  finalPrice: any;
  constructor(
    private router:Router,
    private NotificationService: NotficationService,
    private bookingService:BookingService

  ) {
    
  }
  ngOnInit(): void {
      console.log(this.bookingService.pendingBookings);
      this.pendingBookings=this.bookingService.pendingBookings
      console.log(this.pendingBookings);
      this.getRoomById()
      this.userName= localStorage.getItem("userName")!
      console.log(this.pendingBookings);
      this.getFinalPrice()

      
     
      
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

  gotoBooking(){
    this.router.navigateByUrl("/booking")
  }


  getRoomById(){
    this.pendingBookings.forEach((item,i)=>{
      this.bookingService.getRoomById(item.roomId).subscribe(res=>{
        //add Room details to the object
        this.pendingBookings[i]["room"]=res
        // get Difference In Days
        this.pendingBookings[i].DifferenceInDays=this.getDifferenceInDays(this.pendingBookings[i].bookingFrom,this.pendingBookings[i].bookingTo)
    
      })

    })
  }

  confirmBooking(){
    this.bookingService.addNewBooking(this.pendingBookings).subscribe(res=>{
      console.log(res);
      
    },err=>{
    this.NotificationService.setNotification({ message: err.error??"Unexpected error,please try again later",type: "error" })

    })
  }

  getDifferenceInDays(to:any, from:any) {
    let diff = (from - to)/ (1000 * 60 * 60 * 24);
    if(diff<0){
      return 0
    }
    return Math.round(diff)+1;
  }

  multiply(noOfDays:number,pricePerDay:any){
    return noOfDays*pricePerDay
  }

  getFinalPrice(){
    if(this.pendingBookings.length>0){
      this.bookingService.getFinalPrices(this.pendingBookings).subscribe(res=>{
        console.log(res);
        this.finalPrice=res
  })
    }
  }


}
