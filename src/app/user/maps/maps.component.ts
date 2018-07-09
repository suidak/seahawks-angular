import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  lng: number ;
  lat: number ;
  u : User = new User();
  
  constructor(private _ServiceUser : UserService) {
    let user = new User();
    var id = localStorage.getItem('currentUserId');
    user.id = +id;
    this._ServiceUser.getUserById(user).subscribe(response=>{
      this.u=response;
      this.lat =+  this.u.address.x;
      this.lng =+  this.u.address.y;
      
      console.log("Address is : "+ this.u.address.x +"--"+this.u.address.y )
    })
   }

  ngOnInit() {
    
  }

}
