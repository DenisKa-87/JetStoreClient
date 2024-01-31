import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor (private accountService: AccountService){

  }

  ngOnInit(): void {
    this.setCurrentUser();
  }
  title = 'Jet Store';

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
