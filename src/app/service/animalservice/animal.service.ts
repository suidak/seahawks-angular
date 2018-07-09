import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Animal } from '../../models/animal';

@Injectable()
export class AnimalService {

  private base: string = "http://localhost:18080/seahawks-web/rest";
  private token: string = "";
  private encHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private authHeaders = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getAllAnimals() {
    return this.http.get(this.base + "/animals");
  }

  getUserAnimals(id: number) {
    return this.http.get(this.base + "/animals/byuser?uid=" + id);
  }

  getUserUnlistedAnimals(id: number) {
    return this.http.get(this.base + "/animals/unlisted?uid=" + id);
  }

  getLastIndex() {
    return this.http.get(this.base + "/animals/index");
  }

  addAnimal(a: Animal) {
    return this.http.post(this.base + "/animals", JSON.stringify(a), { headers: this.authHeaders });
  }

  updateAnimal(a: Animal) {
    return this.http.put(this.base + "/animals", JSON.stringify(a), { headers: this.authHeaders });
  }

  deleteAnimal(a: Animal) {
    return this.http.delete(this.base + "/animals", { body: JSON.stringify(a), headers: this.authHeaders });
  }

  getAnimalsBySpecie(specie: string) {
    return this.http.get(this.base + "/animals/" + specie);
  }

  getAnimalsBySpecieAndBreed(specie: string, breed: string) {
    return this.http.get(this.base + "/animals/" + specie + "/" + breed);
  }

  // for publicity, encourage people to adopt
  averageAnimalsNbrPerUser() {
    return this.http.get(this.base + "/animals/stats/useravgpets");
  }

  nbrOfAnimalsPerSpecieOrBreed(specie: string, breed: string) {
    if (breed == "") {
      return this.http.get(this.base + "/animals/stats?specie=" + specie);
    }
    return this.http.get(this.base + "/animals/stats?breed=" + breed);
  }

  nbrOfAdoptionsPerSpecie() {
    return this.http.get(this.base + "/animals/stats/adopsperspecie");
  }

  getMostAdoptedAnimal() {
    return this.http.get(this.base + "/animals/stats/mostadopted");
  }
}
