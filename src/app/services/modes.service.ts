import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModesService {

  public registerMode = new Subject<boolean>();
  //public addRecordMode = new Subject<boolean>();
  
  constructor() { }

  registerModeOn(){
    this.registerMode.next(true)
    console.log('register mode on' )
  }

  registerModeOff(){
    this.registerMode.next(false)
  }
  // addRecordModeOn(){
  //   this.addRecordMode.next(true)
  // }
  // addRecordModeOff(){
  //   this.addRecordMode.next(false)
  // }
}
