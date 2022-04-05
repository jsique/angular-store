import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  //I declare the id parameter which is the id_product from which the detail will be shown
  id: string | null;
  //I declare an array of the product values ​​to display
  product = {
    name :'',
    image:'',
    price :0,
    available :0
  }
  constructor(private productService: ProductsService, private router: Router, private aRoute : ActivatedRoute ) {
    //I initialize the id to obtain the id_product that is being sent in the url
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  //initialize the component view
  ngOnInit(): void {
    //command to call the getProduct function to display the product detail on the screen
    this.getProduct()
  }
  //getProduct function that uses the ProductsService service to obtain the values ​​of the product designating
  getProduct(){
    //console.log(this.id)
    this.productService.getProduct(this.id).subscribe(data=>{
      console.log(data.payload.data()['name'])
      this.product.name = data.payload.data()['name'];
      this.product.image = data.payload.data()['image'];
      this.product.price = data.payload.data()['precio'];
      this.product.available = data.payload.data()['disponible'];
    })
  }

}
