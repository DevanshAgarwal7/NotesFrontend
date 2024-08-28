import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/service/notes.service';
import { getUserDetails } from 'src/model/logged-in';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  constructor(private dialogRef: MatDialogRef<AddNoteComponent>, private noteService: NotesService){}

  addNoteForm = new FormGroup({
    noteTitle : new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)])
  })

  private note: any;
  
  cancel() {
    this.dialogRef.close()
  }
  addNote(){
    const user = getUserDetails();
    const newNote = {
      userEmail: user.userEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      noteTitle: this.addNoteForm.value.noteTitle,
      noteContent: this.addNoteForm.value.content
    }
    this.noteService.addNote(newNote).subscribe((response)=>{
      this.note = response;
      this.dialogRef.close({newNote: this.note});
    });
  }
}
