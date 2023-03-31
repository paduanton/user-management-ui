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
  alertInfo: {
    header: string,
    subHeader: string,
    isOpen: boolean,
    buttons: Array<string>
  }  = {
    header: '',
    subHeader: '',
    isOpen: false,
    buttons:  ['OK']
  }
  profilePhoto: File = null;

  constructor(public formBuilder: FormBuilder, public userService: UserService) { }
  
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profilePhoto: ['', [Validators.required]],
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

  onProfilePhotoChange(event) {
    this.profilePhoto = event.target.files[0];
  }

  submitForm() {
    this.isSubmitted = true;

    if (!this.profileForm.valid) {
      return false;
    } else {
      const { firstName, lastName, birthDate, phoneNumber, jobTitle, city, street, state } = this.profileForm.value;

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
      this.userService.createUser(userData).subscribe(
        (response: any) => {
          const { _id } = response;

          alert('Profile added succesfully!');

          this.isSubmitted = false;
          this.profileForm.reset();

          const multipartFormData: any = new FormData();
          multipartFormData.append("image", this.profilePhoto);


          this.userService.createUserPhoto(_id, multipartFormData).subscribe(
            (response) => {
              alert('Profile Photo added succesfully!');;
              console.log(response)
            },
            (response) =>  {
              if (response.error?.message) {
                alert(response.error?.message)
              } else {
                alert('Not able to store profile photo, please check the input data and try again (we only all images on profile)');

              }
            }
          );
          
          // this.alertInfo.isOpen = true;
          // this.alertInfo.subHeader ='Check the new profile on the display tab.';
          // this.alertInfo.header ='Profile added succesfully!';
          console.log(response)
        },
        (response) =>  {
          if (response.error?.message) {
            alert(response.error?.message)
          } else {
            alert('Not able to create profile, please check the input data and try again (we only all images on profile)');

          }

          console.log(response)
        }
      );
    }
  }

  openAlertInfo(isOpen: boolean) {
    this.alertInfo.isOpen = isOpen;
  }

  get errorControl() {
    return this.profileForm.controls;
  }
}