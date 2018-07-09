import { Fundraiser } from "./fundraiser";

export class Fundonation {
    constructor(
        public id?:number,
        private  amount?:number,
        private donationDate?:Date,
        private fundraiser?:Fundraiser,
       // private donator:Member
    ){}
}