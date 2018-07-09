import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private _ServiceUser : UserService) { }

  ngOnInit() {
  }

  fileChange(event) {   
     let fileList: FileList = event.target.files;  
      var id;
     let file: File = fileList[0];   
     let fileSize:number=fileList[0].size; 
     let formData:FormData = new FormData();  
     formData.append('file',file);  
     formData.append('user', id);  
     
       
     this._ServiceUser.UploadPhoto(formData).subscribe(val => {  
      console.log(val.json())  
    });     
  }
  msgs: Message[];
  
  uploadedFiles: any[] = [];

  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
  
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}