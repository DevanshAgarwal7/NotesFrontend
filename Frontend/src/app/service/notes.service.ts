import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private uri = environment.api[1].uri;

  constructor(private http: HttpClient) { }

  getAllNotes(userEmail: object){
    return this.http.post(this.uri + "notes/all", userEmail);
  }

  addNote(newNote: object) {
    return this.http.post(this.uri + "notes/add", newNote);
  }

  deleteNote(deleteNote: any) {
    return this.http.delete(this.uri +  "delete/notes",deleteNote)
  }

  editNote(editNote: object) {
    return this.http.put(this.uri + "edit/notes", editNote);
  }
}
