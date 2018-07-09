import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AdoptionRequest } from '../../models/adoptionrequest';
import { User } from '../../models/user';
import { AdoptionOffer } from '../../models/adoptionoffer';

@Injectable()
export class AdoptionrequestService {

  private base: string = "http://localhost:18080/seahawks-web/rest";
  private token: string = "";
  private encHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private authHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addAdoptionRequest(r:AdoptionRequest){
    return this.http.post(this.base+"/adoprequests", r, { headers: this.authHeaders });
  }

  updateAdoptionRequest(r:AdoptionRequest){
    return this.http.put(this.base+"/adoprequests", r, { headers: this.authHeaders });
  }

  deleteAdoptionRequest(r:AdoptionRequest){
    return this.http.delete(this.base+"/adoprequests", { body: r, headers: this.authHeaders });
  }

  getAdoptionRequestsByMember(u:User){
    return this.http.post(this.base+"/adoprequests/userrequests", u, { headers: this.authHeaders });
  }

  getAdoptionRequestsByOffer(o:AdoptionOffer){
    return this.http.post(this.base+"/adoprequests/offerrequests", o, { headers: this.authHeaders });
  }

  processAdoptionRequest(r:AdoptionRequest, decision:boolean){
    return this.http.put(this.base+"/adoprequests/acceptreq?decision="+decision, r, { headers: this.authHeaders });
  }
}
