import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAuthPage } from './user-auth.page';

const routes: Routes = [
  {
    path: '',
    component: UserAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAuthPageRoutingModule {}
