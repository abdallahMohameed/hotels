import { Injectable, Injector } from '@angular/core';
import { BookingModel } from '../models/booking-model';
import { BaseserviceService } from './baseservice.service';
import { NotficationService } from './notfication.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseserviceService {
  constructor(inj: Injector,
    private NotificationService: NotficationService,
    ) {
    super(inj);
  }
  
  pendingBookings:BookingModel[]=[]
  getRoomBookedDates(roomId:number) {
    const url = this.getUrlConfigurations().getRoomBookedDates+roomId;
    return this.get<any>(url);
}

addPending(booking:BookingModel){
  var isNotRepeted=true
for (let i = 0; i < this.pendingBookings.length; i++) {
  var from=booking.bookingFrom?.toDateString() == this.pendingBookings[i].bookingFrom?.toDateString()
  var to=booking.bookingTo?.toDateString() == this.pendingBookings[i].bookingTo?.toDateString()
  var dateCheck= (new Date(booking.bookingTo!.toDateString()).getTime()) > (new Date(booking.bookingFrom!.toDateString()).getTime()) 

   if(from &&to && dateCheck&&
    booking.roomId == this.pendingBookings[i].roomId &&
    booking.userId == this.pendingBookings[i].userId) {
      isNotRepeted= false
      this.NotificationService.setNotification({ message:"this Booking is already in your cart !",type: "error" })
   }

   if(!dateCheck){
    this.NotificationService.setNotification({ message:"please add a valied Date Range !",type: "error" })

   }

}
  if(isNotRepeted){
    this.pendingBookings.push(booking)
    this.NotificationService.setNotification({ message:"Booking added,make another booking or proceed to reservations",type: "success" })

    
  }
  console.log(this.pendingBookings);
  
  
}

addNewBooking(booking:BookingModel[]){
  const url = this.getUrlConfigurations().addnewBooking;
      
  return this.post<any>(url,booking);
}

getRoomById(id:number){
  const url = this.getUrlConfigurations().getRoomById+id;
      
  return this.get<any>(url);
}

getFinalPrices(booking:BookingModel[]){
  const url = this.getUrlConfigurations().getFinalPrices;
  return this.post<any>(url,booking);
}
}
