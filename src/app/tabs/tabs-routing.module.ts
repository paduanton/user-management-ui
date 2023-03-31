import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {CreateProfilePageModule} from '../create-profile-tab/create-profile-tab.module'
import { DisplayProfilesPageModule } from '../display-profiles-tab/display-profiles-tab.module'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'create-profile',
        children: [
          {
            path: '',
            loadChildren: () => CreateProfilePageModule
          }
        ]
      },
      {
        path: 'display-profiles',
        children: [
          {
            path: '',
            loadChildren: () => DisplayProfilesPageModule
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/create-profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/create-profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
