import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../upload/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  urls: any[] = new Array<any>();
  breakpoint
  thumbnail: any;

  


  constructor(private serv: FileUploadService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    const item = sessionStorage.getItem('urls')
    if(item != null){
      const urls_json = JSON.parse(item)
      for (const x in urls_json){
        let filename = urls_json[x]
        filename = filename.replace(".jpeg", ".jpg")
        this.urls.push(filename)
      }
    }
    

    if (window.innerWidth > 1270){
      this.breakpoint = 5
    }else if(window.innerWidth > 1070 && window.innerWidth <= 1270){
      this.breakpoint = 4
    }else if(window.innerWidth > 870 && window.innerWidth <= 1070){
      this.breakpoint = 3
    }else if(window.innerWidth > 670 && window.innerWidth <= 870){
      this.breakpoint = 2
    }else if(window.innerWidth > 470 && window.innerWidth <= 670){
      this.breakpoint = 1
    }
    
  }


  onResize(event) {
    if (event.target.innerWidth > 1270){
      this.breakpoint = 5
    }else if(event.target.innerWidth > 1070 && event.target.innerWidth <= 1270){
      this.breakpoint = 4
    }else if(event.target.innerWidth > 870 && event.target.innerWidth <= 1070){
      this.breakpoint = 3
    }else if(event.target.innerWidth > 670 && event.target.innerWidth <= 870){
      this.breakpoint = 2
    }else if(event.target.innerWidth > 470 && event.target.innerWidth <= 670){
      this.breakpoint = 1
    }
  }

  onDelete(event: string){
    const index = this.urls.indexOf(event);
    if(index !== -1){
      this.urls.splice(index, 1)
    }
    let item = sessionStorage.getItem('urls')
    let urls_json = JSON.parse(item)
    for(let x in urls_json){
      if(urls_json[x] == event){
        delete urls_json[x]
      }
    }
    sessionStorage.setItem('urls', JSON.stringify(urls_json))
  }

}
