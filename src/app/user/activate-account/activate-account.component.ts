import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  state : string = "activated" ;

  constructor(private _ServiceUser : UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  activate(token:HTMLInputElement){
    let user : User = new User() ;
   
    user.id = +localStorage.getItem("addeduser");
    this._ServiceUser.ActivateAccount(token.value,user)
    .subscribe((response : Response) => {
      console.log(response);
      //if(response.status == 200)
      this.router.navigate(['/login/'+this.state]);
    });
  }
}
