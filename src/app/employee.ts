import { Restaurant } from './restaurant';
import { Address } from './address';
import { User } from './user';

export class Employee {
    id:number;
    email : string;
    firstName : string; 
    lastName : string;
    role : string;
    restaurant : Restaurant;
    address : Address;
    phone:string;
    user:User
}
