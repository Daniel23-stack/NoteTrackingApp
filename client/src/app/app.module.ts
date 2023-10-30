import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DeleteNoteComponent } from './delete-note/delete-note.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {GoogleApiModule} from "ng-gapi";
import { NoteViewerComponent } from './note-viewer/note-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    ButtonComponent,
    DeleteNoteComponent,
    NoteEditComponent,
    NoteCreateComponent,
    LandingPageComponent,

    NoteViewerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
