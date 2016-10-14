
import { Component, OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { ProductService } from "./product.service";
import {Http, Headers, RequestOptions} from '@angular/http';
@Component({
    
    selector: 'app-home-component',
   templateUrl: 'app/details.html'
 })

export class DetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
private product = {};
    id:any;
private sub: any;
    constructor(private route: ActivatedRoute,private productService: ProductService,private http: Http) {
        
    }
 ngOnInit(){
         
    this.sub = this.route.params.subscribe(params => {
        this.id = params['_id'];
        let pid= this.id;
        this.http.get("/productss/"+pid).map(res => res.json()).subscribe(
      data => this.product = data,
      error => console.log(error)
    );
        });
    /* alert(this.id) */
 
  }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
    
      
    
  


	 
	
	
    
   
   

  
  
  