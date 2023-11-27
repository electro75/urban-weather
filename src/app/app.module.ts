import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartService } from './chart.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ButtonsModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
