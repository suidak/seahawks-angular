import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connected : boolean = false;
  constructor(private _ServiceUser : UserService,private router: Router) { }

  ngOnInit() {
   if(localStorage.getItem("isConnected")=="true"){
     this.connected = true;
   }
   else
    this.connected = false;
  }
  logout(event){
    localStorage.setItem("isConnected","false");
    localStorage.setItem("currentUser",null);
    localStorage.setItem("currentUserId",null);
    localStorage.setItem("addeduser",null);
    this.router.navigate(['/login/nothing']);
  }
}
