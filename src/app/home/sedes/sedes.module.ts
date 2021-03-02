import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SedesComponent } from './sedes.component';
import { SedesRoutingModule } from './sedes.routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SedesRoutingModule],
  declarations: [SedesComponent],
})
export class SedesModule {}
