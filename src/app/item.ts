import { Ingredient } from "./ingredient";
import { Restaurant } from "./restaurant";

export class Item {
    id : number;
    name : string;
    price : Number;
    category : string;
    subcategory: string;
    ingredients : Array<Ingredient>;
    restaurant : Restaurant;
    value? : boolean;
}
