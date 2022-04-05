/**
 * we import the libraries, services and models to use
 */
import { Injectable, NgZone, Output , EventEmitter} from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import {  Observable } from 'rxjs';
import { shoppingCart } from '../models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //I use the @Output decorator to output a value
  @Output() trigger: EventEmitter<any> = new EventEmitter()
  //I declare an Array of model type shoppingCart to use it as temporary for the shopping cart
  public arrayShopCar : Array<shoppingCart> = [];
  //I declare the variable that I am going to emit
  //, which is the one that will show the notification of the number of products in the cart
  public numProduct : number =0

    constructor(private firestore: AngularFirestore,public ngZone: NgZone) {
  }
  //function to get all the products found in the 'products' collection of the firestore Database
  getProducts(): Observable<any> {
    return this.firestore.collection('products', ref => ref.orderBy('name', 'asc')).snapshotChanges();
  }
  //function to get a single product from the collection via the 'doc' method
  getProduct(id: string) : Observable<any>{
    return this.firestore.collection('products').doc(id).snapshotChanges();
  }
  //function to update the available per collection product
  updateProduct(id : string, quantity : number) {
    return this.firestore.collection('products').doc(id).update({disponible : quantity})
  }
  
  //function to store each product in the Array arrayShopCar
  //if a modification is made to the product already entered, it only replaces it
  //I assign to numProduct the number of elements of the array after each insertion
  postProductTemp (productTemp :any){
    let pos = this.arrayShopCar.findIndex(product => product.id_product===productTemp.id_product)
    if(pos>0 && pos!=0 ){
      this.arrayShopCar.splice(pos,1,productTemp);
    }
    else if (pos==0){
      this.arrayShopCar.shift();
      this.arrayShopCar.unshift(productTemp);
    }
    else{
      this.arrayShopCar.push(productTemp);
    }
    this.numProduct = this.arrayShopCar.length;
  }
}


