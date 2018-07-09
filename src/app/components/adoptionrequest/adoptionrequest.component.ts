import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { AdoptionOffer } from '../../models/adoptionoffer';
import { AnimalPhoto } from '../../models/animalphoto';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../service/animalservice/animal.service';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';
import { AdoptionofferService } from '../../service/adoptionofferservice/adoptionoffer.service';
import { User } from '../../models/user';
import { AdoptionrequestService } from '../../service/adoptionrequestservice/adoptionrequest.service';

@Component({
  selector: 'app-adoptionrequest',
  templateUrl: './adoptionrequest.component.html',
  styleUrls: ['./adoptionrequest.component.css']
})
export class AdoptionrequestComponent implements OnInit {

  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  loggedin: boolean = localStorage.getItem("currentUser") ? true : false;

  sub: Subscription;

  norequests: boolean = false;

  adoptionOffers: AdoptionOffer[] = [];
  animalPics: AnimalPhoto[] = [];
  unlistedAnimals: Animal[] = [];

  noanimals: boolean = true;

  responseText: string;

  constructor(
    private animalService: AnimalService,
    private animalPhotoService: AnimalphotoserviceService,
    private adoptionOfferService: AdoptionofferService,
    private adoptionRequestService: AdoptionrequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.adoptionOfferService.getUserAdoptionOffers(this.currentUser.id).subscribe(resp => {
      this.adoptionOffers = resp.json();

      this.adoptionOffers.forEach(x => {
        let offer = new AdoptionOffer();
        offer.id = x.id;
        this.adoptionRequestService.getAdoptionRequestsByOffer(offer).subscribe(resp => {
          x.removable = resp.json() == null ? true : false;
        });
      });

      this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
        this.animalPics = resp.json();
      });
    });

    this.animalService.getUserUnlistedAnimals(this.currentUser.id).subscribe(resp => {
      this.unlistedAnimals = resp.json();
      this.noanimals = this.unlistedAnimals.length != 0 ? false : true;
    });
  }

  addAdoptionOffer(animalid: number, price: number) {
    let offer = new AdoptionOffer();
    let pet = new Animal(animalid);
    let owner = new User(this.currentUser.id);
    owner.dtype = this.currentUser.dtype;
    pet.owner = owner;
    offer.animal = pet;
    offer.price = price;
    offer.offerDate = new Date();

    console.log(JSON.stringify(offer));

    this.adoptionOfferService.addAdoptionOffer(offer).subscribe(resp => {
      this.adoptionOfferService.getUserAdoptionOffers(this.currentUser.id).subscribe(resp => {
        this.adoptionOffers = resp.json();

        this.adoptionOffers.forEach(x => {
          let offer = new AdoptionOffer();
          offer.id = x.id;
          this.adoptionRequestService.getAdoptionRequestsByOffer(offer).subscribe(resp => {
            x.removable = resp.json() == null ? true : false;
          });
        });
      });

      this.animalService.getUserUnlistedAnimals(this.currentUser.id).subscribe(resp => {
        this.unlistedAnimals = resp.json();
      });
    });
  }

  deleteOffer(adopoffer: AdoptionOffer, index: number) {
    let offer = new AdoptionOffer();
    offer.id = adopoffer.id;
    this.adoptionOfferService.deleteAdoptionOffer(offer).subscribe(resp => {
      
    }), err => {
      console.log(err);
    };
    this.adoptionOffers.splice(index, 1);
  }

}
