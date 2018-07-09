import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgForm, FormGroup, FormControl, Validators , FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  u : User = new User();
  constructor(private _ServiceUser : UserService,private router: Router) { }

  ngOnInit() {
    
  }

  form_change = new FormGroup({
    oldPwd : new FormControl('',[Validators.required,Validators.minLength(8)]),   
    newPwd : new FormControl('',[Validators.required,Validators.minLength(8)])
  });
  
  changePwd(form_change :NgForm){
    let user = new User();
    var id = localStorage.getItem('currentUserId');
    user.id = +id;
    this._ServiceUser.getUserById(user).subscribe(response=>{
      this.u=response;
      console.log("current user is : "+ this.u.id +"--"+this.u.firstName +"--"+this.u.lastName +"--"+this.u.email)
      this._ServiceUser.changePassword(form_change.value.oldPwd,form_change.value.newPwd,this.u).subscribe(resp=>{
        this.router.navigate(['/login/nothing']);
        //console.log(resp.json());
      });
    })
    
    
    
  }

  get oldPwd(){
    return this.form_change.get('oldPwd');
  }

  get newPwd(){
    return this.form_change.get('newPwd');
  }

  isFieldValid(field: string) {
    return !this.form_change.get(field).valid && this.form_change.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  
}
