import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CitiesComponent } from './cities.component';
import { CitiesRoutingModule } from './cities.routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CitiesRoutingModule],
  declarations: [CitiesComponent],
})
export class CitiesModule {}
