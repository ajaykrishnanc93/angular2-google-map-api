import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import 'rxjs/Rx';


@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
 
 
})

export class HomeComponent implements  OnInit {

  
	private products = [];
	private options = new RequestOptions(
	{ 
	headers: new Headers(
	{ 
	'Content-Type': 'application/json',
	 'charset': 'UTF-8' })
	 });
private isMap = false;
	private isEditing = false;
	private isSearching = false;
	private isAdding = false;
	private product = {};

	private infoMsg = { body: "", type: "info"};

	private addProductForm: FormGroup;
	private pname = new FormControl("", Validators.required);
	private lat = new FormControl("", Validators.required);
	private lng = new FormControl("", Validators.required);

	constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
		this.addProductForm = this.formBuilder.group({
			pname: this.pname,
			lat: this.lat,
			lng: this.lng
		});

		this.loadProducts();
	}

	loadProducts() {
		this.http.get("/products").map(res => res.json()).subscribe(
			data => this.products = data,
			error => console.log(error)
		);
	}

	
	 
	 enableEditing(product) {
		this.isEditing = true;
		this.product = product;
	}
enableMap(){
		this.isMap = true;
		this.product = {};
		
		this.loadProducts();
	}

	
	cancelEditing() {
		this.isEditing = false;
		this.product = {};
		
		this.loadProducts();
	}

	
	enableSearching(name){
		this.isSearching = true;
		this.http.get("/products/"+name).map(res => res.json()).subscribe(
			data => this.products = data,
			error => console.log(error)
		);
	}
	
	cancelMap(){
	this.isMap = false;
		this.product = {};
		
		this.loadProducts();
	}
	
	
	submitEdit(product) {
		this.http.put("/product/"+product._id, JSON.stringify(product), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.product = product;
				},
			error => console.log(error)
		);
	
	}

    submitRemove(product) {
		var delOptions = new RequestOptions({
			body: '', 
			headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
		);
		if(window.confirm("Do you want to permanently delete this item?")) {
			this.http.delete("/product/"+product._id, delOptions).subscribe(
				res => {
					var pos = this.products.map((e) => { return e._id }).indexOf(product._id);
					this.products.splice(pos, 1);
					
				},
				error => console.log(error)
			);
		}
	}

	
	enableAdding() {
		this.isAdding = true;
		this.product = {};
		
		this.loadProducts();
	}
    cancelAdd() {
		this.isAdding = false;
		this.product = {};
		this.loadProducts();
	}
	
	cancelSearch() {
		this.isSearching = false;
		this.product = {};
		this.loadProducts();
	}
	
	
	submitAdd() {
		this.http.post("/product", JSON.stringify(this.addProductForm.value), this.options).subscribe(
			res => {
				this.products.push(res.json()); 
				this.addProductForm.reset();
			},
			error => console.log(error)
		);
	}
	


 }