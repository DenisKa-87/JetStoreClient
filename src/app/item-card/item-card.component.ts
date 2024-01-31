import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../_models/Item';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ItemService } from '../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ItemDto } from '../_models/itemDto';
import { CategoryService } from '../services/category.service';
import { MeasureUnitService } from '../services/measure-unit.service';
import { Category } from '../_models/category';
import { MeasureUnit } from '../_models/measureUnit';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit{
  constructor(private itemsService: ItemService, private toastr: ToastrService, private fb: FormBuilder, public accountService: AccountService,
    private categorysService: CategoryService, private measureUnitsService: MeasureUnitService){
  }

  categories :Category[];
  measureUnits: MeasureUnit[];

  ngOnInit(): void {
    this.initializeForm();
    this.categories = [];
    this.measureUnits = [];
    this.itemDto =  new ItemDto();
    this.measureUnitsService.getMeasureunits().subscribe(x => this.measureUnits = x)
    console.log(this.measureUnits)
    this.categorysService.getCategories().subscribe(x => this.categories = x)
  }
  @Input()item: Item
  @Input()bsModalRef: BsModalRef

  editForm: FormGroup
  itemDto : ItemDto

  initializeForm(){
    this.editForm = this.fb.group({
      Name: new FormControl(this.item.Name),
      Description: new FormControl(this.item.Description),
      Price: new FormControl(this.item.Price),
      Quantity: new FormControl(this.item.Quantity),
      ImageUrl: new FormControl(this.item.ImageUrl),
      CategoryId: new FormControl(this.item.Category.Id),
      UnitId: new FormControl(this.item.Unit.Id)
      
    })
  }

  editRecord(){
    var res = this.editForm.value;
    this.itemDto.Id = this.item.Id
    this.itemDto.CategoryId = res.CategoryId
    this.itemDto.Name = res.Name
    this.itemDto.Price = res.Price
    this.itemDto.Description = res.Description
    this.itemDto.MeasureUnitId = res.UnitId
    this.itemDto.ImageUrl = res.ImageUrl

    this.itemsService.updateItem(this.itemDto).subscribe(() => this.toastr.success("success"))
  }

  deleteItem(itemId){
    this.itemsService.deleteItem(itemId).subscribe(() => this.toastr.success("success"))
  }



}
