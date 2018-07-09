import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from './../../models/address';
import { UserService } from './../../service/user.service';
import { User } from './../../models/user';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/components/fileupload/fileupload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-org',
  templateUrl: './register-org.component.html',
  styleUrls: ['./register-org.component.css']
})
export class RegisterOrgComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;

  constructor(private _ServiceUser : UserService,private router: Router) {
    
   }

  ngOnInit() {
    console.log(new Date().toLocaleString())
    
  }

  // form validation
  form_register = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(6)]),   
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword : new FormControl('',[Validators.required]),
    phoneNumber : new FormControl('',[Validators.required,,Validators.minLength(8),Validators.maxLength(8)]),
    orgname : new FormControl('',[Validators.required,Validators.minLength(6)]),
    founddate:new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  registerAsOrg(form_register:NgForm){
    let photo: string;
    let m : User = new User(); 
    m.login = form_register.value.username;
    m.email=form_register.value.email;
    m.password=form_register.value.password;
    m.phoneNumber=form_register.value.phoneNumber;
    m.orgName=form_register.value.orgname;
    m.foundDate=form_register.value.founddate;
    //m.address=new Address(2);
    this.fileInput.files.forEach(file => {photo = file.name});
    m.photo = photo;
    console.log(m);
    this._ServiceUser.registerAsOrganisation(m)
       .subscribe(response=>{
        console.log("response before: "+response.id);
        var id = response.id;
        localStorage.setItem('addeduser',id);
         //this.router.navigate(['/address/'+id]);
       })
   
  }


  get username(){
    return this.form_register.get('username');
  }

  get email(){
    return this.form_register.get('email');
  }
  
  get password(){
    return this.form_register.get('password');
  }

  get confirmPassword(){
    return this.form_register.get('confirmPassword');
  }
  
  get phoneNumber(){
    return this.form_register.get('phoneNumber');
  }

  get orgname(){
    return this.form_register.get('phoneNumber');
  }

  get founddate(){
    return this.form_register.get('phoneNumber');
  }

  
  isFieldValid(field: string) {
    return !this.form_register.get(field).valid && this.form_register.get(field).touched;
  }

  isDateValid(field: string) {
    return !(this.form_register.get(field).value  < new Date().toLocaleString())  && this.form_register.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  dateFieldCss(field: string) {
    return {
      'is-date': this.isDateValid(field)
    };
  }
  isMatched(field: string,field2: string) {
    return !(this.form_register.get(field).value  == this.form_register.get(field2).value)  && this.form_register.get(field2).touched;
  }
  matchedFieldCss(field: string,field2: string) {
    return {
      'is-matched': this.isMatched(field,field2)
    };
  }
  


/*
  registerAsOrg(username,email,password,phoneNumber,vet,orgName,foundDate){
    let o : User = new User();

    o.login = username;
    o.email=email;
    o.password=password;
    o.phoneNumber=phoneNumber;
    o.vet=vet;
    o.orgName=orgName;
    o.foundDate=foundDate;
    o.address=new Address(2);
    console.log(o.login);
     this._ServiceUser.registerAsOrganisation(o)
        .subscribe(response=>{
          console.log(response);
        })
  
   
    
  
  }
  */
}
