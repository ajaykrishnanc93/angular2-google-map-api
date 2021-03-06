import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {OrderBy} from './pipes';
import {ProductService} from './product.service';
import {MapComponent} from './map';
import {DetailsComponent} from './details';
import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
    imports: [BrowserModule,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule,
 RouterModule.forRoot([
       { path: '', component:HomeComponent },
		   {path:'Details/:_id',component:DetailsComponent}
      
	  ]),
    	 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgtZl_6Gvo8qMPtS6GaWHYVTTBBy18fr0'
    })	  ],
    declarations: [AppComponent,SearchComponent,OrderBy,MapComponent,DetailsComponent,
  
    			   
    			   HomeComponent],
    providers: [ProductService],
    bootstrap: [AppComponent]
})

export class AppModule {}