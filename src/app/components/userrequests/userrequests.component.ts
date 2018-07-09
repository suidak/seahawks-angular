import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { AdoptionRequest } from '../../models/adoptionrequest';
import { AnimalPhoto } from '../../models/animalphoto';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';
import { AdoptionrequestService } from '../../service/adoptionrequestservice/adoptionrequest.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-userrequests',
  templateUrl: './userrequests.component.html',
  styleUrls: ['./userrequests.component.css']
})
export class UserrequestsComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  loggedin: boolean = localStorage.getItem("currentUser") ? true : false;

  sub: Subscription;

  requests: AdoptionRequest[] = [];
  animalPics: AnimalPhoto[] = [];

  userid: number;

  constructor(
    private animalPhotoService: AnimalphotoserviceService,
    private adoptionRequestService: AdoptionrequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.userid = +params['userid'] || 0;

      if (this.userid != 0) {
        let member = new User();
        member.id = this.userid;
        this.adoptionRequestService.getAdoptionRequestsByMember(member).subscribe(resp => {
          this.requests = resp.json();

          this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
            this.animalPics = resp.json();
          });
        });
      } else {
        this.router.navigate(['/offers']);
      }
    });
  }

  deleteAdoptionRequest(id: number) {
    let request = new AdoptionRequest();
    request.id = id;
    this.adoptionRequestService.deleteAdoptionRequest(request).subscribe();
    this.requests.splice(this.requests.indexOf(request), 1);
  }
}