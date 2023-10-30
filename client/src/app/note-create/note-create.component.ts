import { Component } from '@angular/core';
import {Note} from "../Model/Note";
import {NotesService} from "../services/notes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };

  constructor(private noteService: NotesService, private router: Router) {}
  onSubmit() {
    this.noteService.createNote(this.newNote).subscribe((createdNote) => {
      console.log('New note created:', createdNote);
      this.newNote = { title: '', content: '' };
    });
  }

}
