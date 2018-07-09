import { Address } from './../../models/address';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private _ServiceUser : UserService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  form_address = new FormGroup({
    country : new FormControl('',[Validators.required]),   
    street : new FormControl('',[Validators.required,Validators.minLength(8)]),
    city : new FormControl('',[Validators.required,Validators.minLength(8)]),
    state : new FormControl('',[Validators.required,Validators.minLength(8)]),
    zip : new FormControl('',[Validators.required,,Validators.minLength(4),Validators.maxLength(4)])
  });
  
  locateYoursef(form_address:NgForm){
    let a : Address = new Address();

    a.country = form_address.value.country;
    a.street = form_address.value.street;
    a.city = form_address.value.city;
    a.state = form_address.value.state;
    a.zip = form_address.value.zip;
    var id;
    console.log(a);

    this.route.params
    .switchMap((params: Params) => this._ServiceUser.Add_Address(a,+params['id']))
    .subscribe(address=>{
      this.router.navigate(['/confirmation'])
    })
  }

  get country(){
    return this.form_address.get('country');
  }

  get street(){
    return this.form_address.get('street');
  }

  get city(){
    return this.form_address.get('city');
  }

  get state(){
    return this.form_address.get('state');
  }

  get zip(){
    return this.form_address.get('zip');
  }

  isFieldValid(field: string) {
    return !this.form_address.get(field).valid && this.form_address.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  /*locateYoursef(country:HTMLInputElement,street:HTMLInputElement,city:HTMLInputElement,state:HTMLInputElement,zip:HTMLInputElement){
    let a : Address = new Address();

    a.country = country.value;
    a.street = street.value;
    a.city = city.value;
    a.state = state.value;
    a.zip = zip.value;
    var id;
    console.log(a);

    this.route.params
    .switchMap((params: Params) => this._ServiceUser.Add_Address(a,+params['id']))
    .subscribe(address=>{
      this.router.navigate(['/confirmation'])
    }
     
    );*/

   /* this._ServiceUser.Add_Address(a,id)
    .subscribe((response: Response)=>{
            console.log(""+response);
            this.router.navigate(['/login']);
    })*/
    
  
}
