import { Component } from '@angular/core';
import { Item } from '../_models/Item';
import { Category } from '../_models/category';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ItemService } from '../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ItemsParams } from '../_models/itemsParams';
import { ItemCardComponent } from '../item-card/item-card.component';
import { AccountService } from '../services/account.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  items: Item[]
  itemsParams = new ItemsParams();
  categories: Category[] = []
  sortingList = [{value: 'price', display: 'Price'}, {value: 'pricedesc', display: 'Price descending'}, 
  {value: 'category', display: 'Category'}, {value: 'quantity', display: 'Quantity'}, {value: 'quantitydesc', display: 'Quantity descending'}  ]
  bsModalRef?: BsModalRef;


  constructor(public itemsService: ItemService, private toastr: ToastrService, private modalService: BsModalService,
     public accountService: AccountService, private categoryService: CategoryService){
   // this.userParams = recordService.getUserParams();
  }
  ngOnInit(): void {
     this.getCategories();
     console.log(this.categories)
    this.getItems();
  }
  getCategories(){
    return this.categoryService.getCategories().subscribe(x => this.categories = x)
  }

  getItems(){
    this.itemsService.setItemParams(this.itemsParams)
    this.itemsService.getItems(this.itemsParams).subscribe(x => {
      this.items = x;
     // this.pagination = x.Pagination;

    }); 
  }

  editItem(item: Item){
    const initialState: ModalOptions = {
      initialState: {
        item: item,
        title: 'View details'
      }
    };
    this.bsModalRef = this.modalService.show(ItemCardComponent, initialState);
    this.bsModalRef.content.bsModalRef = this.bsModalRef;

  }

  deleteItem(recordId: number){
    this.itemsService.deleteItem(recordId).subscribe(x => {
      this.toastr.warning(x.message)
    })
    this.getItems();
  }
}
