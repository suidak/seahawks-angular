import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {

  state : string = "activated" ;
  
  constructor(private _ServiceUser : UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  Confirm(token:HTMLInputElement){
    let user : User = new User() ;
    //var  id =32 ;
    //this.route.params.switchMap((params: Params) => id = params['id']);
    //console.log(id);
    user.id = +localStorage.getItem("addeduser");
    this._ServiceUser.ActivateAccount(token.value,user)
    .subscribe((response : Response) => {
      console.log(response);
      //if(response.status == 200)
      this.router.navigate(['/login/'+this.state]);
    });
  }

}
