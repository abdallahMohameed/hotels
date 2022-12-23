import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './signIn/sign-in/sign-in.component';
import { RegisterComponent } from './signIn/register/register.component';
import { BookingComponent } from './booking/booking/booking.component';
import { BookingDetailsComponent } from './booking/booking-details/booking-details.component';
import { NotifierModule } from 'angular-notifier';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    BookingComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  NotifierModule.withConfig({position: {
    horizontal: {
        position: 'right',
        distance: 12
    },
    vertical: {
        position: 'top',
        distance: 12,
        gap: 10
    }
}}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
