import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profileForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      jobTitle: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],

    })
  }

  getDate(event) {
    const date = new Date(event.target.value).toISOString().substring(0, 10);

    this.profileForm.get('birthDate').setValue(date, {
      onlyself: true
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.profileForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.profileForm.value)
    }
  }

  get errorControl() {
    return this.profileForm.controls;
  }
}