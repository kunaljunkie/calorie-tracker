import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select'; 
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserDetailsComponent,
    UserDataComponent,
    UserListComponent,
    ConfirmationDialogComponentComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    BrowserAnimationsModule,

    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
