import { Fundraiser } from './../../models/fundraiser';
import { FundraiserService } from './../../service/fundraiser.service';
import { DonationService } from './../../service/donation.service';

import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
 

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  connectedUserId = localStorage.getItem('currentUserId');
  hideForm:boolean=false;
  //Variables related to Stripe API
  elements: Elements;
  card: StripeElement;
  @ViewChild('card') cardRef: ElementRef;
  // optional Stripe API parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private _fundraiserService:FundraiserService,
    private _donationService:DonationService,
    private route: ActivatedRoute,
    private router: Router) { }

    
    sub:Subscription;
    fundraiserid;
    fundraiser: Fundraiser = new Fundraiser();
    
    ngOnInit() {
          this.sub = this.route
            .queryParams
            .subscribe(params => {
              
              this.fundraiserid = +params['id'] || 0;
            });
            console.log("Id from QueryParam : "+this.fundraiserid);
            this.getFundraiserById();
            this.stripeTest = this.fb.group({
              name: ['', [Validators.required]],
              amount: ['', [Validators.required]]
            });
            this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
              this.elements = elements;
              // Only mount the element the first time
              if (!this.card) {
                this.card = this.elements.create('card', {
                  style: {
                    base: {
                      iconColor: '#666EE8',
                      color: '#CFD7E0',
                      lineHeight: '40px',
                      fontWeight: 300,
                      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                      fontSize: '18px',
                      '::placeholder': {
                        color: '#CFD7E0'
                      }
                    }
                  }
                });
                this.card.mount(this.cardRef.nativeElement);
              }
            });

        }
    ngOnDestroy() {
          this.sub.unsubscribe();
      }
        getFundraiserById(){
          
          this._fundraiserService.getFundraiserById(this.fundraiserid).subscribe(response => {
            this.fundraiser = response;
          });
          
        }
        donate() {
          const name = this.stripeTest.get('name').value;
          const amount = this.stripeTest.get('amount').value;
          this.stripeService
            .createToken(this.card, { name })
            .subscribe(token => {
              
              console.log(token);
              console.log(name);
              console.log(amount);

              this._donationService.donate("tok_amex",name,amount,this.fundraiserid,this.connectedUserId).subscribe(response => {
                console.log(response);
                this.hideForm=true;
                this._donationService.notifmydevice("0f6f9592-9001-4355-81b8-c91ebe2eb31e").subscribe(res => {
                  console.log("device notified"+res);
                  
                });
              });
              
            });
        }
}
