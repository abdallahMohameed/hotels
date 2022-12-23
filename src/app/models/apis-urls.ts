export class APIsUrls {
    constructor() {
        this.Login = "api/users/login";
        this.register="api/users"
        this.getAllBranches="api/branches"
        this.getRoomBookedDates="api/bookings/GetroomBookedDays/"
        this.addnewBooking="api/bookings/addNewBooking"
        this.getRoomById="api/Rooms/"
        this.getFinalPrices="api/bookings/getPrices"
    }

    Login: string;
    register:string
    getAllBranches:string
    getRoomBookedDates:string
    addnewBooking:string;
    getRoomById:string
    getFinalPrices:string
}
