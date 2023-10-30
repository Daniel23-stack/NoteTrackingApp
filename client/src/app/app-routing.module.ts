import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import {NoteEditComponent} from "./note-edit/note-edit.component";
import {NoteCreateComponent} from "./note-create/note-create.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {NoteViewerComponent} from "./note-viewer/note-viewer.component";

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/create', component: NoteCreateComponent },
  { path: 'notes/edit/:id', component: NoteEditComponent },
  { path: 'note-viewer/:id', component: NoteViewerComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
