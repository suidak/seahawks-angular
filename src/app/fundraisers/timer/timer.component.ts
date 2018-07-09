import { FundraiserService } from './../../service/fundraiser.service';

import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
 
  @Input() 
  fundraiser;
  
  ticks = 0;
  
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;

  sub: Subscription;
  days:number;
  start:number;
  constructor(
    private _fundraiserService:FundraiserService){
        
    }
  
  ngOnInit() {
      
    //   console.log("fundraiser from timer : "+this.fundraiser);
      this.getRemainingDays();
      //console.log("remaining days: "+this.days);
      //this.startTimer();
  }

   startTimer() {
    
      let timer = Observable.timer(96, 1000);
      this.sub = timer
      .map(i => this.start - i)
      .take(this.start + 1)
      .subscribe(
          t => {
              this.ticks = t;
              
              this.secondsDisplay = this.getSeconds(this.ticks);
              this.minutesDisplay = this.getMinutes(this.ticks);
              this.hoursDisplay = this.getHours(this.ticks);
              
          }
      );
  }

  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
       return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
  }



  private pad(digit: any) { 
      return digit <= 9 ? '0' + digit : digit;
  }

  getRemainingDays(){
      //retrieve remaining days and affect it to this.days
      this._fundraiserService.getRemainingDays(this.fundraiser).subscribe(response => {
        this.days = response;
        this.start = (this.days*24*60*60);
        this.startTimer();
        
      });
      
      
  }
}
