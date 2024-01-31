import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + 'Categories')
  }

  addCategory(category: Category){
    this.http.post(environment.apiUrl + 'Categories', category)
  }

  deleteCategory(category: Category){
    this.http.delete(environment.apiUrl + 'Categories/' + category.Id)
  }

  updateCategory(category: Category){
    this.http.put(environment.apiUrl + 'Categories', category)
  }
}
