import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-detailimage',
  templateUrl: './detailimage.component.html',
  styleUrls: ['./detailimage.component.css']
})
export class DetailimageComponent implements OnInit {

  @Input() url: string;
  @Output() url_delete = new EventEmitter<string>();
  base_url: string = "https://res.cloudinary.com/duupxios4/image/upload/v1597356182/"
  full_url:string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.full_url = this.base_url + this.url
  }

  delete(){
    this.url_delete.emit(this.url);
  }

  download(){
    this.http.get(this.full_url, {
      responseType: 'blob'
    }).subscribe(
      res =>{
        saveAs(res, this.url)
      }
    )
  }

}
