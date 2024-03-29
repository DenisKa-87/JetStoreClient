import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModesService } from '../services/modes.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(public mode: ModesService, public accountService: AccountService){
  }
  ngOnInit(): void {
    this.signInMode$ = this.mode.registerMode.subscribe(x => this.signInMode = x )
    //this.addRecordMode$ = this.mode.addRecordMode.subscribe(x => this.addRecordMode = x )
  }
  signInMode$: Subscription
  //addRecordMode$: Subscription
  signInMode = false;
  //addRecordMode = false;

  toggleSignInMode(){
    //this.mode.registrationMode = true;
    this.signInMode = true;
  }

  exitSignInMode(event: boolean){
    //this.mode.signInMode = event;
    this.signInMode = event;
  }

}
