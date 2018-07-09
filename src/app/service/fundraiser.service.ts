import { Fundraiser } from './../models/fundraiser';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class FundraiserService{
    
    private url : string = 'http://127.0.0.1:18080/seahawks-web/rest/fundraiser';
    fundraisers: Fundraiser[]=[];
    constructor(private http: Http){}

    getAllFundraisers(){
         return this.http.get(this.url+"/open/")
                         .map((response: Response) => response.json());
                         //.map((res => new Fundraiser(res.id, res.startDate, res.endDate, res.title, res.goal, res.description, res.state, res.collectedDonations, res.location))));
          
         
    }
    addFundraiser(fundraiser: Fundraiser){
        return this.http.post(this.url,fundraiser);
        //.map(resp => resp.json());
    }

    removeFundraiser(f: Fundraiser){
        return this.http.delete(this.url, new RequestOptions({   
            body: new Fundraiser(f.id)
         }));
    }

    updateFundraiser(f: Fundraiser){
        return this.http.put(this.url+"/byid/", new RequestOptions({   
            body: new Fundraiser(f.id)
         })).map(resp => resp.json());
    }
    
    getFundraiserById(idF: number){
        return this.http.get(this.url+"/byid/"+idF)
        .map((response: Response) => response.json())
        .map((res => new Fundraiser(res.id, res.startDate, res.endDate, res.title, res.goal, res.description, res.state, res.collectedDonations,res.launcher, res.location)));
    }
    
    getRemainingDays(idFundraiser: number){
        return this.http.get(this.url+"/remaining/"+idFundraiser)
        .map((response: Response) => response.json());
        
    }

    searchFundraisers(params?: any) {
        if (!params) {
          return this.fundraisers;
        }
        
        return this.fundraisers.filter((item) => {
          for (let key in params) {
            let field = item[key];
            if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return item;
            } else if (field == params[key]) {
              return item;
            }
          }
          return null;
        });
      }
    
}