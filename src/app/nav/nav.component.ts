import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ModesService } from '../services/modes.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Item } from '../_models/Item';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  bsModalRef?: BsModalRef;

  constructor(public modes: ModesService, public accountService: AccountService, private toastr: ToastrService, private modalService: BsModalService){

  }
  ngOnInit(): void {
  }
  

  login(){
    this.accountService.logIn(this.model).subscribe({
      next: () =>  this.toastr.success("Successfully logged in!")
    }
    ) 
  }



  logout(){
    if (confirm("Do you really want to log out?")){
      this.accountService.logout();
      this.modes.registerModeOff();
    }
    else
      return;
  }

  addItem(){
    const initialState: ModalOptions = {
      initialState: {
        item: new Item(),
        title: 'Add item'
      }
    };
    this.bsModalRef = this.modalService.show(AddItemComponent, initialState);
    this.bsModalRef.content.bsModalRef = this.bsModalRef;

  }
}
