import { Component, OnInit,NgModule, Pipe, PipeTransform, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  //I create and assign an array to store the list of products
  products: any[] = [];
  
  text = ''; //initialised the text variable
  Search=''
  filter_Product='' //filter of products
  constructor(
    private productService: ProductsService, 
    private authService : AuthService,
    
  ){}
  
  //when entering home I command to call getProducts
  ngOnInit(): void {
    this.getProducts()
  }

  //function to obtain the list of products through the ProductsService service, 
  //when calling it fills the Array products to show the elements of each product
  getProducts() {
    //console.log("en getEmpleados");
    this.productService.getProducts().subscribe(data => {
      this.products = [];
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.products);
    });
  }
  
  //function to log out using the AuthService service
  LogOut(){
    this.authService.SignOut();
  }

  //function to add products to the shopping cart list
  btnShopping(image : string, id_product: string, name:string, price : number, quantity : string  ){
    //I get the user id in session
    let uid = this.authService.userData.uid;
    //calculate the total of the product
    let amount : number = price*Number(quantity);
    //array to store product data
    let tmpProduc = {} 
    //I loop through each element of the 'products' array
    this.products.forEach(function(item, index, array){
      //valid where the id_product of the array is equal to the one you want to store in the cart
      if(item.id===id_product){
        //to the available one I subtract what the user is requesting to store it inside the shopping cart
        item.disponible=Number(item.disponible - Number(quantity))
        //I get the new value of available
        let available =item.disponible
        //I convert the tmpProduct into an element of the array type found in the productService
        tmpProduc = {amount, id_product, name, image, quantity, uid, available}
      }
    })
    //send to the service productService the new product to be stored in the shopping cart
    this.productService.postProductTemp(tmpProduc);
    //I send the notification to the navigation-bar so that it shows the product number in the shopping cart
    this.productService.trigger.emit({
      data:this.productService.numProduct
    })
  }

}
