import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Note} from "../Model/Note";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteEditService {

  private apiBaseUrl = 'http://localhost:5208'
  constructor(private http: HttpClient) { }
  // Get a note by its ID
  getNoteById(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiBaseUrl}/api/notes/${noteId}`);
  }

// Update a note
  updateNote(note: Note): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/api/notes/${note.id}`, note);
  }
}
