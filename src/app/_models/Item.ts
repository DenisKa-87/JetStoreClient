import { Category } from "./category";
import { Feature } from "./feature";
import { MeasureUnit } from "./measureUnit";

export class Item{
    Id: number = 0;
    Name: string;
    Description: string;
    ImageUrl: string;
    Price: number;
    Quantity: number;
    Category: Category;
    Features: Feature[];
    Unit: MeasureUnit;
}