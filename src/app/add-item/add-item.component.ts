import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from '../_models/Item';
import { ItemService } from '../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../_models/category';
import { ItemDto } from '../_models/itemDto';
import { MeasureUnit } from '../_models/measureUnit';
import { MeasureUnitService } from '../services/measure-unit.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
  constructor(private itemsService: ItemService, private toastr: ToastrService, private fb: FormBuilder, public accountService: AccountService,
    private categorysService: CategoryService, private measureUnitsService: MeasureUnitService){
  }
  categories :Category[];
  editForm: FormGroup
  itemDto : ItemDto
  measureUnits: MeasureUnit[]
  
  ngOnInit(): void {
    this.initializeForm();
    this.categories = [];
    this.measureUnits = [];
    this.itemDto =  new ItemDto();
    this.measureUnitsService.getMeasureunits().subscribe(x => this.measureUnits = x)
    console.log(this.measureUnits)
    this.categorysService.getCategories().subscribe(x => this.categories = x)
    
  }


  @Input()bsModalRef: BsModalRef




  initializeForm(){
    this.editForm = this.fb.group({
      Name: new FormControl(""),
      Description: new FormControl(""),
      Price: new FormControl(""),
      ImageUrl: new FormControl(""),
      CategoryId: new FormControl(0),
      Quantity: new FormControl(0),
      UnitId: new FormControl(0)
      
    })
  }

  addRecord(){
    var res = this.editForm.value;
    this.itemDto.CategoryId = res.CategoryId
    this.itemDto.Name = res.Name
    this.itemDto.Price = res.Price
    this.itemDto.Description = res.Description
    this.itemDto.MeasureUnitId = res.UnitId
    this.itemDto.ImageUrl = res.ImageUrl
    this.itemsService.addItem(this.itemDto).subscribe(() => this.toastr.success("success"))
  }



}
