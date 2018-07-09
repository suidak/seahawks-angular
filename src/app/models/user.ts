import { Address } from './address';

export class User {
    constructor(
        public id?: number,
        public login?: string,
        public email?: string,
        public password?: string,
        public photo?: string,
        public phoneNumber?: string,
        public token?: string,
        public lastLogin?: Date,
        public status?: string, 
        public address?: Address,
        public role?: string,
        public firstName?: string,
        public lastName?: string,
        public vet?: boolean,
        public foundDate?: Date,
        public orgName?: string,
        public dtype?: string,
        
    ) { }
}