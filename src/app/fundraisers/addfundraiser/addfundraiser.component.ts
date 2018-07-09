import { Fundraiser } from './../../models/fundraiser';
import { User } from './../../models/user';
import { FundraiserService } from './../../service/fundraiser.service';

import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfundraiser',
  templateUrl: './addfundraiser.component.html',
  styleUrls: ['./addfundraiser.component.css']
})
export class AddfundraiserComponent implements OnInit {
  connectedUserId = localStorage.getItem('currentUserId');
  constructor(
    private _fundraiserService:FundraiserService,
    private router: Router) { }

  ngOnInit() {
  }


  addFundraiser(title, goal, enddate, description){
    let fundraiser : Fundraiser = new Fundraiser();
    fundraiser.title=title;
    fundraiser.goal = goal;
    fundraiser.description = description;
    fundraiser.endDate=enddate;
    //connected User
    fundraiser.launcher = new User(parseInt(this.connectedUserId));
    fundraiser.location = "http://www.beliefnet.com/columnists/depressionhelp/files/2017/07/scared-kitten-shutterstock_191443322-300x225.jpg";
    //months start from 0
    //fundraiser.endDate = new Date(2017, 11, 30, 10, 0);
    console.log(fundraiser);
    this._fundraiserService.addFundraiser(fundraiser).subscribe(response => {
      console.log(response);
      //this.getAllFundraisers();
      if(response.status=201){
        this.router.navigate(['/fundraisers']);
      }
      
    });

    
    
  }
}
