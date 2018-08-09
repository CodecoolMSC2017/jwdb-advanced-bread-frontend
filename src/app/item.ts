import { Ingredient } from "./ingredient";
import { Restaurant } from "./restaurant";

export class Item {
    name : String;
    price : Number;
    category : String;
    ingredients : Array<Ingredient>;
    restaurant : Restaurant;
    value? : boolean;
}
