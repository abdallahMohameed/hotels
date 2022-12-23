import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './booking/booking-details/booking-details.component';
import { BookingComponent } from './booking/booking/booking.component';
import { RegisterComponent } from './signIn/register/register.component';
import { SignInComponent } from './signIn/sign-in/sign-in.component';


const routes: Routes = [
  
  { path: '', component: SignInComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details', component: BookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
