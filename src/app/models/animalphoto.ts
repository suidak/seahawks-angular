import { Animal } from "./animal";

export class AnimalPhoto{
    constructor(
        public id?: number,
        public photo?: string,
        public animal?: Animal){
    }
}