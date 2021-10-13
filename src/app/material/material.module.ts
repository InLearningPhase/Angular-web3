import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatButtonModule } from  '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule } from  '@angular/material/card';
import {MatFormFieldModule } from  '@angular/material/form-field';
import {MatInputModule } from  '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}