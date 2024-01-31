export class ItemsParams {
    categoryId: number = 0;
    name: string = "";
    MinPrice: number
    MaxPrice: number
    MinQuantity: number
    MaxQuantity: number
    //itemsPerPage: number = 10;
    //pageNumber: number = 1;
    Order: string = "price";
}