import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  numPro:number =0
  constructor(private authService : AuthService, private producService: ProductsService) { }

  ngOnInit(): void {
    this.producService.trigger.subscribe(data=>{
      this.numPro = data.data
    });
  }

  LogOut(){
    this.authService.SignOut();
  }

}
