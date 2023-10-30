import {Component, OnInit} from '@angular/core';
import {Note} from "../Model/Note";
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "../services/notes.service";

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  editedNote: Note = { id: 0, title: '', content: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NotesService
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    const noteId = +this.route.snapshot.paramMap.get('id'); // Get the note ID from the route parameter
    this.noteService.getNoteById(noteId).subscribe((note) => {
      this.editedNote = note;
    });
  }
  onSubmit(): void {
    this.noteService.updateNote(this.editedNote).subscribe(() => {
      // Handle the success response here (e.g., show a success message)
      // Optionally, you can navigate to another page or refresh the note details
      this.router.navigate(['/notes', this.editedNote.id]);
    }, error => {
      // Handle the error response here (e.g., show an error message)
    });
  }
}
