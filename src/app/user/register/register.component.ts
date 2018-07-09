import { PasswordValidation } from './../Directives/password-validation';
import { RouterModule } from '@angular/router';
import { router, routes } from './../../app.router';
import { Address } from './../../models/address';
import { UserService } from './../../service/user.service';
import { User } from './../../models/user';
import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from "@angular/router";
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { EqualValidator } from '../Directives/matching-password'
import { FileUpload } from 'primeng/primeng';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;
  constructor(private _ServiceUser : UserService, private router: Router) {
      
   }

  ngOnInit() {
  }

   // form validation
   form_register = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(6)]),   
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword : new FormControl('',[Validators.required]),
    phoneNumber : new FormControl('',[Validators.required,,Validators.minLength(8),Validators.maxLength(8)]),
    firstName : new FormControl('',[Validators.required,Validators.minLength(6)]),
    lastName:new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

    registerAsMember(form_register:NgForm){
      let photo: string;
      let m : User = new User(); 
      m.login = form_register.value.username;
      m.email=form_register.value.email;
      m.password=form_register.value.password;
      m.phoneNumber=form_register.value.phoneNumber;
      m.firstName=form_register.value.firstName;
      m.lastName=form_register.value.lastName;
      //m.address=new Address(2);
      this.fileInput.files.forEach(file => {photo = file.name});
      m.photo = photo;
      console.log(m);
      this._ServiceUser.registerAsMember(m)
         .subscribe(response=>{
          console.log("response before: "+response.id);
          var id = response.id;
          localStorage.setItem('addeduser',id);
           this.router.navigate(['/address/'+id]);
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
    

    
    get firstName(){
      return this.form_register.get('firstName');
    }

    get lastName(){
      return this.form_register.get('lastName');
    }
    
    

   
    isFieldValid(field: string) {
      return !this.form_register.get(field).valid && this.form_register.get(field).touched;
    }

    isMatched(field: string,field2: string) {
      return !(this.form_register.get(field).value  == this.form_register.get(field2).value)  && this.form_register.get(field2).touched;
    }
    displayFieldCss(field: string) {
      return {
        'has-error': this.isFieldValid(field),
        'has-feedback': this.isFieldValid(field)
      };
    }

    matchedFieldCss(field: string,field2: string) {
      return {
        'is-matched': this.isMatched(field,field2)
      };
    }

    
    
}
