import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user.interface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'display-profiles-tab',
  templateUrl: 'display-profiles-tab.page.html',
  styleUrls: ['display-profiles-tab.page.scss']
})
export class DisplayProfilesPage {
  userServiceAPIBaseURL: string = environment.userServiceAPIBaseURL;
  users: Array<User> = [];

  constructor(private alertController: AlertController, public userService: UserService) { }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe(
      (usersData: Array<User>) => {
        this.users = usersData.map((user: User) => {

          const profilePhoto: string = `${this.userServiceAPIBaseURL}/user/${user._id}/photo`
          const parsedUser = {
            ...user,
            profilePhoto
          };
          
          return parsedUser;
        });
      },
      async (response) =>  {
        let alert;

        if (response.error?.message) {
          alert = await this.alertController.create({
            header: 'Fail!',
            subHeader: 'Not able to store Profile Image!',
            message: response.error?.message[0],
            buttons: ['OK'],
          });
        } else {
          alert = await this.alertController.create({
            header: 'Fail!',
            subHeader: 'Not able to get users!',
            message: 'Please, try again',
            buttons: ['OK'],
          });
        }
        await alert.present();
      }
    );
  }
}
