import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../Model/Note';
import { NotesService } from '../services/notes.service';
import {GoogleDriveService} from "../services/google-drive.service";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };


  selectedNote: Note | null = null;
  constructor(private noteService: NotesService, private router: Router, private googleDriveService: GoogleDriveService) {
  }

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;

    });

  }
  onSaveToDrive(): void {
    if (this.newNote.title && this.newNote.content) {

      this.googleDriveService.saveNoteAsTxtFile(this.newNote.title + '.txt', this.newNote.content)
        .subscribe((fileId) => {
          console.log(`Note saved to Google Drive with File ID: ${fileId}`);
        });
    }
  }


  openModal(note: Note): void {
    const modalId = 'exampleModal' + note.id;
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }
  closeModal(): void {
    this.selectedNote = null;
  }
  onDeleteClick(noteId: number ): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(noteId).subscribe(() => {
        // Handle the success response here (e.g., show a success message)
        // Optionally, you can refresh the notes list
      }, error => {
        // Handle the error response here (e.g., show an error message)
      });
    }
  }
}
