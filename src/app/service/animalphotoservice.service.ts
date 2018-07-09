import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AnimalphotoserviceService {

  private base: string = "http://localhost:18080/seahawks-web/rest";
  private token: string = "";
  private encHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private authHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getAllAnimalPics(){
    return this.http.get(this.base+"/animals/photos");
  }

  getAnimalPics(id:number){
    return this.http.get(this.base+"/animals/photos/"+id);
  }

  addImage(image, id: number) {
    let data = { "photo" : image };
    console.log(data);
    return this.http.post(this.base + "/animals/photos?id=" + id, data, { headers: this.authHeaders });
  }
}
