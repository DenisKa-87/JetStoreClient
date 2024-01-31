import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModesService } from '../services/modes.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  /**
   *
   */

  registerForm: FormGroup;
  validationErrors: string[] = [];
  

  constructor(private accountService: AccountService, private fb: FormBuilder, private toastr: ToastrService,
     private modes: ModesService) { 
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  matchValues(matchTo : string) : ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      email: new FormControl("", Validators.required),
      name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      paternal: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      surname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues('password')])
    })
  }

  signIn(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: (user: User) => {
        this.toastr.success("You have signed in!");
        this.accountService.setCurrentUser(user)
    },
      error: error => this.validationErrors = error
    })
    this.cancel();
  }

  cancel(){
    this.modes.registerModeOff();

  }
}
