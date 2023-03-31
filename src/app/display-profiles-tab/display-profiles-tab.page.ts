import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'display-profiles-tab',
  templateUrl: 'display-profiles-tab.page.html',
  styleUrls: ['display-profiles-tab.page.scss']
})
export class DisplayProfilesPage {
  userServiceAPIBaseURL: string = environment.userServiceAPIBaseURL;
  users: Array<Object> = [];

  constructor(public userService: UserService) { }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe(
      (response: Array<Object>) => {
        this.users = response.map((user: any) => {

          const profilePhoto = `${this.userServiceAPIBaseURL}/user/${user._id}/photo`
          const parsedUser = {
            ...user,
            profilePhoto
          };
          
          return parsedUser;
        });
      },
      (response) =>  {
        if (response.error?.message) {
          alert(response.error?.message[0])
        } else {
          alert('Not able to get users, please try again');
        }
      }
    );
  }
}
