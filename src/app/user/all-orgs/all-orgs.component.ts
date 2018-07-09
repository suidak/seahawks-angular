import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orgs',
  templateUrl: './all-orgs.component.html',
  styleUrls: ['./all-orgs.component.css']
})
export class AllOrgsComponent implements OnInit {

  orgs : any[];
  constructor(private _serviceUser :UserService) { }

  ngOnInit() {
    this._serviceUser.getAllOrg().subscribe(org => this.orgs = org);
  }

}
