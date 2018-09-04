import { UnitPrice } from './unit-price';
import { Tax } from './tax';
export class PaypalItem {
    name:string;
    quantity:number;
    unit_price:UnitPrice;
    tax:Tax;
}

