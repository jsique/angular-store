import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [HomeComponent,NavigationBarComponent],
  imports: [
    CommonModule, HomeRoutingModule,FormsModule,
    //BrowserModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class HomeModule { }
