import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { HomeComponent } from './home.component';

const userModule = () =>
  import('./users/users.module').then((x) => x.UserModule);

const citiesModule = () =>
  import('./cities/cities.module').then((x) => x.CitiesModule);

const sedesModule = () =>
  import('./sedes/sedes.module').then((x) => x.SedesModule);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    loadChildren: userModule,
    canActivate: [AdminGuard],
  },
  {
    path: 'cities',
    loadChildren: citiesModule,
    canActivate: [AdminGuard],
  },
  {
    path: 'sedes',
    loadChildren: sedesModule,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
