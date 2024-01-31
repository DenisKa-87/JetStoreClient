import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MeasureUnit } from '../_models/measureUnit';

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitService {

  constructor(private http: HttpClient) { }

  getMeasureunits() {
    return this.http.get<MeasureUnit[]>(environment.apiUrl + 'MeasureUnit')
  }

  addCategory(unit: MeasureUnit){
    this.http.post(environment.apiUrl + 'MeasureUnit', unit)
  }

  deleteCategory(unit: MeasureUnit){
    this.http.delete(environment.apiUrl + 'Categories/' + unit.Id)
  }

  updateCategory(unit: MeasureUnit){
    this.http.put(environment.apiUrl + 'Categories', unit)
  }
}
