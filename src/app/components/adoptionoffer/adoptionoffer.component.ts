import { Component, OnInit } from '@angular/core';
import { AdoptionOffer } from '../../models/adoptionoffer';
import { AnimalPhoto } from '../../models/animalphoto';
import { AdoptionofferService } from '../../service/adoptionofferservice/adoptionoffer.service';
import { AnimalphotoserviceService } from '../../service/animalphotoservice.service';

@Component({
  selector: 'app-adoptionoffer',
  templateUrl: './adoptionoffer.component.html',
  styleUrls: ['./adoptionoffer.component.css']
})
export class AdoptionofferComponent implements OnInit {
  objectKeys = Object.keys;

  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  loggedin: boolean = localStorage.getItem("currentUser")? true : false;
  
  adoptionOffers: AdoptionOffer[] = [];
  animalPics: AnimalPhoto[] = [];
  species: string[] = [];
  avgPrices: number[] = [];

  speciesList: string[] = [];
  breedsList: string[] = [];

  constructor(
    private adoptionOfferService:AdoptionofferService, 
    private animalPhotoService:AnimalphotoserviceService) { }

  ngOnInit() {
    this.adoptionOfferService.getPendingOffers(this.currentUser.id).subscribe(resp => {
      this.adoptionOffers=resp.json();

      this.animalPhotoService.getAllAnimalPics().subscribe(resp => {
        this.animalPics=resp.json();
      });
    });
    
    this.adoptionOfferService.averagePricePerSpecie().subscribe(resp => {
      let data=resp.json();

      Object.keys(data).forEach(d => {
        this.species.push(d);
        this.avgPrices.push(data[d]);
      });
    });

    this.adoptionOfferService.getSpecies().subscribe(resp => {
      this.speciesList = resp.json();
    });
  }

  getBreeds(specie: string){
    this.adoptionOfferService.getBreeds(specie).subscribe(resp => {
      this.breedsList = resp.json();
    });
  }

  getPendingOffers(f: any){
    this.adoptionOfferService.getPendingOffers(this.currentUser.id).subscribe(resp => {
      this.adoptionOffers=resp.json();
    });
    f.resetForm();
  }

  getPendingAdoptionOffersBySpecieBreed(specie:string, breed: string){
    if(breed == ""){
      this.adoptionOfferService.getPendingAdoptionOffersBySpecie(specie).subscribe(resp => {
        this.adoptionOffers=resp.json();
      });
    } else {
      this.adoptionOfferService.getPendingAdoptionOffersBySpecieBreed(specie, breed).subscribe(resp => {
        this.adoptionOffers=resp.json();
      });
    }
  }
}
