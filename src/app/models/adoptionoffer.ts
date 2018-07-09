import { Animal } from "./animal";

export class AdoptionOffer{
    constructor(
        public id?: number,
        public offerDate?: Date,
        public price?: number,
        public animal?:Animal,
        public removable?:boolean){
    }
}