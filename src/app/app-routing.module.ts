import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const homeModule = () => import('./home/home.module').then((x) => x.HomeModule);

const routes: Routes = [
  { path: '', loadChildren: homeModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
