import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AdoptionOffer } from '../../models/adoptionoffer';

@Injectable()
export class AdoptionofferService {

  private base: string = "http://localhost:18080/seahawks-web/rest";
  private token: string = "";
  private encHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private authHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addAdoptionOffer(a:AdoptionOffer){
    return this.http.post(this.base+"/adopoffers", a, { headers: this.authHeaders });
  }

  updateAdoptionOffer(a:AdoptionOffer){
    return this.http.put(this.base+"/adopoffers", a, { headers: this.authHeaders });
  }

  deleteAdoptionOffer(a:AdoptionOffer){
    return this.http.delete(this.base+"/adopoffers", { body: a, headers: this.authHeaders });
  }

  getSpecies(){
    return this.http.get(this.base+"/adopoffers/species");
  }

  getBreeds(specie: string){
    return this.http.get(this.base+"/adopoffers/breeds?specie="+specie);
  }

  getOfferById(id:number){
    return this.http.get(this.base+"/adopoffers/byid?id="+id);
  }

  getPendingOffers(uid: number){
    return this.http.get(this.base+"/adopoffers/pending/"+uid);
  }

  getUserAdoptionOffers(id:number){
    return this.http.get(this.base+"/adopoffers/byuser?user="+id);
  }

  getUserPendingAdoptionOffers(id:number){
    return this.http.get(this.base+"/adopoffers/byuser/pending?user="+id);
  }

  getPendingAdoptionOffersBySpecie(specie:string){
    return this.http.get(this.base+"/adopoffers/specie?specie="+specie);
  }

  getPendingAdoptionOffersBySpecieBreed(specie:string, breed:string){
    return this.http.get(this.base+"/adopoffers/speciebreed?specie="+specie+"&breed="+breed);
  }

  averagePricePerSpecie(){
    return this.http.get(this.base+"/adopoffers/avgprices");
  }
}
