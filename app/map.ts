import {Component, OnInit} from '@angular/core';
import {Input, Output} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
	selector: 'map',
	templateUrl: 'app/map.html'
 })
 export class MapComponent implements  OnInit{
  private products = [];

  @Input() lat:any;
 @Input() lng:any;
 @Input() pname:string;
 
 constructor(private http: Http,private _router: Router){}
  
  ngOnInit() {
	this.loadProducts();
	
	}
 	
	loadProducts() {
		this.http.get("/products").map(res => res.json()).subscribe(
			data => this.products = data,
			error => console.log(error)
		);
	}

	marker(){}
 
 
 }