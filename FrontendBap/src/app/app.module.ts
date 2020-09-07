import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { DetailimageComponent } from './detailimage/detailimage.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UploadComponent,
    DownloadComponent,
    DetailimageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    NgxDropzoneModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
