import { User } from "./user";
import { AdoptionOffer } from "./adoptionoffer";

export class AdoptionRequest{
    constructor(
        public id?: number,
        public description?: string,
        public status?: number,
        public adopter?:User,
        public offer?:AdoptionOffer){
    }
}