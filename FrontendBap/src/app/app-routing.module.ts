import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'upload', component: UploadComponent},
  {path: 'download', component: DownloadComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
