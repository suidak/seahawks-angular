import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AdoptionOffer } from '../../models/adoptionoffer';
import { AnimalPhoto } from '../../models/animalphoto';
import { AdoptionofferService } from '../../service/adoptionofferservice/adoptionoffer.service';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';
import { AdoptionrequestService } from '../../service/adoptionrequestservice/adoptionrequest.service';
import { AdoptionRequest } from '../../models/adoptionrequest';
import { User } from '../../models/user';

@Component({
  selector: 'app-requestadoption',
  templateUrl: './requestadoption.component.html',
  styleUrls: ['./requestadoption.component.css']
})
export class RequestadoptionComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  loggedin: boolean = localStorage.getItem("currentUser")? true : false;

  sub: Subscription;
  offerid: number = 0;
  offer: AdoptionOffer;

  animalPics: AnimalPhoto[] = [];

  responseText: string;

  constructor(
    private adoptionOfferService:AdoptionofferService, 
    private animalPhotoService:AnimalphotoserviceService,
    private adoptionRequestService:AdoptionrequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.offerid = +params['id'] || 0;
      if (this.offerid != 0){
        this.adoptionOfferService.getOfferById(this.offerid).subscribe(resp => {
          this.offer = resp.json();
  
          this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
            this.animalPics=resp.json();
          });
        });
      } else {
        this.router.navigate(['/offers']);
      }
    });
  }

  addAdoptionRequest(description: string){
    let request = new AdoptionRequest();
    let adopter = new User();
    let tempOffer = new AdoptionOffer();

    adopter.id = this.currentUser.id;

    request.description = description;
    request.status = 0;
    tempOffer.id = this.offer.id;
    request.offer = tempOffer;
    request.adopter = adopter;

    this.adoptionRequestService.addAdoptionRequest(request).subscribe(resp => {
      this.responseText = resp.text();
      console.log(this.currentUser.id);
      this.router.navigate(['/userrequests/' + this.currentUser.id]);
    });
  }
}
