import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './users.routing.module';
import { UserComponent } from './components';
import { UsersComponent } from './components/users.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
  declarations: [UserComponent, UsersComponent],
})
export class UserModule {}
