import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
            loadChildren: () =>
              import('../create-profile-tab/create-profile-tab.module').then(m => m.CreateProfilePageModule)
          }
        ]
      },
      {
        path: 'display-profiles',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../display-profiles-tab/display-profiles-tab.module').then(m => m.DisplayProfilesPageModule)
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
