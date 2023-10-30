import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from 'src/app/Model/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiBaseUrl = 'http://localhost:5208'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiBaseUrl}/api/notes`);
  }
  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiBaseUrl}/api/notes/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.apiBaseUrl}/api/notes`, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiBaseUrl}/api/notes/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/api/notes/${id}`);
  }
}
