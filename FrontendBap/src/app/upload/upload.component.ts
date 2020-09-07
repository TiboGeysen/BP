import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: File[] = [];
  uploadForm: FormGroup; 

  constructor(private http: HttpClient, private serv: FileUploadService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  onFileSelect(event) {

    //const file = event.addedFiles;
    //console.log(file)
    this.files.push(...event.addedFiles)
    console.log(this.files)

  }
  onSubmit() {
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      formData.append('file', this.files[i]);
    }

    this.serv.uploadImages(formData).subscribe(res =>{
      console.log("Received")
      let item = sessionStorage.getItem('urls')
      item = JSON.parse(item)
      console.log(item)
      console.log(res)
      if(item == null){
        sessionStorage.setItem('urls', JSON.stringify(res))
      }else{
        let count = 0
        for(let x in res){
          item[count.toString() + 'x'] = res[x]
          count += 1
        }
        sessionStorage.setItem('urls', JSON.stringify(item))
      }
      

    },err =>{console.log(err)}
    )
  }

  /*onSubmit() {

    //console.log(event);
    //this.files.push(...event.addedFiles);
    const formData = new FormData();
    
    
    
    console.log(formData.forEach(
      c => c.slice
    ))

    this.serv.uploadImages(formData).subscribe(res =>{
      console.log(res)},err =>{console.log(err)}
    )
  }*/



  onRemove(event) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);

  }

}
