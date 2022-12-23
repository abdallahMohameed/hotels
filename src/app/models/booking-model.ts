export class BookingModel {
    userId: number=Number.parseInt(localStorage.getItem("userId")!)
    roomId: number= 0
    bookingFrom?: Date
    bookingTo?:  Date
    room:any
    DifferenceInDays:number=0 
    // = this.getDifferenceInDays(this.bookingTo,this.bookingFrom)


    
}
