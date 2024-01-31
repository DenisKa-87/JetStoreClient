import { Item } from "./Item";
import { Feature } from "./feature";
import { MeasureUnit } from "./measureUnit";

export class ItemDto {
    Id: number;
    Name: string;
    Description: string;
    ImageUrl: string;
    Price: number;
    Quantity: number;
    CategoryId: number = 0;
    Features: Feature[] = [];
    MeasureUnitId: number;

    public static create(item: Item) {
        var newDto = new ItemDto();
        newDto.Id = item.Id;
        newDto.Name = item.Name;
        newDto.Description = item.Description;
        newDto.ImageUrl = item.ImageUrl;
        newDto.Price = item.Price;
        newDto.Quantity = item.Quantity;
        newDto.CategoryId = item.Category.Id === null ? 0 : item.Category.Id;
        newDto.Features = item.Features;
        newDto.MeasureUnitId = item.Unit.Id;
        return newDto;
    }
}