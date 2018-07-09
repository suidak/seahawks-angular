import { Fundraiser } from './../models/fundraiser';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class DonationService{
    constructor(private http: Http){}

    private base : string = 'http://127.0.0.1:18080/seahawks-web/rest/donation';
    private encHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    donate(token,name,amount,fid,mid){
        //let body = username=${username}&password=${password};
        let body = `token=${token}&name=${name}&amount=${amount}&fid=${fid}&mid=${mid}`;
        return this.http.post(this.base+"/donate", body, { headers: this.encHeaders });
    }
    

    notifmydevice(id:string){
        
          /*  let headers = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json'});
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.hamdiEndpoint+"notif.php?id="+id+"&message=your application was accepted",options);*/
        
            
                let data= {
                    app_id: "c82921aa-a872-433d-83b9-91f03b9a1454",
                    include_player_ids : [id],
                    template_id:"f8e90d04-7716-4735-817c-4cf0aa0aa1ca"
                };
                let options = new RequestOptions();
                let headers = new Headers();
                headers.set("Authorization","Basic NmI2NmU2ZGQtMWIxYS00NjA2LTg4MGQtZWQyODViZThjNjY1");
                headers.set("Content-Type","application/json");
                options.headers= headers;
              return   this.http.post("https://onesignal.com/api/v1/notifications",JSON.stringify(data),options);
        
           
        }

}