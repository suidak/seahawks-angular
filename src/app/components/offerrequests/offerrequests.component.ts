import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { AdoptionRequest } from '../../models/adoptionrequest';
import { AnimalPhoto } from '../../models/animalphoto';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';
import { AdoptionrequestService } from '../../service/adoptionrequestservice/adoptionrequest.service';
import { AdoptionOffer } from '../../models/adoptionoffer';

@Component({
  selector: 'app-offerrequests',
  templateUrl: './offerrequests.component.html',
  styleUrls: ['./offerrequests.component.css']
})
export class OfferrequestsComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  loggedin: boolean = localStorage.getItem("currentUser") ? true : false;

  sub: Subscription;

  requests: AdoptionRequest[] = [];
  animalPics: AnimalPhoto[] = [];

  offerid: number = 0;

  responseText: string;

  constructor(

    private animalPhotoService: AnimalphotoserviceService,
    private adoptionRequestService: AdoptionrequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.offerid = +params['offerid'] || 0;

      if (this.offerid != 0) {
        let offer = new AdoptionOffer();
        offer.id = this.offerid;
        this.adoptionRequestService.getAdoptionRequestsByOffer(offer).subscribe(resp => {
          this.requests = resp.json();

          this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
            this.animalPics = resp.json();
          });
        });
      } else {
        this.router.navigate(['/myoffers']);
      }
    });
  }

  processAdoptionRequest(r:AdoptionRequest, decision: boolean){
    let request = new AdoptionRequest();
    request.id = r.id;
    this.adoptionRequestService.processAdoptionRequest(request, decision).subscribe(resp => {
      this.responseText = resp.text();
      let offer = new AdoptionOffer();
      offer.id = r.offer.id;
      this.adoptionRequestService.getAdoptionRequestsByOffer(offer).subscribe(resp => {
        this.requests = resp.json();
      });
    });
  }
}
