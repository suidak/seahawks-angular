import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  u : User = new User();
  
  constructor(private _ServiceUser : UserService, private router: Router, private route: ActivatedRoute) { }

  myParam : string = "nothing";
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>this.myParam = params['state']);
    console.log(this.myParam);
  }

  login(username: HTMLInputElement,password: HTMLInputElement){
    console.log(username.value);
    console.log(password.value);
    this._ServiceUser.login(username.value,password.value).subscribe(resp=>{
      let user = new User();
      if(user == null){
        console.log("not connected");
      }else{
        var id = localStorage.getItem('currentUserId');
        user.id = +id;
        if(localStorage.getItem('currentUserId')==null){
          console.log("not connected !!!!!!!!!!!!!!!!!"); 
          this.myParam="failed";                   
          this.router.navigate(['/login/failed']);
        }
        else{
          this._ServiceUser.getUserById(user).subscribe(response=>{
            this.u=response;
            console.log("current user is : "+ this.u.id +"--"+this.u.firstName +"--"+this.u.lastName +"--"+this.u.status)
            if(this.u.status == "activated"){
              console.log("connected !!!!!!!!!!!!!!!!!");            
              this.router.navigate(['/profile-member']);
            }
            else if(this.u.status == "desactivated"){
              console.log("account desactivated !!!!!!!!!!!!!!!!!");            
              this.myParam="desactivated";
              this.router.navigate(['/login/desactivated']);
            }
            else if(this.u.status == "waitingForConfirmation"){
              console.log("account waiting !!!!!!!!!!!!!!!!!");            
              this.myParam="waitingForConfirmation";
              this.router.navigate(['/login/waitingForConfirmation']);
            }
          })
        }
      }
    
      
      
      
    },
  error=>{
    swal(
      'Oops...',
      'Email or password invalid !',
      'error'
    )
    console.log(error.text());
  })
  }
  activate(event){
    this._ServiceUser.getBackAccount(this.u).subscribe(resp =>{
      this.router.navigate(['/activation']);
    })
  }

}
