import { router } from './../../app.router';
import { Address } from './../../models/address';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import  swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-member',
  templateUrl: './profile-member.component.html',
  styleUrls: ['./profile-member.component.css']
})
export class ProfileMemberComponent implements OnInit {

  u : User = new User();
  lat: number = -32.9477132;
  lng: number = -60.630465800000025;
  my_path : string  = "C:/Users/oumayma gader/Documents/workspace java EE/javaee/seahawks-web/src/main/webapp/assets/users/2457b144-00b8-41f7-958a-3591ad1582f1467022.png";
  
  constructor(private _ServiceUser : UserService,private router: Router) { }
  ngOnInit() {
    let user = new User();
    var id = localStorage.getItem('currentUserId');
    user.id = +id;
    this._ServiceUser.getUserById(user).subscribe(response=>{
      this.u=response;
      console.log("current user is : "+ this.u.id +"--"+this.u.firstName +"--"+this.u.lastName +"--"+this.u.email)
    })
  }

  ModifiyMember(u,$event,str:string):void{
    console.log($event.value);
    let member : User;
    member=u;
    if(str=="email"){ 
      member.email=$event.value;
    }
    if(str=="login"){ 
      member.login=$event.value;
    }
    if(str=="phoneNumber"){ 
      member.phoneNumber=$event.value;
    }
    if(str=="firstName"){ 
      member.firstName=$event.value;
    }
    if(str=="lastName"){ 
      member.lastName=$event.value;
    }
    
  
    this._ServiceUser.modifyUser(member).subscribe(memberUpdated => {
      console.log("updated:"+ memberUpdated)
    });
  }

  ModifiyAddress(u,$event,str:string):void{
    console.log($event.value);
    let address : Address;
    address = u.address ;
    if(str=="city"){ 
      address.city=$event.value;
    }
    if(str=="country"){ 
      address.country=$event.value;
    }
    if(str=="street"){ 
      address.street=$event.value;
    }
    if(str=="state"){ 
      address.state=$event.value;
    }
    if(str=="zip"){ 
      address.zip=$event.value;
    }
    
  
    this._ServiceUser.modifyAddress(address).subscribe(addressUpdated => {
      console.log("updated:"+ addressUpdated)
    });
  }

  clicked(event) {
    swal({
      title: 'Are you sure?',
      text: "You want to desactivate your account ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, desactivate it!'
    }).then((result) => {
      if (result.value) {
        this._ServiceUser.desactivateAccount(this.u).subscribe(resp=>console.log(resp.json()));
        swal(
          'Desactivate!',
          'Your account has been desactivated.',
          'success'
        )
        localStorage.setItem("currentUser",null);
        localStorage.setItem("currentUserId",null);
        this.router.navigate(['/login/nothing']);
        
      }
    })
  }


  changePwd(event){
  }
}
