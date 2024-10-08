import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Used in login form materialUi
// import {NgIf} from '@angular/common';  
// Ends
import * as http from '@angular/common/http'
// BootstapModeule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// MaterialUI Modules
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

// MaterialUI Modeules Ends
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesTemplateComponent } from './components/notes-template/notes-template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarDetailsComponent } from './components/navbar-details/navbar-details.component';
import { NavbarToggleComponent } from './components/navbar-toggle/navbar-toggle.component';
import { SpecificNoteComponent } from './components/specific-note/specific-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NotesComponent,
    NotesTemplateComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    FooterComponent,
    NavbarDetailsComponent,
    NavbarToggleComponent,
    SpecificNoteComponent,
    AddNoteComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    http.HttpClientModule,
    // NgIf,
    NgbModule,
    BrowserAnimationsModule,

    // MaterialUI Modules imports
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
