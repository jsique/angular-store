import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalSymbolName } from 'typescript';
import { shoppingCart } from '../models/shoppingCart';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  //I declare a temporary array of type shoppingCart
  TmpArrayShopCar : Array<shoppingCart> = [];
  //variable of the total to pay
  total=0;
  constructor(
    private prodS:ProductsService,
    private router: Router
  ) { 
    //I initialize the TmpArrayShopCar array and set it equal to the arrayShopCar array which is the shopping cart list
    this.TmpArrayShopCar =this.prodS.arrayShopCar
  }
  //initialize the component view
  ngOnInit(): void {
    console.log(this.TmpArrayShopCar)
    this.total = this.fncTotal()
    console.log("total a pagar: ",this.total)
  }

  //function that calculates the total to pay
  fncTotal():any{
    let subtotal=0
    this.TmpArrayShopCar.forEach(function(item, index){
      console.log(item.amount)
      subtotal+=item.amount
    })
    return subtotal
  }
  //cancel function, leaves the cart to zero and returns to home
  fncCancel():any{
    this.TmpArrayShopCar.length=0
    this.total=0
    return this.router.navigate(['home'])
  }

  //checkout shopping cart function
  fncPayCart():any{
    //I go through the TmpArrayShopCar to be able to update the document in the firestore Database one by one
    for(let i=0; i<=(this.TmpArrayShopCar.length-1); i++){
      console.log("i",i,"id_product",this.TmpArrayShopCar[i])
      //I update the available of the product in the list
      this.prodS.updateProduct(this.TmpArrayShopCar[i].id_product,this.TmpArrayShopCar[i].available)
    }
    //I reset the cart to zero
    this.TmpArrayShopCar.length=0
    //return to home to start again
    return this.router.navigate(['home'])
  }

}
