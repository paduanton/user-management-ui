import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userServiceAPIBaseURL: string = environment.userServiceAPIBaseURL;
  users: Array<Object> = [];

  constructor(public userService: UserService) { }

  ngOnInit() {
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
        console.log(response)
      },
      (response) =>  {
        if (response.error?.message) {
          alert(response.error?.message)
        } else {
          alert('Not able to get users, please try again');

        }
      }
    );
  }
}
