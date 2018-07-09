import { AnimalPhoto } from './animalphoto';
import { User } from "./user";

export class Animal{
    constructor(
        public id?: number,
        public age?: number,
        public breed?: string,
        public castrated?: boolean,
        public fostered?: boolean,
        public height?: number,
        public lost?: boolean,
        public sex?: string,
        public specie?: string,
        public status?: string,
        public weight?: number,
        public owner?: User,
        public singleimage?: AnimalPhoto,
        public photo?: AnimalPhoto[]
    ){
    }
}