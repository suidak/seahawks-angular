import { Fundraiser } from './../../models/fundraiser';
import { FundraiserService } from './../../service/fundraiser.service';
import { Subscription } from 'rxjs/Rx';

import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';


@Component({
  selector: 'app-fundraiserdetail',
  templateUrl: './fundraiserdetail.component.html',
  styleUrls: ['./fundraiserdetail.component.css'],
  providers: [NgbProgressbarConfig]
})
export class FundraiserdetailComponent implements OnInit {

  timer: number;
  timerSettings: any = {
      display: 'inline',
      targetTime: 10,
      maxWheel: 'minutes',
      minWidth: 100,
      onFinish: function () {
          
      }
  };

  constructor(
    private fb: FacebookService,
    private _fundraiserService:FundraiserService,
    private route: ActivatedRoute,
    private router: Router) {
      // customize default values of progress bars used by this component tree
      console.log('Initializing Facebook');
      
          fb.init({
            //appId: '1927971220769787',
            appId: '101926993710005',
            //version: 'v2.9'
            version: 'v2.9'
          });
    }
    login() {
      this.fb.login()
        .then((res: LoginResponse) => {
          console.log('Logged in', res);
        })
        .catch(this.handleError);
    }

    private handleError(error) {
      console.error('Error processing action', error);
    }

      /**
   * Login with additional permissions/options
   */
  loginWithOptions() {
    
        const loginOptions: LoginOptions = {
          enable_profile_selector: true,
          return_scopes: true,
          scope: 'public_profile,user_friends,email,pages_show_list'
        };
    
        this.fb.login(loginOptions)
          .then((res: LoginResponse) => {
            console.log('Logged in', res);
          })
          .catch(this.handleError);
    
      }
    
      getLoginStatus() {
        this.fb.getLoginStatus()
          .then(console.log.bind(console))
          .catch(console.error.bind(console));
      }
    
    
      /**
       * Get the user's profile
       */
      getProfile() {
        this.fb.api('/me')
          .then((res: any) => {
            console.log('Got the users profile', res);
          })
          .catch(this.handleError);
      }
    
    
      /**
       * Get the users friends
       */
      getFriends() {
        this.fb.api('/me/friends')
          .then((res: any) => {
            console.log('Got the users friends', res);
          })
          .catch(this.handleError);
      }
    
    
      /**
       * Show the share dialog
       */
      share(url?) {
    
        const options: UIParams = {
          method: 'share',
          //href: 'https://github.com/zyramedia/ng2-facebook-sdk'
          href: url
        };
    
        this.fb.ui(options)
          .then((res: UIResponse) => {
            console.log('Got the users profile', res);
          })
          .catch(this.handleError);
    
      }




sub:Subscription;
fundraiserid;

fundraiser: Fundraiser = new Fundraiser();
currentRate = 3.69;


    ngOnInit() {
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.fundraiserid = +params['id'] || 0;
        });
        console.log("Id from QueryParam : "+this.fundraiserid);
        this.getFundraiserById();
        
        
        
    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    getFundraiserById(){
      
      this._fundraiserService.getFundraiserById(this.fundraiserid).subscribe(response => {
        this.fundraiser = response;
        console.log("returned fundraiser "+this.fundraiser);
        this.currentRate = (this.fundraiser.collectedDonations*5)/this.fundraiser.goal;
        console.log("rate: "+this.currentRate);
      });
      
    }
  

}
