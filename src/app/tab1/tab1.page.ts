import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profileForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public userService: UserService) { }
  
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      birthDate: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      jobTitle: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(5)]],
      street: ['', [Validators.required, Validators.minLength(5)]],
      state: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  getDate(event) {
    const date = new Date(event.target.value)?.toISOString()?.substring(0, 10);

    this.profileForm.get('birthDate').setValue(date, {
      onlyself: true
    })
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.profileForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      const { firstName, lastName, birthDate, phoneNumber, jobTitle, city, street, state} = this.profileForm.value;

      const userData = {
        first_name: firstName,
        last_name:lastName,
        birth_date:birthDate,
        street: street ,
        job_title: jobTitle,
        city: city,
        state: state,
        phone_number: phoneNumber
      }
      await this.userService.createUser(userData);
      this.isSubmitted = false;
      this.profileForm.reset();
    }
  }

  get errorControl() {
    return this.profileForm.controls;
  }
}