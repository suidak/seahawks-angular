import { FundraiserService } from './../../service/fundraiser.service';
import { Fundraiser } from './../../models/fundraiser';
import { FacebookService, UIParams, UIResponse, LoginResponse, LoginOptions } from 'ngx-facebook';

import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { trigger, state, style, transition, animate} from '@angular/animations';


@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('40000ms ease-in-out')),
      transition('out => in', animate('40000ms ease-in-out'))
    ]),
  ]
})
export class FundraiserComponent implements OnInit {
  searchTerm:string="";
  p: number = 1;
  connectedUserId = localStorage.getItem('currentUserId');
  toggled:boolean=false;
  //menuState:string = 'in';
  position = 'before';
  data: any[] = [];
  fundraiser : Fundraiser = new Fundraiser();
  //dependency injection
  constructor(
    private _fundraiserService:FundraiserService,
    private fb: FacebookService) { 
      
      this.getAllFundraisers();
    //this.addFundraiser();
    
      
  }
  ngOnInit() {
    //this.getAllFundraisers();

    this._fundraiserService.getAllFundraisers().subscribe(data => {
      // Read the result field from the JSON response.
      this.data = data;
      console.log(this.data);
    });

    this.fb.init({
      //appId: '1927971220769787',
      appId: '101926993710005',
      //version: 'v2.9'
      version: 'v2.9'
    });
  }


  getAllFundraisers() {
    //subscribe will actually execute the http request
    this._fundraiserService.getAllFundraisers().subscribe(data => {
      // Read the result field from the JSON response.
      this.data = data;
      console.log(this.data);
    });
  }
  removeFundraiser(f:Fundraiser){
    this._fundraiserService.removeFundraiser(f)
    .subscribe(response => {
      //var index= this.data.indexOf(f);
      //this.data.splice(this.data.indexOf(f),1);
      console.log("Removed Fundraiser:" +f);
      
    });

    this.getAllFundraisers();
  }

  searchFundraisers(ev) {
    let val = ev.target.value;
    let params = {
      title: val
    };

    if(val==""){
      this.getAllFundraisers();
      return;
    }
    let tempData : any[]=[];
    tempData = this.data.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      
    });

    if(tempData.length > 0){
      this.data=tempData;
    }
    else{
      return;
    }

   
  }

  toggleChat(){
    this.toggled=!this.toggled;
    //this.menuState = this.menuState === 'out' ? 'in' : 'out';
    
  }

  hideChat(res){
    if(res==2){
      this.toggled=false;
    }
    
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
  
  
    
    share(url) {
  
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


}
