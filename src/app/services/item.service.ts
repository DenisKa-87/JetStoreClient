import { Injectable } from '@angular/core';
import { ItemsParams } from '../_models/itemsParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../_models/category';
import { environment } from 'src/environments/environment.development';
import { Item } from '../_models/Item';
import { map } from 'rxjs';
import { ItemDto } from '../_models/itemDto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }
  itemsParams = new ItemsParams();

  getUserParams() {
    return this.itemsParams;
  }

  setItemParams(params: ItemsParams) {
    this.itemsParams = params;
  }


  getItems(itemParams: ItemsParams) {
   // let params = getPaginationHeaders(userParams.pageNumber, userParams.itemsPerPage);
    let params = new HttpParams();
    params = params.append('categoryId', itemParams.categoryId);
    params = params.append('maxPrice', itemParams.MaxPrice);
    params = params.append('minPrice', itemParams.MinPrice);
    params = params.append('minQuantity', itemParams.MinQuantity);
    params = params.append('maxQuantity', itemParams.MaxQuantity)
    params = params.append('name', itemParams.name)
    params = params.append('order', itemParams.Order);

    return this.http.get<Item[]>(environment.apiUrl + 'items', {observe: 'response', params}).pipe(
      map(response => {
          var result = response.body;
          return result;
      })
  )
    //return getPaginatedResult<Record[]>(environment.apiUrl + 'records', itemParams, this.http)
  }

  addItem(item: ItemDto) {
    return this.http.post<Item>(environment.apiUrl + "items/", item)
  }

  updateItem(item: ItemDto): any{
    return this.http.put(environment.apiUrl + 'items/', item)
  }

  deleteItem(itemId: Number): any {
    return this.http.delete(environment.apiUrl + "items/" + itemId)
  }


}
