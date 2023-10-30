import { Component } from '@angular/core';
import {Note} from "../Model/Note";
import {ActivatedRoute} from "@angular/router";
import {NotesService} from "../services/notes.service";

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.css']
})
export class NoteViewerComponent {
  note: Note | null;

  constructor(private route: ActivatedRoute, private noteService: NotesService) {
    this.note = null;
  }

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Fetch the note based on the 'id'
      this.noteService.getNoteById(Number(id)).subscribe((note) => {
        this.note = note;
      });
    }
  }
}
