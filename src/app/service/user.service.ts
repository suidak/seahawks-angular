import { Address } from './../models/address';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private url : string ='http://localhost:18080/seahawks-web/rest/';
  private header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: Http) { }

  registerAsOrganisation(org: User) {
        return this.http.post(this.url+"organisation",org).map(resp=>resp.json());
      }

  registerAsMember(member: User) {
    return this.http.post(this.url+"member",member).map(resp=>resp.json());
  }
  
  login(username: string, password:string) {
    //let body = new URLSearchParams();
    let body = `username=${username}&password=${password}`;
    //body.set('username', username);
    //body.set('password', password);
    
    return this.http.post(this.url+"users/authentificate", body,{headers: this.header})
                .map((response: Response) => {
                    
                      let user = response.json();
                      if (user) {
                        localStorage.setItem("isConnected","true");
                          localStorage.setItem('currentUser', JSON.stringify(user));
                          localStorage.setItem('currentUserId', JSON.stringify(user.id));
                          localStorage.setItem('addeduser', JSON.stringify(user.id));
                          console.log("uid after login : "+localStorage.getItem('currentUserId'));
                      }
                    
                    
                });
    
  }
  
  Add_Address(a: Address,id : number){
    return this.http.post(this.url+"address/?id="+id,a);
  }
  UploadPhoto(formData: FormData){
    return this.http.post(this.url+"users",formData);
  }
  ActivateAccount(token : string, u : User){
    return this.http.put(this.url+"users/"+token,u).map(resp=>resp.json());
  }

  getUserById(u : User){
    return this.http.post(this.url+"users/getFull",u)
    .map((response:Response)=>response.json())
    .map((res=>new User(res.id,res.login,res.email,res.password,res.photo,res.phoneNumber,res.token,res.lastLogin,res.status,res.address,res.role,res.firstName,res.lastName,res.vet,res.foundDate,res.orgName)));
  }

  changePassword(old_password : string, new_password : string, u :User ){
    return this.http.put(this.url+"member/change/"+old_password+"/"+new_password,u).map(resp=>resp.json());
  }

  modifyUser(member : User){
    return this.http.put(this.url+"member/modifyMember",member).map(resp => resp.json());
  }

  modifyAddress(address : Address){
    return this.http.put(this.url+"address",address).map(resp => resp.json());
  }

  desactivateAccount(user : User){
    return this.http.put(this.url+"member/desactivate",user).map(resp=> resp.json());
  }

  getBackAccount(user : User){
    return this.http.put(this.url+"member/forgotByMail",user).map(resp=> resp.json());
  }

  getAllOrg(){
    return this.http.get(this.url+"organisation/getAllorgs").map(resp=>resp.json());
  }
  

}
